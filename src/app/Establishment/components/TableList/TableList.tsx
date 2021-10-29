/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'

import Meta from 'antd/lib/card/Meta'

import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks'
import { filterTable } from '../../../../hooks/Reservation'
import { CustomViewBody } from '../../styles'
import { TableCard } from './styles'

type TableListParams = {
  tables: any[]
}

export function TableList({ tables }: TableListParams): JSX.Element {

  const dispatch = useAppDispatch()

  const { environments: stateEnvironments, table: stateTable } = useAppSelector(state => state.reservation.create.params)

  const selectTable = (id) => {
    stateTable === id
      ? dispatch(filterTable(undefined))
      : dispatch(filterTable(id))
  }

  const generateTableCard = (table) => (
    <TableCard
      key={`${table.id}-Table`}
      selected={stateTable === table.id}
      onClick={() => selectTable(table.id)}
    >
      <Meta
        title={`Mesa ${table.identification}`}
        description={`Mesa com ${table.seats} lugares`} />
    </TableCard>
  )

  return (
    <CustomViewBody>
      {tables?.map((table) => {
        if (!stateEnvironments.length) {
          return generateTableCard(table)
        }
        if (stateEnvironments.includes(table.environment)) {
          return generateTableCard(table)
        }
      })}
    </CustomViewBody>
  )
}