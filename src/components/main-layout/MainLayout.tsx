import './MainLayout.less'

import { Avatar, Button, Dropdown, Layout, Menu, Tooltip } from 'antd'
import { ClickParam } from 'antd/lib/menu'
import classnames from 'classnames'
import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory, useRouteMatch } from 'react-router-dom'

import { Icon } from '@components/icon'
import { Pages } from '@core/enums'
import { useMainLayoutState } from '@store/mainLayoutState'

const { Header, Sider, Content } = Layout

export interface IMainLayoutProps {}

export const MainLayout: React.FunctionComponent<IMainLayoutProps> = ({ children }) => {
  const { features, collapsed, onToggle, onLogout, user } = useMainLayoutState()
  const { path: activeHref } = useRouteMatch()
  const history = useHistory()
  const { t } = useTranslation()

  const handleMenuClick = useCallback(
    (params: ClickParam) => {
      if (params.key === 'logout') {
        onLogout()
      }
    },
    [onLogout],
  )

  return (
    <Layout className={classnames('main-layout', { collapsed })}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />

        <Menu theme="dark" mode="inline" selectedKeys={[activeHref]} onClick={({ key }) => history.push(key)}>
          {features?.map(({ href, name, icon, permissions }) => (
            <Menu.Item key={href} icon={<Icon name={icon} />}>
              {t(name)}
              {permissions && (
                <Tooltip title="Login to access this feature.">
                  <Icon name="LockOutlined" style={{ color: 'red' }} />
                </Tooltip>
              )}
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout>
        <Header>
          <Icon name={collapsed ? 'MenuUnfoldOutlined' : 'MenuFoldOutlined'} onClick={onToggle} />
          {user ? (
            <Dropdown
              trigger={['click']}
              overlay={
                <Menu onClick={handleMenuClick}>
                  <Menu.ItemGroup title={user.name || user.username}>
                    <Menu.Divider />
                    <Menu.Item key="logout">
                      <Icon name="LogoutOutlined" /> Logout
                    </Menu.Item>
                  </Menu.ItemGroup>
                </Menu>
              }
              placement="bottomRight"
            >
              <div className="avatar">
                <Avatar size="large" icon={<Icon name="UserOutlined" />} src={user.profileUrl} />
                <Icon name="CaretDownFilled" />
              </div>
            </Dropdown>
          ) : (
            <Button type="link" onClick={() => history.push(Pages.Login)}>
              <Icon name="LoginOutlined" />
              Login
            </Button>
          )}
        </Header>
        <Content>{children}</Content>
      </Layout>
    </Layout>
  )
}
