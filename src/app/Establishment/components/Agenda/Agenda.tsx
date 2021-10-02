/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useCallback } from 'react'

import { CustomScheduleComponent, MainWrapper } from './styles'
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks'
import { loadSchedule } from '../../../../hooks/Schedule';

import {
  WorkWeek,
  Inject,
  ViewsDirective,
  ViewDirective,
  ScheduleComponent
} from '@syncfusion/ej2-react-schedule';

import { extend } from '@syncfusion/ej2-base';

import { DateTime } from 'luxon';
import { loadReservations, setReservationInterval } from '../../../../hooks/Reservation';
import { updateLoading } from '../../../../hooks/Common';

export type ReservationDefinition = {
  establishment_id?: number
  table_id?: number
  status_id?: string
  schedule: any
}

const formatDate = (date: Date): DateTime => DateTime.fromJSDate(new Date(date)).toUTC()

export function Agenda({ schedule: scheduleId }: ReservationDefinition) {

  const dispatch = useAppDispatch();

  const schedule = useAppSelector(state => state.schedule.load.filtered);
  const reservations = useAppSelector(state => state.reservation.load.list)

  const { establishment, table } = useAppSelector(state => state.reservation.create.params)

  const workingDays = useCallback((): number[] => {
    dispatch(updateLoading(true))
    if (schedule?.state === 'ok' && schedule?.data.definition) {
      dispatch(updateLoading(false))
      return Object.keys(schedule?.data.definition).map(day => +day)
    }
    return [1]
  }, [schedule]);

  const getCurrentReservations = (reservations) => {
    return reservations.data.map(({ id, interval: { end, start } }) => ({
      Id: id,
      Subject: `Reserva ${id}`,
      StartTime: DateTime.fromISO(start).toJSDate(),
      EndTime: DateTime.fromISO(end).toJSDate()
    }))
  }

  const getEventSettings = useCallback((reservationList = []): any => {
    if (reservations?.state === 'ok') {
      reservationList = getCurrentReservations(reservations)
    }
    return extend([], reservationList, undefined, true);;
  }, [reservations])

  const handleEvent = useCallback((event) => {
    switch (event.type) {
      case 'QuickInfo':
        const { StartTime, EndTime } = event.data;

        const interval = {
          start: formatDate(StartTime).plus({ milliseconds: 1 }).toString(),
          end: formatDate(EndTime).minus({ milliseconds: 1 }).toString()
        }

        dispatch(setReservationInterval(interval))

        break
      case 'ViewEventInfo':
        event.cancel = true
        break
    }
  }, [reservations])

  const handleConfig = useCallback((scheduleConfig: ScheduleComponent) => {
    if (scheduleConfig) {
      scheduleConfig.eventSettings.allowDeleting = false
      scheduleConfig.eventSettings.allowEditing = false
    }
  }, [])

  const onAction = useCallback(async (event) => {
    switch (event.requestType) {
      case 'dateNavigate':
        event.cancel = true
        break
    }
  }, [])

  useEffect(() => {
    (async () => {
      await dispatch(loadSchedule(scheduleId))
      await dispatch(loadReservations({ establishment_id: establishment, table_id: table }))
    })()
  }, [scheduleId])

  return (
    <MainWrapper>
      <CustomScheduleComponent
        width='100%'
        height='auto'
        eventSettings={{ dataSource: getEventSettings() }}
        popupOpen={handleEvent}
        workDays={workingDays()}
        currentView='WorkWeek'
        actionComplete={onAction}
        ref={scheduleRef => handleConfig(scheduleRef)}
      >
        <ViewsDirective>
          <ViewDirective option='WorkWeek' />
        </ViewsDirective>
        <Inject services={[WorkWeek]} />
      </CustomScheduleComponent>
    </MainWrapper>
  )
}

