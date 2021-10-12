import React from 'react'

import { Button } from 'antd'

import { AllowedBox } from '../../../../../../components/AllowedBox/AllowedBox'
import { updateModal } from '../../../../../../hooks/Common'
import { EnvironmentLocation } from '../../../../../../hooks/Environment'
import { useAppDispatch } from '../../../../../../hooks/hooks'
import { UnitTable } from '../../styles'
import { ActionButton } from '../ActionButton/ActionButton'
import { CreateEnvironment } from './components/CreateEnvironment/CreateEnvironment'
import { EditEnvironment } from './components/EditEnvironment/EditEnvironment'
import { DeleteEnvironment } from './components/DeleteEnvironment/DeleteEnvironment'

type EnvironmentFormParams = {
  environments: any[]
}

export function EnvironmentTable({ environments }: EnvironmentFormParams): JSX.Element {

  const dispatch = useAppDispatch()

  const editEnvironment = ({ id }): void => {
    console.log(id)
    dispatch(updateModal({
      enabled: true,
      component: <EditEnvironment/>,
      title: 'Alterar ambiente'
    }))
  }

  const deleteEnvironment = ({ id }): void => {
    console.log(id)
    dispatch(updateModal({
      enabled: true,
      component: <DeleteEnvironment/>,
      title: 'Alterar ambiente'
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
      render: (id: string) => <ActionButton onEdit={() => editEnvironment({ id })} onDelete={() => deleteEnvironment({ id })} />
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
      footer={() => (<Button onClick={addEnvironment}>Adicionar ambiente</Button>)}
    />
  )
}