import React, { useEffect } from 'react'

import { MainWrapper } from './styles'
import { UnitForm, UnitFormItem } from '../../styles'

import { Button, TimePicker, Form } from 'antd'
import { DateTime } from 'luxon'
import moment from 'moment'

import { useAppDispatch, useAppSelector } from '../../../../../../hooks/hooks'
import { createSchedule, loadSchedule, updateSchedule } from '../../../../../../hooks/Schedule'
import { updateLoading } from '../../../../../../hooks/Common'
import { loadEstablishment } from '../../../../../../hooks/Establishment'

const { RangePicker } = TimePicker

type AgendaFormParams = {
  schedule: any
}

export function Agenda({ schedule }: AgendaFormParams): JSX.Element {

  const dispatch = useAppDispatch()

  const [form] = Form.useForm()

  const { data: scheduleData } = useAppSelector(state => state.schedule.load.filtered)
  const establishment_id = useAppSelector((state) => state.establishment.load.filtered.data.id)

  const toMoment = (hourValue: string) => {
    const [hour, minute, second] = hourValue.split(':')
    return moment().set({
      hour: +hour,
      minute: +minute,
      second: +second
    })

  }

  useEffect(() => {
    (async () => {
      dispatch(updateLoading(true))
      schedule
        ? await dispatch(loadSchedule(schedule))
        : form.setFieldsValue({})
      dispatch(updateLoading(false))
    })()
  }, [])

  useEffect(() => {
    if(scheduleData) {
      const formData = Object.entries(scheduleData.definition).reduce((object, [key, { start, end }]: any) => {
        object[key] = [toMoment(start), toMoment(end)]
        return object
      }, {})

      form.setFieldsValue(formData)
    }
  }, [scheduleData])

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

    dispatch(updateLoading(true))

    schedule
      ? await dispatch(updateSchedule({ definition, id: schedule }))
      : await dispatch(createSchedule({ definition }))

    await dispatch(loadEstablishment(establishment_id))

    dispatch(updateLoading(false))

  }

  return (
    <MainWrapper>
      <h3>Horário de atendimento</h3>
      <UnitForm
        onFinish={onFinish}
        form={form}
      >
        {['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'].map((day, index) => (
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