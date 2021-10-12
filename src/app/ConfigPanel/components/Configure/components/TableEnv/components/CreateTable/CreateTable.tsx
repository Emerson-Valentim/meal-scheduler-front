import React, { useEffect } from 'react'

import { Button, Form, Input, Select, Typography } from 'antd'
import { UnitForm, UnitFormItem } from '../../../../styles'
import { useAppDispatch, useAppSelector } from '../../../../../../../../hooks/hooks'
import { updateLoading, updateModal } from '../../../../../../../../hooks/Common'
import { loadEnvironments } from '../../../../../../../../hooks/Environment'
import { loadEstablishment } from '../../../../../../../../hooks/Establishment'
import { createTable } from '../../../../../../../../hooks/Table'

const { Option } = Select

export function CreateTable(): JSX.Element {
  const dispatch = useAppDispatch()

  const [form] = Form.useForm()

  const establishment_id = useAppSelector((state) => state.establishment.load.filtered.data.id)
  const { data: environments } = useAppSelector((state) => state.environment.load.list)

  useEffect(() => {
    (async () => {
      dispatch(updateLoading(true))

      await dispatch(loadEnvironments())

      dispatch(updateLoading(false))
    })()
  }, [])

  const onFinish = async (data) => {
    dispatch(updateLoading(true))

    await dispatch(createTable(data))

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
      name="create-table"
      onFinish={onFinish}
      autoComplete="off"
      initialValues={{ remember: true }}
      form={form}
    >
      <UnitFormItem
        name="identification"
        rules={[{ required: true, message: 'Por favor preencha o identificador!' }]}
        label="Identificador"
      >
        <Input placeholder="Identificador" type="number" />
      </UnitFormItem>

      <UnitFormItem
        name="seats"
        rules={[{ required: true, message: 'Por favor preencha a quantidade de lugares!' }]}
        label="Lugares"
      >
        <Input placeholder="Lugares" type="number" />
      </UnitFormItem>

      <UnitFormItem
        name="environment"
        rules={[{ required: true, message: 'Por favor escolha um valor!' }]}
        label="Ambientes"
      >
        <Select
          allowClear
          style={{ width: '100%' }}
          onChange={(value) => form.setFieldsValue({ environment: value })}
          placeholder="Selecione um ambiente"
        >
          {environments
            .filter(environment => environment.establishment === establishment_id)
            .map((environment) => (
              <Option value={environment.id} key={`environment-${environment.id}`}>
                {environment.id}
              </Option>
            ))}
        </Select>
      </UnitFormItem>
      <UnitFormItem style={{ textAlign: 'center' }}>
        <Button type="primary" htmlType="submit">
          Cadastrar
        </Button>
      </UnitFormItem>
    </UnitForm>
  )
}