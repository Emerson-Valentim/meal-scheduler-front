import React, { useEffect, useMemo, useState } from 'react'
import { Input, Button } from 'antd'
import { WestPlazaCard } from '../../../../components/WestPlazaCard/WestPlazaCard'
import { updateConfigMode, ConfigMode, createUser, RegisterState, authenticate } from '../../../../hooks/User'
import { ButtonWrapper, CustomLoginForm, LoginFormItem, MainWrapper } from './styles'
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks'
import LockOutlined from '@ant-design/icons/lib/icons/LockOutlined'
import UserOutlined from '@ant-design/icons/lib/icons/UserOutlined'
import PhoneOutlined from '@ant-design/icons/lib/icons/PhoneOutlined'
import { enableAlert, updateLoading } from '../../../../hooks/Common'

export function Register() {
  const dispatch = useAppDispatch()

  const { state: registerState } = useAppSelector((state) => state.user.create.result!)

  const [credentials, setCredentials] = useState({ cnpj: '', password: ''})

  const onFinish = async (values: any) => {
    const formCredentials = {
      cnpj: values.cnpj,
      password: values.password,
    }
    setCredentials(formCredentials)
    dispatch(updateLoading(true))
    await dispatch(createUser({
      ...formCredentials,
      phone: values.phone
    }))
    dispatch(updateLoading(false))
  }

  const ACTION_MESSAGES = useMemo(() => (
    {
      [RegisterState.ERROR]: {
        message: 'Ops, parece que tivemos um problema no seu cadastro.',
        type: 'error',
        enabled: true
      },
      [RegisterState.SUCCESS]: {
        message: 'Seja bem vindo, agora é só aproveitar as funcionalidades.',
        type: 'success',
        enabled: true
      }
    }
  ), [])

  useEffect(() => {
    const alertState = ACTION_MESSAGES[registerState]
    if (alertState) {
      dispatch(enableAlert(alertState))
      if(registerState === RegisterState.SUCCESS) {
        dispatch(authenticate(credentials))
        dispatch(updateConfigMode(ConfigMode.INFO))
      }
    }
  }, [registerState, ACTION_MESSAGES, dispatch, credentials])

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
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="CNPJ" />
        </LoginFormItem>
        <LoginFormItem
          name="phone"
          rules={[{ required: true, message: 'Por favor insira seu telefone de contato' }]}
        >
          <Input prefix={<PhoneOutlined className="site-form-item-icon" />} placeholder="Telefone" />
        </LoginFormItem>
        <LoginFormItem
          name="password"
          rules={[
            {
              required: true,
              message: 'Por favor digite sua senha!',
            },
          ]}
          hasFeedback
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Senha"
          />
        </LoginFormItem>
        <LoginFormItem
          name="confirm"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Por favor confirme a senha!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error('Ambas as senhas devem ser iguais!'))
              },
            }),
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Confirme a senha"
          />
        </LoginFormItem>
        <LoginFormItem>
          <ButtonWrapper>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button">
              Cadastrar restaurante
            </Button>
            ou <Button
              type="primary"
              className="login-form-button"
              onClick={() => dispatch(updateConfigMode(ConfigMode.LOGIN))}>
              Já possuo cadastro.
            </Button>
          </ButtonWrapper>
        </LoginFormItem>
      </CustomLoginForm>
    </MainWrapper>
  )
}