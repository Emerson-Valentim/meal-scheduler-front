import React from 'react'

import { Button } from 'antd'
import { updateModal } from '../../../../../../hooks/Common'
import { useAppDispatch } from '../../../../../../hooks/hooks'
import { UnitTable } from '../../styles'
import { ActionButton } from '../ActionButton/ActionButton'
import { CreateTable } from './components/CreateTable/CreateTable'
import { DeleteTable } from './components/DeleteTable/DeleteTable'

type TableFormParams = {
  tables: any[]
}

export function TableForm({ tables }: TableFormParams): JSX.Element {

  const dispatch = useAppDispatch()

  const editTable = (id: number): void => {
    dispatch(updateModal({
      enabled: true,
      component: <div>Oi lindo oi</div>,
      title: 'Alterar mesa'
    }))
  }

  const deleteTable = (id: number): void => {
    dispatch(updateModal({
      enabled: true,
      component: <DeleteTable id={id}/>,
      title: 'Deletar mesa'
    }))
  }

  const addTable = () => {
    dispatch(updateModal({
      enabled: true,
      component: <CreateTable/>,
      title: 'Nova mesa'
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
      render: (id: number) => <ActionButton onEdit={() => editTable(id)} onDelete={() => deleteTable(id)}/>
    }
  ]

  return (
    <UnitTable
      size='small'
      columns={tableColumns}
      dataSource={tables}
      scroll={{x: '600px'}}
      title={() => 'Mesas'}
      footer={() => (<Button type="primary" onClick={addTable}>Adicionar nova mesa</Button>)}
    />
  )
}