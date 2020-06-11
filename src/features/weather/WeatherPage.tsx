import React from 'react'
import { Switch } from 'react-router-dom'

import { Route } from '@core/Route'
import { Pages } from '@core/enums'

import { WeatherList } from './list'

export const WeatherPage: React.FunctionComponent = () => {
  return (
    <Switch>
      <Route path={Pages.Weather} component={WeatherList} />
    </Switch>
  )
}
