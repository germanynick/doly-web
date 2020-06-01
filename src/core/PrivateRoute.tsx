import { useUserState } from "~/store/userState"
import React from "react"
import { Redirect, Route, RouteProps } from "react-router-dom"

import { Pages } from "./enums"

export interface IPrivateProps extends RouteProps {}

const Renderer: React.FunctionComponent<IPrivateProps> = ({
  component,
  ...props
}) => {
  const { loading, error, token } = useUserState()

  if (loading) {
    return <div>Loading</div>
  }

  if (error || !token) {
    return <Redirect to={Pages.Login} />
  }

  // @ts-ignore
  return React.createElement(component, props)
}

export const PrivateRoute: React.FunctionComponent<IPrivateProps> = ({
  component,
  ...props
}) => {
  return (
    <Route
      {...props}
      render={() => <Renderer {...props} component={component} />}
    />
  )
}
