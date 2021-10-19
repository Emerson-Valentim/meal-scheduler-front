import React, { useEffect } from 'react'

import { Button, Form, Input } from 'antd'
import { UnitForm, UnitFormItem } from '../../../../styles'
import { useAppDispatch, useAppSelector } from '../../../../../../../../hooks/hooks'
import { updateLoading, updateModal } from '../../../../../../../../hooks/Common'
import { createMenu, loadMenu, updateMenu } from '../../../../../../../../hooks/Menu'
import { loadEstablishment } from '../../../../../../../../hooks/Establishment'

type EditMenuParams = {
  id?: number
}

export function CreateMenu({ id }: EditMenuParams): JSX.Element {
  const dispatch = useAppDispatch()

  const [form] = Form.useForm()

  const { data: menu } = useAppSelector((state) => state.menu.load.filtered)
  const establishment_id = useAppSelector((state) => state.establishment.load.filtered.data.id)

  useEffect(() => {
    if (id) {
      (async () => {
        dispatch(updateLoading(true))

        await dispatch(loadMenu(id))

        dispatch(updateLoading(false))
      })()
    }
  }, [id])

  useEffect(() => {
    id
      ? form.setFieldsValue(menu)
      : form.setFieldsValue({})

  }, [id, menu])

  const onFinish = async (data) => {
    dispatch(updateLoading(true))

    id
      ? await dispatch(updateMenu({ id, ...data }))
      : await dispatch(createMenu({ establishment: establishment_id, ...data }))

    await dispatch(loadEstablishment(establishment_id))
    dispatch(updateModal({
      enabled: false,
      component: undefined,
      title: ''
    }))
    dispatch(updateLoading(false))
  }

  return (
    <UnitForm
      name="create-menu"
      onFinish={onFinish}
      autoComplete="off"
      initialValues={{ remember: true }}
      form={form}
    >
      <UnitFormItem
        name="name"
        rules={[{ required: true, message: 'Por favor preencha o nome!' }]}
        label="Nome"
      >
        <Input placeholder="Nome" />
      </UnitFormItem>

      <UnitFormItem
        name="ingredients"
        rules={[{ required: true, message: 'Por favor preencha os ingredientes!' }]}
        label="Ingredientes"
      >
        <Input placeholder="Ingredientes" />
      </UnitFormItem>
      <UnitFormItem
        name="value"
        rules={[{ required: true, message: 'Por favor escolha um valor!' }]}
        label="Valor"
      >
        <Input placeholder="Valor" type="number" />
      </UnitFormItem>
      <UnitFormItem style={{ textAlign: 'center' }}>
        <Button type="primary" htmlType="submit">
          { id ? 'Atualizar' : 'Cadastrar'}
        </Button>
      </UnitFormItem>
    </UnitForm>
  )
}