import React from 'react'
import { updateModal } from '../../../../../../hooks/Common'
import { useAppDispatch } from '../../../../../../hooks/hooks'
import { UnitForm, UnitTable } from '../../styles'
import { ActionButton } from '../ActionButton/ActionButton'

type EnvironmentFormParams = {
  environments: any[]
}

export function EnvironmentForm({ environments }: EnvironmentFormParams): JSX.Element {

  const dispatch = useAppDispatch()

  const editEnvironment = ({ id }): void => {
    console.log(id)
    dispatch(updateModal({
      enabled: true,
      component: <div>Oi lindo oi</div>,
      title: 'Alterar ambiente'
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
      dataIndex: 'location'
    },
    {
      title: 'Permitido pets',
      dataIndex: 'pets_allowed'
    },
    {
      title: 'Permitido fumar',
      dataIndex: 'smoking_allowed',
    },
    {
      title: 'Ações',
      dataIndex: 'id',
      render: (id: string) => <ActionButton onEdit={() => editEnvironment({ id })} onDelete={() => { console.log(id) }} />
    }
  ]

  return (
    <UnitForm
      key="environment-form"
    >
      <UnitTable
        size='small'
        columns={tableColumns}
        dataSource={environments}
        scroll={{ x: '600px' }}
        key="environment-table"
      />
    </UnitForm>
  )
}