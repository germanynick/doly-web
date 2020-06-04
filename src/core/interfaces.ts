import { ColumnProps } from 'antd/lib/table'

import * as Icons from '@ant-design/icons'

import { BaseEntity } from './entities'
import { Pages, Translations, WeatherLocationType, WeatherState } from './enums'

export type IconNames = keyof typeof Icons

export type IOptional<T> = T | undefined | false | null

export interface IFeature {
  href: Pages
  name: string
  icon: IconNames
  subFeatures?: IFeature[]
  layout?: React.Component
  permissions?: boolean | Function
  translation?: Translations
}

export interface IDataQuery<TEntity extends BaseEntity = any> {
  offset?: number
  limit?: number
  filters?: Partial<TEntity>
  search?: string
  fields?: (keyof TEntity)[]
  order?: { [P in keyof TEntity]?: 'ASC' | 'DESC' }
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

export interface IConsolidatedWeather {
  weather_state_name: string
  weather_state_abbr: WeatherState
  applicable_date: string
  min_temp: number
  max_temp: number
  the_temp: number
  timezone_name: string
}

export interface IWeatherLocation {
  title: string
  type: WeatherLocationType
  woeid: number
  latt_long: string
  distance: number
}

export interface IWeatherLocationDetail extends IWeatherLocation {
  consolidated_weather: IConsolidatedWeather[]
  parent: IWeatherLocation
}
