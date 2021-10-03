/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useCallback, useState } from 'react'

import { DateTime } from 'luxon';
import { TimePicker } from 'antd';
import moment from 'moment';

import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks'
import { loadSchedule } from '../../../../hooks/Schedule';
import { loadReservations, setReservationInterval } from '../../../../hooks/Reservation';
import { updateLoading } from '../../../../hooks/Common';

import { AgendaDescription, CustomAgenda, DateTimePicker, MainWrapper, WorkingDayDescription } from './styles'

require('moment/locale/pt.js');

export type ReservationDefinition = {
  establishment_id?: number
  table_id?: number
  status_id?: string
  schedule: any
}

const formatDate = (date: string): DateTime => DateTime.fromISO(date)
const dayFormat = 'dd/LL/yyyy'
const hourFormat = 'HH:mm:ss'

export function Agenda({ schedule: scheduleId }: ReservationDefinition) {

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1)

  const dispatch = useAppDispatch();

  const schedule = useAppSelector(state => state.schedule.load.filtered);
  const reservations = useAppSelector(state => state.reservation.load.list)

  const { establishment, table } = useAppSelector(state => state.reservation.create.params)

  const [visible, setVisible] = useState(false)

  const [reservationDate, setReservationDate] = useState(DateTime.now())

  const [stateStartTime, setStartTime] = useState(moment())
  const [stateEndTime, setEndTime] = useState(moment())

  const [stateStartDate, setStartDate] = useState(DateTime.now().toJSDate())

  const colors = {
    'currentUser': "rgba(102, 195, 131, 1)",
    "otherUser": "rgba(242, 177, 52, 1)",
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
  }, [schedule]);

  const getCurrentReservations = useCallback(() => {
    return reservations.data.map(({ id, interval: { end, start } }) => ({
      _id: `reservation-${id}`,
      name: `Reserva ${id}`,
      startDateTime: DateTime.fromISO(start).toJSDate(),
      endDateTime: DateTime.fromISO(end).toJSDate(),
      classes: 'currentUser'
    }))
  }, [reservations])

  const updateReservationState = (value, action) => {
    switch (action) {
      case 'cell':
        setReservationDate(formatDate(value))
        setStartTime(moment(formatDate(value).toFormat(hourFormat), hourFormat))
        setEndTime(moment(formatDate(value).plus({ hours: 1 }).toFormat(hourFormat), hourFormat))
        break
      case 'range':
        if(value[1] === value[0]) {
          setReservationDate(formatDate(value[1]))
          setStartTime(moment(formatDate(value[0]).toFormat(hourFormat), hourFormat))
          setEndTime(moment(formatDate(value[1]).plus({ hours: 1 }).toFormat(hourFormat), hourFormat))
        }
    }
  }

  const createReservation = useCallback(async (value, action) => {
    setVisible(true)
    updateReservationState(value, action)

    const formattedDate = reservationDate.toFormat('yyyy-LL-dd')

    const interval = {
      start: formatDate(`${DateTime.fromISO(`${formattedDate}T${stateStartTime.format(hourFormat)}`)}`).plus({ milliseconds: 1 }).toString(),
      end: formatDate(`${DateTime.fromISO(`${formattedDate}T${stateEndTime.format(hourFormat)}`)}`).minus({ milliseconds: 1 }).toString(),
    }

    dispatch(setReservationInterval(interval))
  }, [reservationDate, stateStartTime, stateEndTime])

  useEffect(() => {
    (async () => {
      await dispatch(loadSchedule(scheduleId))
      await dispatch(loadReservations({ establishment_id: establishment, table_id: table }))
    })()
  }, [scheduleId, table, establishment])

  return (
    <MainWrapper>
      <AgendaDescription>
        <h4>Horários de funcionamento</h4>
        {getWorkingDays()}
      </AgendaDescription>
      <DateTimePicker visible={visible}>
        <h4>Data de agendamento: {reservationDate.toFormat(dayFormat)}</h4>
        <TimePicker
          allowClear
          size="large"
          value={stateStartTime}
          placeholder="Entrada"
        />
        <TimePicker
          allowClear
          size="large"
          value={stateEndTime}
          placeholder="Saída"
        />
      </DateTimePicker>
      <CustomAgenda
        startDate={stateStartDate}
        minDate={DateTime.now().set({ hour: 0, minute: 0, millisecond: 0}).toJSDate()}
        items={getCurrentReservations()}
        itemColos={colors}
        onCellSelect={(value) => createReservation(value, 'cell')}
        onRangeSelection={(value) => createReservation(value, 'action')}
        onDateRangeChange={(startDate) => setStartDate(startDate)}
        numberOfDays={getWorkingDays().length}
        rowsPerHour={1}
        locale='pt'
      />
    </MainWrapper>
  )
}

