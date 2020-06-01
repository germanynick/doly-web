import { Input } from "antd"
import React from "react"
import { useField } from "react-final-form"

import { FinalField, IFinalFieldProps } from "./FinalField"

export interface IInputAreaFieldProps extends IFinalFieldProps {
  placeholder?: string
}

export const InputAreaField: React.FunctionComponent<IInputAreaFieldProps> = ({
  placeholder,
  name,
  children,
  ...props
}) => {
  const { input } = useField(name)

  return (
    <FinalField name={name} {...props}>
      {children || (
        <Input.TextArea rows={4} placeholder={placeholder} {...input} />
      )}
    </FinalField>
  )
}
