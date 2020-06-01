import { parse } from "querystring"

import { Pages } from "~/core/enums"
import { zaloService } from "~/services"
import { useToken } from "~/store/userState"
import React from "react"
import { useHistory, useLocation } from "react-router-dom"
import { useAsyncFn, useEffectOnce } from "react-use"

export interface ICallbackProps {}

export const Callback: React.FunctionComponent<ICallbackProps> = () => {
  const history = useHistory()
  const { search } = useLocation()
  const [, setToken] = useToken()

  const [, fetch] = useAsyncFn(async () => {
    const { code }: any = parse(search)
    const { accessToken }: any = await zaloService.login({ oauthToken: code })

    if (accessToken) {
      setToken(accessToken)
      history.push(Pages.Dashboard)
    } else {
      history.push(Pages.Login)
    }
  }, [search])

  useEffectOnce(() => {
    fetch()
  })

  return null
}
