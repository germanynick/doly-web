import { MainLayout } from "~/components/main-layout"
import { useMainLayoutState } from "~/store/mainLayoutState"
import React from "react"

import { CustomerChart } from "./customer"

export interface IDashboardProps {}

export const Dashboard: React.FunctionComponent<IDashboardProps> = () => {
  const mainLayoutState = useMainLayoutState()

  return (
    <MainLayout {...mainLayoutState}>
      <CustomerChart />
    </MainLayout>
  )
}
