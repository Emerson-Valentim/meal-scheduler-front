import React, { useEffect, useState } from 'react'

import { Button } from 'antd'
import { FaExclamationCircle, FaCheck, FaSpinner } from 'react-icons/fa'

import { updateLoading } from '../../../../../../hooks/Common'
import { updateReservation } from '../../../../../../hooks/Reservation'
import { useAppDispatch, useAppSelector } from '../../../../../../hooks/hooks'
import { privateLoadReservations, ReservationStatus } from '../../../../../../hooks/Reservation'
import { UnitTable } from '../../styles'
import { ButtonWrapper } from './styles'
import { DateTime } from 'luxon'

export function ReservationTable(): JSX.Element {

  const [selectedReservation, setSelectedReservations] = useState<any[]>([])

  const dispatch = useAppDispatch()
  const reservations = useAppSelector((state) => state.reservation.privateLoad.list.data)

  const ReservationStatusComponent = {
    [ReservationStatus.CANCELED]: <FaExclamationCircle color='red'/>,
    [ReservationStatus.FINISHED]: <FaCheck color='green'/>,
    [ReservationStatus.SCHEDULED]: <FaSpinner color='blue'/>,
  }

  const updateReservationStatus = async (status: ReservationStatus) => {
    dispatch(updateLoading(true))

    const promises = selectedReservation.map(async reservation => dispatch(updateReservation({id: reservation.id, status})))

    await Promise.allSettled(promises)
    await dispatch(privateLoadReservations())

    dispatch(updateLoading(false))
  }

  useEffect(() => {
    (async () => {
      dispatch(updateLoading(true))
      await dispatch(privateLoadReservations())
      dispatch(updateLoading(false))
    })()
  }, [])

  const tableColumns = [
    {
      title: 'ID',
      dataIndex: 'id'
    },
    {
      title: 'Dia',
      dataIndex: 'interval',
      render: (interval) => DateTime.fromISO(interval.start).toFormat('dd/LL/yyyy')
    },
    {
      title: 'Hora',
      dataIndex: 'interval',
      render: (interval) => `${DateTime.fromISO(interval.start).toFormat('hh:mm:ss')} - ${DateTime.fromISO(interval.end).toFormat('hh:mm:ss')}`
    },
    {
      title: 'Telefone',
      dataIndex: 'phone'
    },
    {
      title: 'Mesa',
      dataIndex: 'table'
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (status: string) => ReservationStatusComponent[status]
    },
  ]

  return (
    <UnitTable
      size='small'
      rowSelection={{
        type: 'checkbox',
        onChange: (selectedRows) => setSelectedReservations(selectedRows),
        getCheckboxProps: (record) => ({
          id: record.id,
        }),
      }}
      columns={tableColumns}
      dataSource={reservations}
      scroll={{x: '600px'}}
      title={() => 'Reservas'}
      footer={() => (
        <ButtonWrapper>
          <Button type="primary" onClick={() => updateReservationStatus(ReservationStatus.CANCELED)}>Cancelar</Button>
          <Button type="primary" onClick={() => updateReservationStatus(ReservationStatus.FINISHED)}>Finalizar</Button>
        </ButtonWrapper>
      )}
    />
  )
}