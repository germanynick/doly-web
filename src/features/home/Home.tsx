import { Pages } from "~/core/enums"
import React from "react"
import { Redirect } from "react-router-dom"

export interface IHomeProps {}

export const Home: React.FunctionComponent<IHomeProps> = () => {
  return <Redirect to={Pages.Login} />
}
