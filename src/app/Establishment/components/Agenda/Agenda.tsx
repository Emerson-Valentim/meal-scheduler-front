/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useCallback, useState } from 'react'

import { AgendaDescription, CreateEventModal, CustomAgenda, MainWrapper, WorkingDayDescription } from './styles'
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks'
import { loadSchedule } from '../../../../hooks/Schedule';

import { DateTime } from 'luxon';
import { loadReservations, setReservationInterval } from '../../../../hooks/Reservation';
import { updateLoading } from '../../../../hooks/Common';

require('moment/locale/pt.js');

export type ReservationDefinition = {
  establishment_id?: number
  table_id?: number
  status_id?: string
  schedule: any
}

const formatDate = (date: Date): DateTime => DateTime.fromJSDate(new Date(date)).toUTC()

export function Agenda({ schedule: scheduleId }: ReservationDefinition) {

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const dispatch = useAppDispatch();

  const schedule = useAppSelector(state => state.schedule.load.filtered);
  const reservations = useAppSelector(state => state.reservation.load.list)

  const { establishment, table } = useAppSelector(state => state.reservation.create.params)

  const [visible, setVisible] = useState(false)

  const colors = {
    'currentUser': "rgba(102, 195, 131, 1)",
    "otherUser": "rgba(242, 177, 52, 1)",
  }

  const workingDays = useCallback((): JSX.Element[] => {
    dispatch(updateLoading(true))
    if (schedule?.state === 'ok' && schedule?.data?.definition) {
      dispatch(updateLoading(false))
      return Object.entries(schedule?.data.definition).map(([day, interval]) => (
        <WorkingDayDescription key={`schedule-${day}`}>
          <p>{capitalize(DateTime.local().set({ weekday: +day }).weekdayLong)}: {interval.start} - {interval.end}</p>
        </WorkingDayDescription>
      ))
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

  const createReservation = useCallback((event) => {
    setVisible(true)
    // const { StartTime, EndTime } = event.data;

    // const interval = {
    //   start: formatDate(StartTime).plus({ milliseconds: 1 }).toString(),
    //   end: formatDate(EndTime).minus({ milliseconds: 1 }).toString()
    // }

    // dispatch(setReservationInterval(interval))
  }, [reservations])

  useEffect(() => {
    (async () => {
      await dispatch(loadSchedule(scheduleId))
      await dispatch(loadReservations({ establishment_id: establishment, table_id: table }))
    })()
  }, [scheduleId])

  return (
    <MainWrapper>
      <AgendaDescription>
        <h4>Horários de funcionamento</h4>
        {workingDays()}
      </AgendaDescription>
      <CreateEventModal
        visible={visible}
        onCancel={() => setVisible(false)}
      >
        Olá
      </CreateEventModal>
      <CustomAgenda
        minDate={DateTime.now().toJSDate()}
        maxDate={DateTime.now().plus({ months: 2 }).toJSDate()}
        items={getCurrentReservations()}
        itemColos={colors}
        onCellSelect={createReservation}
        rowsPerHour={1}
        locale='pt'
      />
    </MainWrapper>
  )
}

