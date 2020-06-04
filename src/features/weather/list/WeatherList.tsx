import './WeatherList.less'

import { Input, Space } from 'antd'
import React, { useEffect, useState } from 'react'
import { useAsyncFn } from 'react-use'

import { AsyncCard } from '@components/card'
import { Icon } from '@components/icon'
import { useNSTranslation } from '@core/i18next'
import { weatherService } from '@services'

import { WeatherListItem } from './WeatherListItem'

export interface IWeatherListProps {}

export const WeatherList: React.FunctionComponent<IWeatherListProps> = () => {
  const { t } = useNSTranslation()
  const [search, updateSearch] = useState('Ho Chi Minh City')

  const [state, refetch] = useAsyncFn(() => weatherService.searchByLocation(search), [search])

  useEffect(() => {
    refetch()
  }, [refetch])

  return (
    <AsyncCard
      state={state}
      onReload={refetch}
      className="weather-layout"
      title={
        <Input
          style={{ maxWidth: '300px' }}
          placeholder={t('SEARCH')}
          prefix={<Icon name="SearchOutlined" />}
          onPressEnter={(event) => updateSearch(event.currentTarget.value)}
        />
      }
    >
      <Space direction="vertical" style={{ width: '100%' }}>
        {state?.value?.slice(0, 5).map((location) => (
          <WeatherListItem key={location.woeid} location={location} />
        ))}
      </Space>
    </AsyncCard>
  )
}
