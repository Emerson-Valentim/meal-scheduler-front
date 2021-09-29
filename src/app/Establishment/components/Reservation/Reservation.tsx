/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'

import { MainWrapper } from '.'
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks'
import { loadSchedule } from '../../../../hooks/Schedule';

export function Reservation({ scheduleId }) {

  const dispatch = useAppDispatch();
  
  const schedule = useAppSelector(state => state.schedule.load.filtered);

  useEffect(() => {
    (async () => await dispatch(loadSchedule(scheduleId)))()
  }, [])

  return (
    <MainWrapper>
      { JSON.stringify(schedule) }
    </MainWrapper>
  )
}