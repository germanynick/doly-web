import { MainLayout } from "~/components/main-layout"
import React from "react"

import { CustomerChart } from "./customer"

export interface IDashboardProps {}

export const Dashboard: React.FunctionComponent<IDashboardProps> = () => {
  return (
    <MainLayout>
      <CustomerChart />
    </MainLayout>
  )
}
