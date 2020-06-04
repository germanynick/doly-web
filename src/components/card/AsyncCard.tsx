import { Spin } from 'antd'
import Card, { CardProps } from 'antd/lib/card'
import React from 'react'
import { AsyncState } from 'react-use/lib/useAsync'

import { EmptyData, EmptyError } from '@components/empty'

export interface IAsyncCardProps extends CardProps {
  state: AsyncState<any[]>
  onReload?: () => void
}

export const AsyncCard: React.FunctionComponent<IAsyncCardProps> = ({ children, state, onReload, ...props }) => {
  const { error, loading, value } = state

  return (
    <Card {...props} loading={loading && !value}>
      <Spin spinning={loading}>
        {error ? <EmptyError onReload={onReload} /> : !value || value?.length === 0 ? <EmptyData /> : children}
      </Spin>
    </Card>
  )
}
