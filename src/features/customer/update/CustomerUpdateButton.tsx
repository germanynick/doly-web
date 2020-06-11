import { Button } from 'antd'
import React from 'react'
import { useToggle } from 'react-use'

import { Icon } from '@components/icon'
import { CustomerEntity } from '@core/entities'

import { CustomerUpdateModal } from './CustomerUpdateModal'

export interface ICustomerUpdateButtonProps {
  id: string
  onSuccess?: (data: CustomerEntity) => void
}

export const CustomerUpdateButton: React.FunctionComponent<ICustomerUpdateButtonProps> = ({ id, onSuccess }) => {
  const [visible, handleToggle] = useToggle(false)

  const handleSubmit = (data: CustomerEntity) => {
    onSuccess && onSuccess(data)
    handleToggle()
  }

  return (
    <>
      <Button icon={<Icon name="EditOutlined" />} onClick={handleToggle} />
      <CustomerUpdateModal id={id} visible={visible} onSucess={handleSubmit} onClose={handleToggle} />
    </>
  )
}
