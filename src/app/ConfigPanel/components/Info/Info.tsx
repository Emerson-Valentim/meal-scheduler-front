import React, { useState, useEffect } from 'react'
import { Button, Form, Input, Radio, Space } from 'antd'

import { ButtonWrapper, EstablishmentForm, EstablishmentFormItem, MainWrapper, RadioWrapper } from './styles'
import { WestPlazaCard } from '../../../../components/WestPlazaCard/WestPlazaCard'
import { useAppDispatch } from '../../../../hooks/hooks'
import { createEstablishment, updateEstablishment } from '../../../../hooks/Establishment'
import { updateLoading } from '../../../../hooks/Common'
import { authenticate } from '../../../../hooks/User'

type InfoParams = {
  establishment?: any
}

export enum Segmentation {
  pub = 'pub',
  restaurant = 'restaurant',
  bakery = 'bakery',
  candy_store = 'candy_store',
  others = 'others'
}

export function Info({ establishment }: InfoParams) {

  const dispatch = useAppDispatch()

  const [form] = Form.useForm()
  const [isEditDisabled, disableEdit] = useState(false)

  useEffect(() => {
    if (establishment) {
      form.setFieldsValue({
        name: establishment?.name,
        category: Segmentation[establishment?.category],
        description: establishment?.description
      })
      disableEdit(true)
    }
  }, [establishment, form])

  const onFinish = async (values: any) => {
    dispatch(updateLoading(true))

    const establishmentAction = establishment
      ? dispatch(updateEstablishment({ id: establishment.id, ...values }))
      : dispatch(createEstablishment(values))

    await dispatch(authenticate())

    await establishmentAction

    dispatch(updateLoading(false))
  }

  return (
    <MainWrapper>
      <WestPlazaCard />
      <EstablishmentForm
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={onFinish}
        autoComplete="off"
        form={form}
      >
        <EstablishmentFormItem
          name="name"
          rules={[{ required: true, message: 'Por favor escolha um nome para o estabelecimento!' }]}
        >
          <Input
            disabled={isEditDisabled}
            placeholder="Nome"
          />
        </EstablishmentFormItem>
        <EstablishmentFormItem
          name="description"
          rules={[{ required: true, message: 'Por favor escolha um nome para o estabelecimento!' }]}
        >
          <Input
            disabled={isEditDisabled}
            placeholder="Descrição"
          />
        </EstablishmentFormItem>
        <EstablishmentFormItem
          name="category"
        >
          <RadioWrapper value={form.getFieldsValue().category} disabled={isEditDisabled}>
            <Space direction="vertical">
              <Radio value={Segmentation.bakery}>Café e pães</Radio>
              <Radio value={Segmentation.candy_store}>Doces e guloseimas</Radio>
              <Radio value={Segmentation.pub}>Bar e petiscos</Radio>
              <Radio value={Segmentation.restaurant}>Restaurantes</Radio>
              <Radio value={Segmentation.others}>Outros</Radio>
            </Space>
          </RadioWrapper>
        </EstablishmentFormItem>
        <EstablishmentFormItem>
          <ButtonWrapper>
            <Button type="primary" htmlType="submit" disabled={isEditDisabled}>
              {establishment
                ? 'Atualizar'
                : 'Cadastrar'}
            </Button>
            <Button type="primary" onClick={() => disableEdit(!isEditDisabled)}>
              {isEditDisabled
                ? 'Editar'
                : 'Desabilitar'}
            </Button>
          </ButtonWrapper>
        </EstablishmentFormItem>
      </EstablishmentForm>
    </MainWrapper>
  )
}