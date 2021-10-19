import React, { useEffect } from 'react'

import { Button, Checkbox, Form, Input, Select } from 'antd'
import { UnitForm, UnitFormItem } from '../../../../styles'
import { createEnvironment, EnvironmentLocation, loadEnvironment, updateEnvironment } from '../../../../../../../../hooks/Environment'
import { useAppDispatch, useAppSelector } from '../../../../../../../../hooks/hooks'
import { updateLoading, updateModal } from '../../../../../../../../hooks/Common'
import { loadEstablishment } from '../../../../../../../../hooks/Establishment'

const { Option } = Select
const { TextArea } = Input

type EditEnvironmentParams = {
  id?: number
}

export function CreateEnvironment({ id }: EditEnvironmentParams): JSX.Element {

  const [form] = Form.useForm()
  const dispatch = useAppDispatch()

  const { data: environment } = useAppSelector((state) => state.environment.load.filtered)
  const establishment_id = useAppSelector((state) => state.establishment.load.filtered.data.id)

  useEffect(() => {
    if (id) {
      (async () => {
        dispatch(updateLoading(true))

        await dispatch(loadEnvironment(id))

        dispatch(updateLoading(false))
      })()
    }
  }, [id])

  useEffect(() => {
    id
      ? form.setFieldsValue(environment)
      : form.setFieldsValue({
        description: '',
        location: 'indoor',
        smoking_allowed: false,
        pets_allowed: false
      })
  }, [id, environment])

  const onFinish = async (data) => {
    dispatch(updateLoading(true))

    id
      ? await dispatch(updateEnvironment({ id, ...data }))
      : await dispatch(createEnvironment({ establishment: establishment_id, ...data }))

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
      name="create-environment"
      onFinish={onFinish}
      form={form}
    >
      <UnitFormItem name="description"
        rules={[{ required: true, message: 'Por favor preencha a descrição!' }]}
        label="Descrição"
      >
        <TextArea
          autoSize={true}
          style={{ resize: 'none' }}
        />
      </UnitFormItem>
      <UnitFormItem
        name="location"
        label=" Localização"
      >
        <Select
          defaultValue='indoor'
          onChange={(value) => form.setFieldsValue({ location: value })}
        >
          <Option value='indoor'>{EnvironmentLocation.indoor}</Option>
          <Option value='outdoor'>{EnvironmentLocation.outdoor}</Option>
        </Select>
      </UnitFormItem>
      <UnitFormItem name="smoking_allowed" valuePropName="checked">
        <Checkbox>Permitido fumar</Checkbox>
      </UnitFormItem>
      <UnitFormItem name="pets_allowed" valuePropName="checked">
        <Checkbox>Permitido pets</Checkbox>
      </UnitFormItem>
      <UnitFormItem style={{ textAlign: 'center' }}>
        <Button type="primary" htmlType="submit">
          {id ? 'Atualizar' : 'Cadastrar'}
        </Button>
      </UnitFormItem>
    </UnitForm>
  )
}