import React, { useEffect, useCallback, useState } from 'react'

import { DateTime } from 'luxon'
import { Input, TimePicker } from 'antd'
import moment from 'moment'

import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks'
import { loadSchedule } from '../../../../hooks/Schedule'
import { loadReservations, setReservationInterval, setIndividualInfo } from '../../../../hooks/Reservation'
import { updateLoading } from '../../../../hooks/Common'

import { AgendaDescription, CustomAgenda, DateTimePicker, MainWrapper, WorkingDayDescription } from './styles'
import { ReservationForm } from './components/ReservationForm/ReservationForm'
import UserOutlined from '@ant-design/icons/lib/icons/UserOutlined'
import { MaskedInput } from 'antd-mask-input'
import PhoneOutlined from '@ant-design/icons/lib/icons/PhoneOutlined'
import { InputCard } from './components/ReservationForm/styles'
import { cleanText } from '../../../../utils'

require('moment/locale/pt.js')

export type ReservationDefinition = {
  establishment_id?: number
  table_id?: number
  status_id?: string
  schedule: any
}

const formatDate = (date: string): DateTime => DateTime.fromISO(date)
const dayFormat = 'dd/LL/yyyy'
const hourFormat = 'HH:mm:ss'

export function Agenda({ schedule: scheduleId }: ReservationDefinition): JSX.Element {

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1)

  const dispatch = useAppDispatch()

  const schedule = useAppSelector(state => state.schedule.load.filtered)
  const reservations = useAppSelector(state => state.reservation.load.list)

  const { establishment, table } = useAppSelector(state => state.reservation.create.params)

  const [reservationDate, setReservationDate] = useState(DateTime.now())

  const [stateStartTime, setStartTime] = useState(moment())
  const [stateEndTime, setEndTime] = useState(moment())

  const [stateStartDate, setStartDate] = useState(DateTime.now().toJSDate())
  const [cpf, setCpf] = useState('')
  const [phone, setPhone] = useState('')

  const classes = {
    'canceled':'red',
    'scheduled': 'lightgreen',
    'finished': 'lightblue',
  }

  const getWorkingDays = useCallback((): JSX.Element[] => {
    dispatch(updateLoading(true))
    if (schedule?.state === 'ok' && schedule?.data?.definition) {
      dispatch(updateLoading(false))
      return Object.entries(schedule?.data.definition).map(([day, interval]) => {
        return (
          <WorkingDayDescription key={`schedule-${day}`}>
            <p>{capitalize(DateTime.local().set({ weekday: +day }).weekdayLong)}: {interval.start} - {interval.end}</p>
          </WorkingDayDescription>
        )
      })
    }
    return []
  }, [schedule])

  const getCurrentReservations = useCallback(() => {
    return reservations.data.map(({ id, interval: { end, start }, status }) => ({
      _id: `reservation-${id}`,
      name: `Reserva ${id}`,
      startDateTime: DateTime.fromISO(start).toJSDate(),
      endDateTime: DateTime.fromISO(end).toJSDate(),
      classes: status
    }))
  }, [reservations])

  const updateIntervalInfo = (value, action) => {
    switch (action) {
    case 'cell':
      setReservationDate(formatDate(value))
      setStartTime(moment(formatDate(value).toFormat(hourFormat), hourFormat))
      setEndTime(moment(formatDate(value).plus({ hours: 1 }).toFormat(hourFormat), hourFormat))
      break
    case 'range':
      setReservationDate(formatDate(value[0]))
      setStartTime(moment(formatDate(value[0]).toFormat(hourFormat), hourFormat))
      setEndTime(moment(formatDate(value[1]).plus({ hours: 1 }).toFormat(hourFormat), hourFormat))
    }
  }

  useEffect(() => {
    (async () => {
      await dispatch(loadSchedule(scheduleId))
      await dispatch(loadReservations({ establishment_id: establishment, table_id: table }))
    })()
  }, [scheduleId, table, establishment])

  useEffect(() => {
    const formattedDate = reservationDate.toFormat('yyyy-LL-dd')

    const interval = {
      start: formatDate(`${DateTime.fromISO(`${formattedDate}T${stateStartTime.format(hourFormat)}`)}`).plus({ milliseconds: 1 }).toString(),
      end: formatDate(`${DateTime.fromISO(`${formattedDate}T${stateEndTime.format(hourFormat)}`)}`).minus({ milliseconds: 1 }).toString(),
    }

    dispatch(setReservationInterval(interval))
  }, [reservationDate, stateStartTime, stateEndTime])

  useEffect(() => {
    dispatch(setIndividualInfo({cpf, phone}))
  }, [cpf, phone])

  /**
  * @todo add cpf and phone
  */

  return (
    <MainWrapper>
      <AgendaDescription>
        <h4>Hor??rios de funcionamento</h4>
        {getWorkingDays()}
      </AgendaDescription>
      <DateTimePicker visible={true}>
        <h4>Data de agendamento: {reservationDate.toFormat(dayFormat)}</h4>
        <TimePicker
          allowClear
          size='large'
          value={stateStartTime}
          onChange={(value) => setStartTime(value!)}
          placeholder='Entrada'
        />
        <TimePicker
          allowClear
          size='large'
          value={stateEndTime}
          onChange={(value) => setEndTime(value!)}
          placeholder='Sa??da'
        />
      </DateTimePicker>
      <InputCard>
        <MaskedInput
          value={cpf}
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="CPF"
          mask='111.111.111-11'
          onChange={({ target }) => setCpf(cleanText(target.value))}
        />
        <MaskedInput
          value={phone}
          prefix={<PhoneOutlined className="site-form-item-icon" />}
          placeholder="Telefone"
          mask="+11 (11) 11111-1111"
          onChange={({ target }) => setPhone(cleanText(target.value))}
        />
      </InputCard>
      <CustomAgenda
        startDate={stateStartDate}
        minDate={DateTime.now().set({ hour: 0, minute: 0, millisecond: 0 }).toJSDate()}
        items={getCurrentReservations()}
        itemColors={classes}
        onCellSelect={(value) => updateIntervalInfo(value, 'cell')}
        onRangeSelection={(value) => updateIntervalInfo(value, 'range')}
        onDateRangeChange={(startDate) => setStartDate(startDate)}
        numberOfDays={getWorkingDays().length}
        rowsPerHour={1}
        locale='pt'
        fixedHeader={true}
        itemComponent={ReservationForm}
      />
    </MainWrapper>
  )
}
