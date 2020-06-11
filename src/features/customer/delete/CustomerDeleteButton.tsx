import { Button, Modal } from 'antd'
import React from 'react'

import { Icon } from '@components/icon'
import { customerService } from '@services'

export interface ICustomerDeleteButtonProps {
  id: string
  onSuccess?: (id: string) => void
}

export const CustomerDeleteButton: React.FunctionComponent<ICustomerDeleteButtonProps> = ({ id, onSuccess }) => {
  const handleOk = async () => {
    await customerService.remove(id)
    onSuccess && onSuccess(id)
  }

  const handleClickDelete = () => {
    Modal.confirm({
      title: 'Are you sure delete this customer?',
      icon: <Icon name="ExclamationCircleOutlined" />,
      content: `This action cannot reverted.`,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: handleOk,
    })
  }

  return <Button icon={<Icon name="DeleteOutlined" />} onClick={handleClickDelete} />
}
