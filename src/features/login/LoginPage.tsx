import React from 'react'
import { Switch } from 'react-router-dom'

import { Route } from '@core/Route'
import { Pages } from '@core/enums'

import { Callback } from './Callback'
import { Login } from './Login'

export const LoginPage: React.FunctionComponent = () => {
  return (
    <Switch>
      <Route path={Pages.LoginCallback} component={Callback} />
      <Route path={Pages.Login} component={Login} />
    </Switch>
  )
}
