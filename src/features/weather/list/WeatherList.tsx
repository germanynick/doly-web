import "./WeatherList.less"

import { EmptyData, EmptyError } from "~/components/empty"
import { Icon } from "~/components/icon"
import { useNSTranslation } from "~/core/i18next"
import { weatherService } from "~/services"
import { Card, Input, Space, Spin } from "antd"
import React, { useEffect, useState } from "react"
import { useAsyncFn } from "react-use"

import { WeatherListItem } from "./WeatherListItem"

export interface IWeatherListProps {}

export const WeatherList: React.FunctionComponent<IWeatherListProps> = () => {
  const { t } = useNSTranslation()
  const [search, updateSearch] = useState("Ho Chi Minh City")

  const [{ loading, value, error }, refetch] = useAsyncFn(
    () => weatherService.searchByLocation(search),
    [search]
  )

  useEffect(() => {
    refetch()
  }, [refetch])

  return (
    <Card
      className="weather-layout"
      title={
        <Input
          style={{ maxWidth: "300px" }}
          placeholder={t("SEARCH")}
          prefix={<Icon name="SearchOutlined" />}
          onPressEnter={(event) => updateSearch(event.currentTarget.value)}
        />
      }
    >
      <Spin spinning={loading}>
        {error ? (
          <EmptyError onReload={refetch} />
        ) : value?.length === 0 ? (
          <EmptyData />
        ) : (
          <Space direction="vertical" style={{ width: "100%" }}>
            {value?.slice(0, 5).map((location) => (
              <WeatherListItem key={location.woeid} location={location} />
            ))}
          </Space>
        )}
      </Spin>
    </Card>
  )
}
