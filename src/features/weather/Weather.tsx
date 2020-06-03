import { MainLayout } from "~/components/main-layout"
import React from "react"

import { WeatherList } from "./list"

export interface IWeatherProps {}

export const Weather: React.FunctionComponent = () => {
  return (
    <MainLayout>
      <WeatherList />
    </MainLayout>
  )
}
