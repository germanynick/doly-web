import { Icon } from "~/components/icon"
import { CustomerEntity } from "~/core/entities"
import { useNSTranslation } from "~/core/i18next"
import { Button } from "antd"
import React from "react"
import { useToggle } from "react-use"

import { CustomerCreateModal } from "./CustomerCreateModal"

export interface ICustomerCreateButtonProps {
  onSuccess?: (data: CustomerEntity) => void
}

export const CustomerCreateButton: React.FunctionComponent<ICustomerCreateButtonProps> = ({
  onSuccess,
}) => {
  const [visible, handleToggle] = useToggle(false)
  const { t } = useNSTranslation()

  const handleSubmit = (data: CustomerEntity) => {
    onSuccess && onSuccess(data)
    handleToggle()
  }

  return (
    <>
      <Button onClick={handleToggle}>
        <Icon name="UserAddOutlined" />
        {t("CREATE")}
      </Button>
      <CustomerCreateModal
        visible={visible}
        onSucess={handleSubmit}
        onClose={handleToggle}
      />
    </>
  )
}
