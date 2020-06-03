import React from 'react'
import { Redirect } from 'react-router-dom'

import { Pages } from '@core/enums'

export interface IHomeProps {}

export const Home: React.FunctionComponent<IHomeProps> = () => {
  return <Redirect to={Pages.Login} />
}
