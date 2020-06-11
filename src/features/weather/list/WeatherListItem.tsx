import { Card, Col, Row, Space, Typography } from 'antd'
import { times } from 'lodash'
import moment from 'moment'
import React from 'react'
import { useAsync } from 'react-use'

import { IConsolidatedWeather } from '@core/interfaces'
import { weatherService } from '@services'

export interface IWeatherListItemProps {
  woeid: number
  title: string
}

export const useWeatherListItemLogic = (props: IWeatherListItemProps) => {
  const { woeid, title } = props
  const { loading, value } = useAsync(() => weatherService.weatherByLocation(woeid), [woeid])

  const items = value?.consolidated_weather || times(6, () => ({} as IConsolidatedWeather))

  return {
    title,
    items,
    loading,
  }
}

export const WeatherListItem: React.FunctionComponent<IWeatherListItemProps> = (props) => {
  const { items, loading, title } = useWeatherListItemLogic(props)

  return (
    <>
      <Typography.Title level={3}>{title}</Typography.Title>
      <Row gutter={12}>
        {items?.map((item, index) => (
          <Col key={index} span={12} sm={{ span: 8 }} md={{ span: 4 }} className="weather-item">
            <Card loading={loading}>
              <Space direction="vertical">
                <Typography.Text>{moment(item?.applicable_date, 'YYYY-MM-DD').format('dddd')}</Typography.Text>
                <img
                  alt="state"
                  src={`https://www.metaweather.com/static/img/weather/${item?.weather_state_abbr}.svg`}
                />
                <Typography.Text>{item?.weather_state_name}</Typography.Text>
                <div>
                  <Typography.Text>{item?.min_temp?.toFixed(0)}</Typography.Text>-
                  <Typography.Text>{item?.max_temp?.toFixed(0)}</Typography.Text>℃
                </div>
              </Space>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  )
}
