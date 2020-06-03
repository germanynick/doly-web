import React from 'react'

import { MainLayout } from '@components/main-layout'

import { WeatherList } from './list'

export interface IWeatherProps {}

export const Weather: React.FunctionComponent = () => {
  return (
    <MainLayout>
      <WeatherList />
    </MainLayout>
  )
}
