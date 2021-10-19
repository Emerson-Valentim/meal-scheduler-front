import React from 'react'

import { Button } from 'antd'

import { AllowedBox } from '../../../../../../components/AllowedBox/AllowedBox'
import { updateModal } from '../../../../../../hooks/Common'
import { EnvironmentLocation } from '../../../../../../hooks/Environment'
import { useAppDispatch } from '../../../../../../hooks/hooks'
import { UnitTable } from '../../styles'
import { ActionButton } from '../ActionButton/ActionButton'
import { CreateEnvironment } from './components/CreateEnvironment/CreateEnvironment'
import { DeleteEnvironment } from './components/DeleteEnvironment/DeleteEnvironment'

type EnvironmentFormParams = {
  environments: any[]
}

export function EnvironmentTable({ environments }: EnvironmentFormParams): JSX.Element {

  const dispatch = useAppDispatch()

  const editEnvironment = (id: number): void => {
    dispatch(updateModal({
      enabled: true,
      component: <CreateEnvironment id={id}/>,
      title: 'Alterar ambiente'
    }))
  }

  const deleteEnvironment = (id: number): void => {
    dispatch(updateModal({
      enabled: true,
      component: <DeleteEnvironment id={id}/>,
      title: 'Deletar ambiente'
    }))
  }

  const addEnvironment = () => {
    dispatch(updateModal({
      enabled: true,
      component: <CreateEnvironment/>,
      title: 'Novo ambiente'
    }))
  }

  const tableColumns = [
    {
      title: 'ID',
      dataIndex: 'id'
    },
    {
      title: 'Descrição',
      dataIndex: 'description'
    },
    {
      title: 'Localização',
      dataIndex: 'location',
      render: (text: string) => EnvironmentLocation[text]
    },
    {
      title: 'Permitido pets',
      dataIndex: 'pets_allowed',
      render: (allow: boolean) => <AllowedBox allow={allow}/>
    },
    {
      title: 'Permitido fumar',
      dataIndex: 'smoking_allowed',
      render: (allow: boolean) => <AllowedBox allow={allow}/>
    },
    {
      title: 'Ações',
      dataIndex: 'id',
      render: (id: number) => <ActionButton onEdit={() => editEnvironment(id)} onDelete={() => deleteEnvironment(id)} />
    }
  ]

  return (
    <UnitTable
      size='small'
      columns={tableColumns}
      dataSource={environments}
      scroll={{ x: '600px' }}
      key="environment-table"
      title={() => 'Ambientes'}
      footer={() => (<Button type="primary" onClick={addEnvironment}>Adicionar ambiente</Button>)}
    />
  )
}