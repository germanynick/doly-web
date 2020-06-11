import { createGlobalState } from 'react-use'

import { Pages } from '@core/enums'
import { IFeature } from '@core/interfaces'

import { useToken, useUserState } from './userState'

const features: IFeature[] = [
  {
    name: 'DASHBOARD',
    href: Pages.Dashboard,
    icon: 'DashboardOutlined',
  },
  {
    name: 'WEATHER',
    href: Pages.Weather,
    icon: 'CloudOutlined',
  },
  {
    name: 'CUSTOMER',
    href: Pages.Customer,
    icon: 'TeamOutlined',
    permissions: true,
  },
]

export const useMenuState = createGlobalState(features)
export const useSidebarState = createGlobalState(false)

export const useMainLayoutState = () => {
  const [, setToken] = useToken()
  const { data } = useUserState()
  const [features = []] = useMenuState()
  const [collapsed = false, toggle] = useSidebarState()

  return {
    features,
    collapsed,
    onToggle: () => toggle(!collapsed),
    onLogout: () => setToken(undefined),
    user: data,
  }
}
