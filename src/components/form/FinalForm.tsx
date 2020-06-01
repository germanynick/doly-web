import { IOptional } from "~/core/interfaces"
import { Form as AntForm } from "antd"
import { ColProps } from "antd/lib/col"
import React from "react"
import { Form, FormProps, useField } from "react-final-form"

export interface IFinalFormProps extends FormProps {
  id?: string
  layout?: "vertical" | "horizontal"
  labelCol?: ColProps
  wrapperCol?: ColProps
}

export const FinalForm: React.FunctionComponent<IFinalFormProps> = ({
  id,
  layout,
  labelCol,
  wrapperCol,
  ...props
}) => {
  return (
    <Form
      {...props}
      render={({ handleSubmit }) => {
        return (
          <form id={id} onSubmit={handleSubmit}>
            <AntForm
              component={false}
              layout={layout}
              labelCol={labelCol || { xs: { span: 24 }, md: { span: 6 } }}
              wrapperCol={wrapperCol || { xs: { span: 24 }, md: { span: 18 } }}
            >
              {props.children}
            </AntForm>
          </form>
        )
      }}
    />
  )
}

export const useFieldError = (name: string): IOptional<string> => {
  const { meta } = useField(name)

  console.log(meta)

  return meta.touched && (meta.submitError || meta.error)
}
