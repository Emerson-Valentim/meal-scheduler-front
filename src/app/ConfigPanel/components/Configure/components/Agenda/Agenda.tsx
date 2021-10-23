import React, { useEffect } from 'react'

import { MainWrapper } from './styles'
import { UnitForm, UnitFormItem } from '../../styles'

import { Button, TimePicker, Form } from 'antd'
import { DateTime } from 'luxon'
import moment from 'moment'
import { useAppDispatch, useAppSelector } from '../../../../../../hooks/hooks'
import { createSchedule, updateSchedule } from '../../../../../../hooks/Schedule'

const { RangePicker } = TimePicker

type AgendaFormParams = {
  schedule: any
}

export function Agenda({ schedule }: AgendaFormParams): JSX.Element {

  const dispatch = useAppDispatch()

  const [form] = Form.useForm()

  useEffect(() => {
    schedule
      ? form.setFieldsValue({})
      : form.setFieldsValue({})
  }, [form])

  const onFinish = async (formValue) => {
    const definition = Object.entries(formValue).reduce((object, [key, value]: any) => {
      if (value) {
        object[key] = {
          start: DateTime.fromJSDate(value[0].toDate()).toFormat('HH:mm:ss'),
          end: DateTime.fromJSDate(value[1].toDate()).toFormat('HH:mm:ss')
        }
      }
      return object
    }, {})

    schedule
      ? await dispatch(updateSchedule({ definition, id: schedule }))
      : await dispatch(createSchedule({ definition }))
  }

  return (
    <MainWrapper>
      <h3>Horário de atendimento</h3>
      <UnitForm
        onFinish={onFinish}
        form={form}
      >
        {['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'].map((day, index) => (
          <UnitFormItem
            key={index}
            name={`${index + 1}`}
            valuePropName="value"
            label={day}
            colon={false}
          >
            <RangePicker placeholder={['Início', 'Fim']} />
          </UnitFormItem>
        ))}
        <UnitFormItem style={{ textAlign: 'center' }}>
          <Button type="primary" htmlType="submit">
            {schedule ? 'Atualizar' : 'Cadastrar'}
          </Button>
        </UnitFormItem>
      </UnitForm>

    </MainWrapper>
  )
}