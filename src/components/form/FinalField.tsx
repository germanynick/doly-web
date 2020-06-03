import { Form } from 'antd'
import { FieldValidator } from 'final-form'
import React from 'react'
import { FieldRenderProps, useField } from 'react-final-form'

import { useNSTranslation } from '@core/i18next'
import { multiple, required } from '@core/validators'

type Renderer = (field: FieldRenderProps<any, HTMLElement>) => React.ReactElement

export interface IFinalFieldProps {
  name: string
  label?: string
  validates?: FieldValidator<any>[]
  children?: Renderer | React.ReactElement
}

export const FinalField: React.FunctionComponent<IFinalFieldProps> = ({ name, label, validates, children }) => {
  const { t } = useNSTranslation()
  const field = useField(name, { validate: validates && multiple(validates) })
  const { meta } = field

  const error = meta.touched && (meta.submitError || meta.error)

  return (
    <Form.Item
      labelAlign="right"
      required={validates?.includes(required)}
      label={label}
      hasFeedback={true}
      help={error && t(`_ERRORS.${error}`)}
      validateStatus={error ? 'error' : ''}
    >
      {typeof children === 'function' ? children(field) : children}
    </Form.Item>
  )
}
