import React from 'react'

import { updateModal } from '../../../../../../hooks/Common'
import { useAppDispatch } from '../../../../../../hooks/hooks'
import { UnitTable } from '../../styles'
import { ActionButton } from '../ActionButton/ActionButton'

type MenuFormParams = {
  menu_items: any[]
}

export function MenuTable({ menu_items }: MenuFormParams): JSX.Element {
  const dispatch = useAppDispatch()

  const editMenu = ({ id }): void => {
    console.log(id)
    dispatch(updateModal({
      enabled: true,
      component: <div>Oi lindo oi</div>,
      title: 'Alterar menu'
    }))
  }

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
      render: (id: string) => <ActionButton onEdit={() => editMenu({ id })} onDelete={() => { console.log(id) }}/>
    }
  ]

  return (
    <UnitTable
      size='small'
      columns={tableColumns}
      dataSource={menu_items}
      scroll={{x: '600px'}}
      title={() => 'Cardápio'}
    />
  )
}