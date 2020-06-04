import React from 'react'
import { Switch } from 'react-router-dom'

import { MainLayout } from '@components/main-layout'
import { Route } from '@core/Route'
import { Pages, Translations } from '@core/enums'

import { WeatherList } from './list'

export const WeatherPage: React.FunctionComponent = () => {
  return (
    <Switch>
      <Route
        path={Pages.Weather}
        layout={MainLayout}
        permissions={false}
        translation={Translations.Weather}
        component={WeatherList}
      />
    </Switch>
  )
}
