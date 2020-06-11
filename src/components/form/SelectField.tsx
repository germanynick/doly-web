import { Select } from 'antd'
import React from 'react'
import { useField } from 'react-final-form'

import { IOption } from '@core/interfaces'

import { FinalField, IFinalFieldProps } from './FinalField'

export interface ISelectFieldProps extends IFinalFieldProps {
  placeholder?: string
  options: IOption[]
}

export const SelectField: React.FunctionComponent<ISelectFieldProps> = (props) => {
  const { name, label, validates, placeholder, children, options } = props
  const { input } = useField(name)

  return (
    <FinalField name={name} validates={validates} label={label}>
      {children || <Select placeholder={placeholder} options={options} {...input} />}
    </FinalField>
  )
}
