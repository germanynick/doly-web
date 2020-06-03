import "./less/main.less"

import { PrivateRoute } from "~/core/PrivateRoute"
import { Customer } from "~/features/customer"
import { Dashboard } from "~/features/dashboard"
import { Home } from "~/features/home"
import { Callback, Login } from "~/features/login"
import { Weather } from "~/features/weather"
import React from "react"
import { I18nextProvider } from "react-i18next"
import { BrowserRouter, Route, Switch } from "react-router-dom"

import { Pages } from "./core/enums"
import { i18next } from "./core/i18next"

export const App: React.FunctionComponent = () => {
  return (
    <I18nextProvider i18n={i18next}>
      <BrowserRouter>
        <Switch>
          <Route path={Pages.LoginCallback} component={Callback} />
          <Route path={Pages.Login} component={Login} />
          <PrivateRoute path={Pages.Weather} component={Weather} />
          <PrivateRoute path={Pages.Customer} component={Customer} />
          <PrivateRoute path={Pages.Dashboard} component={Dashboard} />
          <Route path={Pages.Home} component={Home} />
        </Switch>
      </BrowserRouter>
    </I18nextProvider>
  )
}
