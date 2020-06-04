import React from 'react'
import { Switch } from 'react-router-dom'

import { MainLayout } from '@components/main-layout'
import { Route } from '@core/Route'
import { Pages, Translations } from '@core/enums'

import { CustomerList } from './list'

export const CustomerPage: React.FunctionComponent = () => {
  return (
    <Switch>
      <Route
        path={Pages.Customer}
        permissions={true}
        layout={MainLayout}
        translation={Translations.Customer}
        component={CustomerList}
      />
    </Switch>
  )
}
