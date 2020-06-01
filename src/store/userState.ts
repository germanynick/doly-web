import { Keys } from "~/core/enums"
import { authService } from "~/services"
import cookies from "js-cookie"
import React from "react"
import { createGlobalState, useAsync, useCookie } from "react-use"

export const useToken = createGlobalState<string | undefined>(
  cookies.get(Keys.Authorization)
)

export const useUserState = () => {
  const [token, setToken] = useToken()
  const [, updateToken, deleteToken] = useCookie(Keys.Authorization)

  const { loading, error, value } = useAsync(async () => {
    if (token) {
      return authService.me()
    }
  }, [token])

  React.useEffect(() => {
    if (token) {
      updateToken(token, { expires: 3600 })
    } else {
      deleteToken()
    }
  }, [token, updateToken, deleteToken])

  React.useEffect(() => {
    if (error) {
      setToken(undefined)
      deleteToken()
    }
  }, [error, setToken, deleteToken])

  return {
    token,
    loading,
    error,
    data: value,
  }
}
