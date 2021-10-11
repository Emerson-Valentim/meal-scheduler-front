import React, { useState } from 'react'
import { UnitForm, UnitTable } from '../../styles'
import { ActionButton } from '../ActionButton/ActionButton'

type MenuFormParams = {
  menu_items: any[]
}

export function MenuForm({ menu_items }: MenuFormParams): JSX.Element {
  const tableColumns = [
    {
      title: 'ID',
      dataIndex: 'id'
    },
    {
      title: 'Nome',
      dataIndex: 'name'
    },
    {
      title: 'Ingredientes',
      dataIndex: 'ingredients'
    },
    {
      title: 'Valor',
      dataIndex: 'value'
    },
    {
      title: 'Extra',
      dataIndex: 'id',
      render: (id: string) => <ActionButton onEdit={() => { console.log(id) }} onDelete={() => { console.log(id) }}/>
    }
  ]

  return (
    <UnitForm>
      <UnitTable
        size='small'
        columns={tableColumns}
        dataSource={menu_items}
        scroll={{x: '600px'}}
      />
    </UnitForm>
  )
}