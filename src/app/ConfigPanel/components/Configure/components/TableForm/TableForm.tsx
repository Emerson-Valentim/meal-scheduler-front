import React from 'react'
import { UnitForm, UnitTable } from '../../styles'
import { ActionButton } from '../ActionButton/ActionButton'

type TableFormParams = {
  tables: any[]
}

export function TableForm({ tables }: TableFormParams): JSX.Element {

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
      render: (id: string) => <ActionButton onEdit={() => { console.log(id) }} onDelete={() => { console.log(id) }}/>
    }
  ]

  return (
    <UnitForm>
      <UnitTable
        size='small'
        columns={tableColumns}
        dataSource={tables}
      />
    </UnitForm>
  )
}