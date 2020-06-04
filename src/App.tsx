import './less/main.less'

import React from 'react'
import { I18nextProvider } from 'react-i18next'
import { BrowserRouter, Switch } from 'react-router-dom'

import { Route } from '@core/Route'
import { Pages } from '@core/enums'
import { i18next } from '@core/i18next'
import { CustomerPage } from '@features/customer'
import { DashboardPage } from '@features/dashboard'
import { HomePage } from '@features/home'
import { LoginPage } from '@features/login'
import { WeatherPage } from '@features/weather'

export const App: React.FunctionComponent = () => {
  return (
    <I18nextProvider i18n={i18next}>
      <BrowserRouter>
        <Switch>
          <Route path={Pages.Login} component={LoginPage} />
          <Route path={Pages.Weather} component={WeatherPage} />
          <Route path={Pages.Customer} component={CustomerPage} />
          <Route path={Pages.Dashboard} component={DashboardPage} />
          <Route path={Pages.Home} component={HomePage} />
        </Switch>
      </BrowserRouter>
    </I18nextProvider>
  )
}
