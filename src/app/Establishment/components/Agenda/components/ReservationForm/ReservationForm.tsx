/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useCallback } from 'react'

import { DateTime } from 'luxon'

import { AgendaCard } from './styles'
import { useAppDispatch, useAppSelector } from '../../../../../../hooks/hooks'
import { setReservationDelete, safeUpdateReservation, loadReservations } from '../../../../../../hooks/Reservation'
import { Popconfirm } from 'antd'
import { updateLoading } from '../../../../../../hooks/Common'

export function ReservationForm({ item }) {

  const dispatch = useAppDispatch()

  const reservationId = useAppSelector((state) => state.reservation.delete.id)

  const [hasPermission] = useState(item.classes === 'currentUser')

  const handleClick = () => {
    if (hasPermission) {
      dispatch(setReservationDelete(+item._id.replace('reservation-', '')))
    }
  }

  const cancelReservation = useCallback(async () => {
    dispatch(updateLoading(true))
    
    await dispatch(safeUpdateReservation({
      id: reservationId,
      status: 'canceled',
      cpf: '46911198844',
      phone: '5511948083191'
    }))

    await dispatch(loadReservations())
    dispatch(updateLoading(false))
  }, [reservationId])

  const getDateInfo = (({ startDateTime, endDateTime }) => (
    <p>
      {`${DateTime.fromJSDate(startDateTime).toFormat('HH:mm')} - ${DateTime.fromJSDate(endDateTime).plus({ milliseconds: 1 }).toFormat('HH:mm')}`}
    </p>
  ))

  return (
    <Popconfirm
      placement="topLeft"
      title='Deseja cancelar essa reserva?'
      onConfirm={cancelReservation}
      onCancel={() => {
        dispatch(setReservationDelete(''))
      }}
      okText="Sim"
      cancelText="Não"
      disabled={!hasPermission}
    >
      <AgendaCard
        permission={hasPermission}
        onClick={handleClick}
        key={`item-${item._id}`}
      >
        <h4>{item.name}</h4>
        {getDateInfo(item)}
      </AgendaCard>
    </Popconfirm>
  )
}