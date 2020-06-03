import { IWeatherLocation, IWeatherLocationDetail } from "~/core/interfaces"

import { BaseService } from "./BaseService"

export class WeatherService extends BaseService {
  prefix = "/weather"

  searchByLocation = (query?: string) => {
    return this.get<IWeatherLocation[]>("/location/search/", {
      params: { query },
    })
  }

  weatherByLocation = (woeid: number) => {
    return this.get<IWeatherLocationDetail>(`/location/${woeid}/`)
  }
}

export const weatherService = new WeatherService()
