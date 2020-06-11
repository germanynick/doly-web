import './Login.less'

import { Alert, Avatar, Button, Divider, Form, Layout, Row, Space } from 'antd'
import React, { useCallback } from 'react'
import { Redirect } from 'react-router-dom'
import { useAsyncFn } from 'react-use'

import { FinalForm, InputField } from '@components/form'
import { Icon } from '@components/icon'
import { Pages } from '@core/enums'
import { required } from '@core/validators'
import { ILoginDto, authService, zaloService } from '@services'
import { useToken } from '@store/userState'

export interface ILoginProps {}

export const Login: React.FunctionComponent<ILoginProps> = () => {
  const [token, setToken] = useToken()
  const isHttps = window.location.href.startsWith('https://')

  const handleClickZalo = useCallback(async () => {
    try {
      const { loginUrl }: any = await zaloService.zaloLoginUrl()
      window.location.replace(loginUrl)
    } catch (error) {}
  }, [])

  const [{ loading, error }, handleSubmit] = useAsyncFn(async (data: ILoginDto) => {
    const { accessToken }: any = await authService.login(data as ILoginDto)
    setToken(accessToken)
  })

  if (token) {
    return <Redirect to={Pages.Dashboard} />
  }

  return (
    <Layout className="login-layout">
      {!isHttps && (
        <Alert banner={true} type="warning" message={`Login by Zalo require HTTPS. - Please run: "yarn start:https"`} />
      )}
      <Layout.Content>
        <div className="login-form">
          <Row justify="center" style={{ marginBottom: '24px' }}>
            <img
              height={80}
              alt="logo"
              src="https://dcassetcdn.com/design_img/2980691/681558/681558_16439713_2980691_e831b887_image.png"
            />
          </Row>
          <FinalForm onSubmit={handleSubmit as any} wrapperCol={{ span: 24 }}>
            {error && (
              <Form.Item>
                <Alert message={error.message} type="error" showIcon />
              </Form.Item>
            )}

            <InputField
              name="username"
              placeholder="Username"
              prefix={<Icon name="UserOutlined" />}
              validates={[required]}
            />
            <InputField
              name="password"
              prefix={<Icon name="LockOutlined" />}
              type="password"
              placeholder="Password"
              validates={[required]}
            />

            <Form.Item>
              <Button type="primary" htmlType="submit" block={true} size="large" loading={loading}>
                Log in
              </Button>
            </Form.Item>
          </FinalForm>
          <Divider> OR </Divider>
          <Row justify="center">
            <Button size="large" onClick={handleClickZalo}>
              <Space>
                <Avatar
                  size={24}
                  shape="square"
                  src="https://seeklogo.com/images/Z/zalo-logo-B0A0B2B326-seeklogo.com.png"
                />
                Login by Zalo
              </Space>
            </Button>
          </Row>
        </div>
      </Layout.Content>
    </Layout>
  )
}
