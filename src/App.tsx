import "./less/main.less"

import { PrivateRoute } from "~/core/PrivateRoute"
import { Customer } from "~/features/customer"
import { Dashboard } from "~/features/dashboard"
import { Callback, Login } from "~/features/login"
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
          <PrivateRoute path={Pages.Customer} component={Customer} />
          <PrivateRoute path={Pages.Dashboard} component={Dashboard} />
        </Switch>
      </BrowserRouter>
    </I18nextProvider>
  )
}
