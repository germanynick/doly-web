import { useNSTranslation } from "~/core/i18next"
import { Empty } from "antd"
import React from "react"

export interface IEmptyDataProps {}

export const EmptyData: React.FunctionComponent<IEmptyDataProps> = () => {
  const { t } = useNSTranslation()

  return <Empty description={t("NO_DATA")} />
}
