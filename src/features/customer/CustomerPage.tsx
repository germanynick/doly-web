import React from 'react'
import { Switch } from 'react-router-dom'

import { Route } from '@core/Route'
import { Pages } from '@core/enums'

import { CustomerList } from './list'

export const CustomerPage: React.FunctionComponent = () => {
  return (
    <Switch>
      <Route path={Pages.Customer} permissions={true} component={CustomerList} />
    </Switch>
  )
}
