import React from 'react'

import { Button } from 'antd'
import { updateModal } from '../../../../../../hooks/Common'
import { useAppDispatch } from '../../../../../../hooks/hooks'
import { UnitTable } from '../../styles'
import { ActionButton } from '../ActionButton/ActionButton'
import { CreateMenu } from './components/CreateMenu/CreateMenu'
import { DeleteMenu } from './components/DeleteMenu/DeleteMenu'

type MenuFormParams = {
  menu_items: any[]
}

export function MenuTable({ menu_items }: MenuFormParams): JSX.Element {
  const dispatch = useAppDispatch()

  const editMenu = (id: number): void => {
    dispatch(updateModal({
      enabled: true,
      component: <div>Oi lindo oi</div>,
      title: 'Alterar menu'
    }))
  }

  const deleteMenu = (id: number): void => {
    dispatch(updateModal({
      enabled: true,
      component: <DeleteMenu id={id}/>,
      title: 'Deletar cardápio'
    }))
  }

  const addMenu = () => {
    dispatch(updateModal({
      enabled: true,
      component: <CreateMenu/>,
      title: 'Novo cardápio'
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
      render: (id: number) => <ActionButton onEdit={() => editMenu(id)} onDelete={() => deleteMenu(id)}/>
    }
  ]

  return (
    <UnitTable
      size='small'
      columns={tableColumns}
      dataSource={menu_items}
      scroll={{x: '600px'}}
      title={() => 'Cardápio'}
      footer={() => (<Button type="primary" onClick={addMenu}>Adicionar novo cardápio</Button>)}
    />
  )
}