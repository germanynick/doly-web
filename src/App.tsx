import './less/main.less'

import React, { Suspense, lazy } from 'react'
import { I18nextProvider } from 'react-i18next'
import { BrowserRouter, Switch } from 'react-router-dom'

import { MainLayout } from '@components/main-layout'
import { Route } from '@core/Route'
import { Pages, Translations } from '@core/enums'
import { i18next } from '@core/i18next'

const CustomerPage = lazy(() => import('@features/customer'))
const HomePage = lazy(() => import('@features/home'))
const DashboardPage = lazy(() => import('@features/dashboard'))
const LoginPage = lazy(() => import('@features/login'))
const WeatherPage = lazy(() => import('@features/weather'))

export const App: React.FunctionComponent = () => {
  return (
    <Suspense fallback={null}>
      <I18nextProvider i18n={i18next}>
        <BrowserRouter>
          <Switch>
            <Route path={Pages.Login} component={LoginPage} />
            <Route
              path={Pages.Weather}
              layout={MainLayout}
              translation={Translations.Weather}
              component={WeatherPage}
            />
            <Route
              path={Pages.Customer}
              layout={MainLayout}
              translation={Translations.Customer}
              component={CustomerPage}
            />
            <Route
              path={Pages.Dashboard}
              layout={MainLayout}
              translation={Translations.Dashboard}
              component={DashboardPage}
            />
            <Route path={Pages.Home} component={HomePage} />
          </Switch>
        </BrowserRouter>
      </I18nextProvider>
    </Suspense>
  )
}
