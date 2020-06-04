import React from 'react'

import { CustomerChart } from './CustomerChart'

export interface IDashboardListProps {}

export const DashboardList: React.FunctionComponent<IDashboardListProps> = () => {
  return <CustomerChart />
}
