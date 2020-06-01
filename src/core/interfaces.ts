import * as Icons from "@ant-design/icons"
import { ColumnProps } from "antd/lib/table"

import { BaseEntity } from "./entities"
import { Pages } from "./enums"

export type IconNames = keyof typeof Icons

export type IOptional<T> = T | undefined | false | null

export interface IFeature {
  href: Pages
  name: string
  icon: IconNames
  subFeatures?: IFeature[]
}

export interface IDataQuery<TEntity extends BaseEntity = any> {
  offset?: number
  limit?: number
  filters?: Partial<TEntity>
  search?: string
  fields?: (keyof TEntity)[]
  order?: { [P in keyof TEntity]?: "ASC" | "DESC" }
}

export interface IDataPagination<TEntity = any> {
  total: number
  limit: number
  offset: number
  data: TEntity[]
}

export interface IZaloCallbackQuery {
  uid: string
  code: string
  scope: string
}

export interface IOption {
  value: string
  label: string
  disabled?: boolean
}

export interface IColumn<T extends BaseEntity = any> extends ColumnProps<T> {
  title?: string
  width?: number
  dataIndex?: string
  export?: boolean
}
