import React from 'react'
import { Switch } from 'react-router-dom'

import { Route } from '@core/Route'
import { Pages } from '@core/enums'

import { DashboardList } from './list'

export const DashboardPage: React.FunctionComponent = () => {
  return (
    <Switch>
      <Route path={Pages.Dashboard} component={DashboardList} />
    </Switch>
  )
}
