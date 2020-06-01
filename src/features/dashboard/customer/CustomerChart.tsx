import { dashboardService } from "~/services"
import { Card } from "antd"
import React from "react"
import { useAsync } from "react-use"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

export interface ICustomerChartProps {}

export const CustomerChart: React.FunctionComponent<ICustomerChartProps> = () => {
  const { loading, value = [] } = useAsync(dashboardService.fetchCustomerChart)

  return (
    <Card title="Customers" loading={loading}>
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
    </Card>
  )
}
