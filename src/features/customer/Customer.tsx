import { MainLayout } from "~/components/main-layout"
import { Translations } from "~/core/enums"
import { NSContext } from "~/core/i18next"
import { useMainLayoutState } from "~/store/mainLayoutState"
import React from "react"

import { CustomerList } from "./list"

export interface ICustomerProps {}

export const Customer: React.FunctionComponent<ICustomerProps> = () => {
  const mainLayoutState = useMainLayoutState()

  return (
    <NSContext.Provider value={Translations.Customer}>
      <MainLayout {...mainLayoutState}>
        <CustomerList />
      </MainLayout>
    </NSContext.Provider>
  )
}
