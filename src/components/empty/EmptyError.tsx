import { useNSTranslation } from "~/core/i18next"
import { Button, Empty } from "antd"
import React from "react"

import { Icon } from "../icon"

export interface IEmptyErrorProps {
  onReload?: () => void
}

export const EmptyError: React.FunctionComponent<IEmptyErrorProps> = ({
  onReload,
}) => {
  const { t } = useNSTranslation()

  return (
    <Empty
      description={t("SOMETHING_WENT_WRONG")}
      image={
        <Icon
          name="WarningFilled"
          style={{ fontSize: 100, color: "#FF7874" }}
        />
      }
    >
      {onReload && <Button onClick={onReload}>{t("RELOAD")}</Button>}
    </Empty>
  )
}
