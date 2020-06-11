import { Empty, Skeleton } from 'antd'
import React, { Suspense } from 'react'
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

const Namespace: React.FunctionComponent<IRouteProps> = ({ children, translation }) =>
  translation ? <NSContext.Provider value={translation}>{children}</NSContext.Provider> : <>{children}</>

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
        <Layout>
          <Suspense fallback={<Empty description={false} />}>
            <Namespace translation={translation}>
              <Renderer component={component} />
            </Namespace>
          </Suspense>
        </Layout>
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
        <Layout>
          <Suspense fallback={<Empty description={false} />}>
            <Namespace translation={translation}>{React.createElement(component as any)}</Namespace>
          </Suspense>
        </Layout>
      )}
    />
  )
}

export const Route: React.FunctionComponent<IRouteProps> = ({ permissions, ...props }) =>
  permissions ? <PrivateRoute {...props} /> : <PublicRoute {...props} />
