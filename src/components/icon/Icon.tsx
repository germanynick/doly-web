import React from 'react'

import IconDefault, * as Icons from '@ant-design/icons'
import { IconComponentProps } from '@ant-design/icons/dist/components/Icon'
import { IconNames } from '@core/interfaces'

export interface IIconProps extends IconComponentProps {
  name?: IconNames
}

export const Icon: React.FunctionComponent<IIconProps> = ({ name, ...props }) => {
  const Component = React.useMemo(() => {
    return name && Icons[name]
  }, [name])

  // @ts-ignore
  return React.createElement(Component || IconDefault, props)
}
