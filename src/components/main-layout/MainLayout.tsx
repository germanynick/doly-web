import "./MainLayout.less"

import { Icon } from "~/components/icon"
import { useMainLayoutState } from "~/store/mainLayoutState"
import { Avatar, Dropdown, Layout, Menu } from "antd"
import { ClickParam } from "antd/lib/menu"
import classnames from "classnames"
import React from "react"
import { useTranslation } from "react-i18next"
import { useHistory, useRouteMatch } from "react-router-dom"

const { Header, Sider, Content } = Layout

export interface IMainLayoutProps {}

export const MainLayout: React.FunctionComponent<IMainLayoutProps> = ({
  children,
}) => {
  const { features, collapsed, onToggle, onLogout, user } = useMainLayoutState()
  const { path: activeHref } = useRouteMatch()
  const history = useHistory()
  const { t } = useTranslation()

  const handleMenuClick = React.useCallback(
    (params: ClickParam) => {
      if (params.key === "logout") {
        onLogout()
      }
    },
    [onLogout]
  )

  return (
    <Layout className={classnames("main-layout", { collapsed })}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />

        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[activeHref]}
          onClick={({ key }) => history.push(key)}
        >
          {features?.map(({ href, name, icon }) => (
            <Menu.Item key={href} icon={<Icon name={icon} />}>
              {t(name)}
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout>
        <Header>
          <Icon
            name={collapsed ? "MenuUnfoldOutlined" : "MenuFoldOutlined"}
            onClick={onToggle}
          />
          <Dropdown
            trigger={["click"]}
            overlay={
              <Menu onClick={handleMenuClick}>
                <Menu.ItemGroup title={user?.name || user?.username}>
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
              <Avatar
                size="large"
                icon={<Icon name="UserOutlined" />}
                src={user?.profileUrl}
              />
              <Icon name="CaretDownFilled" />
            </div>
          </Dropdown>
        </Header>
        <Content>{children}</Content>
      </Layout>
    </Layout>
  )
}
