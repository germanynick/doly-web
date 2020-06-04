import React from 'react'
import { Switch } from 'react-router-dom'

import { MainLayout } from '@components/main-layout'
import { Route } from '@core/Route'
import { Pages, Translations } from '@core/enums'

import { DashboardList } from './list'

export const DashboardPage: React.FunctionComponent = () => {
  return (
    <Switch>
      <Route
        path={Pages.Dashboard}
        layout={MainLayout}
        translation={Translations.Dashboard}
        component={DashboardList}
      />
    </Switch>
  )
}
