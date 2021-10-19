import React, { useEffect } from 'react'

import { Button, Form, Input, Select } from 'antd'
import { UnitForm, UnitFormItem } from '../../../../styles'
import { useAppDispatch, useAppSelector } from '../../../../../../../../hooks/hooks'
import { updateLoading, updateModal } from '../../../../../../../../hooks/Common'
import { loadEnvironments } from '../../../../../../../../hooks/Environment'
import { loadEstablishment } from '../../../../../../../../hooks/Establishment'
import { createTable, loadTable, updateTable } from '../../../../../../../../hooks/Table'

const { Option } = Select

type EditTableParams = {
  id?: number
}

export function CreateTable({ id }: EditTableParams): JSX.Element {
  const dispatch = useAppDispatch()

  const [form] = Form.useForm()

  const establishment_id = useAppSelector((state) => state.establishment.load.filtered.data.id)

  const { data: environments } = useAppSelector((state) => state.environment.load.list)
  const { data: table } = useAppSelector((state) => state.table.load.filtered)

  useEffect(() => {
    (async () => {
      dispatch(updateLoading(true))

      await dispatch(loadEnvironments())

      dispatch(updateLoading(false))
    })()
  }, [])

  useEffect(() => {
    if (id) {
      (async () => {
        dispatch(updateLoading(true))

        await dispatch(loadTable(id))

        dispatch(updateLoading(false))
      })()
    }
  }, [id])

  useEffect(() => {
    id
      ? form.setFieldsValue(table)
      : form.setFieldsValue({})

  }, [id, table])

  const onFinish = async (data) => {
    dispatch(updateLoading(true))

    id
      ? await dispatch(updateTable({ id, ...data }))
      : await dispatch(createTable(data))

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
          disabled={!!id}
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
          {id ? 'Atualizar' : 'Cadastrar'}
        </Button>
      </UnitFormItem>
    </UnitForm>
  )
}
