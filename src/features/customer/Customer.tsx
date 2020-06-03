import React from 'react'

import { MainLayout } from '@components/main-layout'
import { Translations } from '@core/enums'
import { NSContext } from '@core/i18next'

import { CustomerList } from './list'

export interface ICustomerProps {}

export const Customer: React.FunctionComponent<ICustomerProps> = () => {
  return (
    <NSContext.Provider value={Translations.Customer}>
      <MainLayout>
        <CustomerList />
      </MainLayout>
    </NSContext.Provider>
  )
}
