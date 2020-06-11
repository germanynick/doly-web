import React from 'react'
import { Redirect } from 'react-router-dom'

import { Pages } from '@core/enums'

export const HomePage: React.FunctionComponent = () => {
  return <Redirect to={Pages.Dashboard} />
}
