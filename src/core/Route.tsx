import { Skeleton } from 'antd'
import React from 'react'
import { Route as BaseRoute, Redirect, RouteProps } from 'react-router-dom'

import { useUserState } from '@store/userState'

import { Pages, Translations } from './enums'
import { NSContext } from './i18next'

export interface IRouteProps extends RouteProps {
  layout?: React.FunctionComponent<any>
  permissions?: boolean
  translation?: Translations
}

const EmptyLayout: React.FunctionComponent = ({ children }) => <>{children}</>

const Renderer: React.FunctionComponent<IRouteProps> = ({ component }) => {
  const { loading, token, error } = useUserState()

  if (loading) {
    return <Skeleton />
  }

  if (error || !token) {
    return <Redirect to={Pages.Login} />
  }

  // @ts-ignore
  return React.createElement(component, {})
}

export const PrivateRoute: React.FunctionComponent<IRouteProps> = ({
  component,
  permissions,
  translation,
  layout: Layout = EmptyLayout,
  ...props
}) => {
  return (
    <BaseRoute
      {...props}
      render={() => (
        <NSContext.Provider value={translation}>
          <Layout>
            <Renderer component={component} />
          </Layout>
        </NSContext.Provider>
      )}
    />
  )
}

export const PublicRoute: React.FunctionComponent<IRouteProps> = ({
  component,
  permissions,
  translation,
  layout: Layout = EmptyLayout,
  ...props
}) => {
  return (
    <BaseRoute
      {...props}
      render={() => (
        <NSContext.Provider value={translation}>
          <Layout>{React.createElement(component as any)}</Layout>
        </NSContext.Provider>
      )}
    />
  )
}

export const Route: React.FunctionComponent<IRouteProps> = ({ permissions, ...props }) =>
  permissions ? <PrivateRoute {...props} /> : <PublicRoute {...props} />
