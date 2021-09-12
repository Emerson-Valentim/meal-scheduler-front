import React, { useEffect, useMemo } from 'react'

import { Form, Input, Button } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks'
import { authenticate, LoginState } from '../../../../hooks/User'
import { enableAlert } from '../../../../hooks/Common'
import { MainWrapper } from './styles'

export function Login() {
  const dispatch = useAppDispatch()
  const logged = useAppSelector((state) => state.user.logged)

  const ERROR = useMemo(() => (
    {
      [LoginState.BAD_CREDENTIALS]: {
        message: 'Ops, parece que suas credenciais são inválidas...',
        type: 'error',
        enabled: true
      },
      [LoginState.LOGGED]: {
        message: 'Seja bem vindo, agora é só aproveitar as funcionalidades.',
        type: 'success',
        enabled: true
      }
    }
  ), [])

  const onFinish = (values: any) => {
    dispatch(authenticate(values))
  }

  useEffect(() => {
    const alertState = ERROR[logged.state]
    if (alertState) {
      dispatch(enableAlert(alertState))
    }
  }, [logged, ERROR, dispatch])

  return (
    <MainWrapper>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="cnpj"
          rules={[{ required: true, message: 'Por favor insira seu cnpj' }]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="CNPJ" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Por favor insira sua senha!' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Senha"
          />
        </Form.Item>
        <Form.Item>
          <a className="login-form-forgot" href="/">
            Esqueci minha senha.
          </a>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Entrar
          </Button>
          ou <a href="/">Cadastrar restaurante!</a>
        </Form.Item>
      </Form>
    </MainWrapper>
  )
}