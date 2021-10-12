import React from 'react'

import { updateModal } from '../../../../../../hooks/Common'
import { useAppDispatch } from '../../../../../../hooks/hooks'
import { UnitTable } from '../../styles'
import { ActionButton } from '../ActionButton/ActionButton'

type TableFormParams = {
  tables: any[]
}

export function TableForm({ tables }: TableFormParams): JSX.Element {

  const dispatch = useAppDispatch()

  const editTable = ({ id }): void => {
    dispatch(updateModal({
      enabled: true,
      component: <div>Oi lindo oi</div>,
      title: 'Alterar mesa'
    }))
  }

  const tableColumns = [
    {
      title: 'ID',
      dataIndex: 'id'
    },
    {
      title: 'Número da mesa',
      dataIndex: 'identification'
    },
    {
      title: 'Lugares',
      dataIndex: 'seats'
    },
    {
      title: 'ID do ambiente',
      dataIndex: 'environment'
    },
    {
      title: 'Ações',
      dataIndex: 'id',
      render: (id: string) => <ActionButton onEdit={() => editTable({ id })} onDelete={() => { console.log(id) }}/>
    }
  ]

  return (
    <UnitTable
      size='small'
      columns={tableColumns}
      dataSource={tables}
      scroll={{x: '600px'}}
      title={() => 'Mesas'}
    />
  )
}