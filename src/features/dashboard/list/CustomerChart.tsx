import React from 'react'
import { useAsyncFn, useEffectOnce } from 'react-use'
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

import { AsyncCard } from '@components/card'
import { dashboardService } from '@services'

export interface ICustomerChartProps {}

export const CustomerChart: React.FunctionComponent<ICustomerChartProps> = () => {
  const [state, refetch] = useAsyncFn(dashboardService.fetchCustomerChart)
  const { value } = state

  useEffectOnce(() => {
    refetch()
  })

  return (
    <AsyncCard title="Customers" state={state} onReload={refetch}>
      <ResponsiveContainer height={300}>
        <BarChart data={value}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="male" fill="#1B90FF" />
          <Bar dataKey="female" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </AsyncCard>
  )
}
