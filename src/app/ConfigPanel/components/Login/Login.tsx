import React, { useEffect, useMemo } from 'react'

import { Input, Button } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks'
import { authenticate, updateConfigMode, ConfigMode, LoginState } from '../../../../hooks/User'
import { enableAlert, updateLoading } from '../../../../hooks/Common'
import { ButtonWrapper, CustomLoginForm, LoginFormItem, MainWrapper } from './styles'
import { WestPlazaCard } from '../../../../components/WestPlazaCard/WestPlazaCard'
import { MaskedInput } from 'antd-mask-input'
import { cleanText } from '../../../../utils'

export function Login() {
  const dispatch = useAppDispatch()
  const logged = useAppSelector((state) => state.user.logged)

  const ACTION_MESSAGES = useMemo(() => (
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

  const onFinish = async (values: any) => {
    dispatch(updateLoading(true))
    await dispatch(authenticate({
      ...values,
      cnpj: cleanText(values.cnpj),
    }))
    dispatch(updateLoading(false))
  }

  useEffect(() => {
    const alertState = ACTION_MESSAGES[logged.state]
    if (alertState) {
      dispatch(enableAlert(alertState))
      if(logged.state === LoginState.LOGGED) {
        dispatch(updateConfigMode(ConfigMode.INFO))
      }
    }
  }, [logged, ACTION_MESSAGES, dispatch])

  return (
    <MainWrapper>
      <CustomLoginForm
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <WestPlazaCard card={{ pFontSize: '2em' }} />
        <LoginFormItem
          name="cnpj"
          rules={[{ required: true, message: 'Por favor insira seu cnpj' }]}
        >
          <MaskedInput prefix={<UserOutlined className="site-form-item-icon" />} placeholder="CNPJ" mask='11.111.111/1111-11' />
        </LoginFormItem>
        <LoginFormItem
          name="password"
          rules={[{ required: true, message: 'Por favor insira sua senha!' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Senha"
          />
        </LoginFormItem>
        <LoginFormItem>
          <ButtonWrapper>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button">
              Entrar
            </Button>
            ou <Button
              type="primary"
              className="login-form-button"
              onClick={() => dispatch(updateConfigMode(ConfigMode.REGISTER))}>
              Cadastrar restaurante!
            </Button>
          </ButtonWrapper>
        </LoginFormItem>
      </CustomLoginForm>
    </MainWrapper>
  )
}