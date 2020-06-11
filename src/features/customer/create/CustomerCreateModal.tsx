import { Modal } from 'antd'
import React from 'react'
import { useAsyncFn } from 'react-use'

import { FinalForm, InputAreaField, InputField, InputNumberField, InputPhoneField, SelectField } from '@components/form'
import { CustomerEntity } from '@core/entities'
import { CustomerType, Gender } from '@core/enums'
import { useNSTranslation } from '@core/i18next'
import { convertEnumToOptions } from '@core/utils'
import { email, minValue, required } from '@core/validators'
import { customerService } from '@services'

const TITLE = 'CUSTOMER_CREATE'

export interface ICustomerCreateModalProps {
  visible: boolean
  onSucess: (data: CustomerEntity) => void
  onClose: () => void
}

export const CustomerCreateModal: React.FunctionComponent<ICustomerCreateModalProps> = (props) => {
  const { visible, onSucess, onClose } = props
  const { t } = useNSTranslation()

  const [{ loading }, handleSubmit] = useAsyncFn(async (data: any) => {
    try {
      const entity = await customerService.create(data)
      onSucess(entity)
    } catch (error) {
      return error.errors
    }
  })

  return (
    <Modal
      title={t(TITLE)}
      visible={visible}
      onCancel={onClose}
      destroyOnClose={true}
      okText={t('SAVE')}
      cancelButtonProps={{ disabled: loading }}
      okButtonProps={{ form: TITLE, htmlType: 'submit', loading }}
    >
      <FinalForm id={TITLE} onSubmit={handleSubmit}>
        <InputField name="name" label={t('NAME')} placeholder={t('NAME')} validates={[required]} />

        <InputField name="email" label={t('EMAIL')} placeholder={t('EMAIL')} validates={[required, email]} />

        <SelectField
          name="type"
          label={t('TYPE')}
          placeholder={t('TYPE')}
          validates={[required]}
          options={convertEnumToOptions(CustomerType)}
        />

        <SelectField
          name="gender"
          label={t('GENDER')}
          placeholder={t('GENDER')}
          validates={[required]}
          options={convertEnumToOptions(Gender)}
        />

        <InputNumberField name="balance" label={t('BALANCE')} placeholder={t('BALANCE')} validates={[minValue(0)]} />

        <InputPhoneField name="phone" label={t('PHONE')} placeholder={t('PHONE')} />

        <InputField name="status" label={t('Status')} placeholder={t('Status')} />

        <InputField name="accountNumber" label={t('ACCOUNT_NUMBER')} placeholder={t('ACCOUNT_NUMBER')} />

        <InputAreaField name="address" label={t('ADDRESS')} placeholder={t('ADDRESS')} />
      </FinalForm>
    </Modal>
  )
}
