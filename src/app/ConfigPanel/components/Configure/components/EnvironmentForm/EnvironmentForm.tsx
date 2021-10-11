import React from 'react'
import { UnitForm, UnitTable } from '../../styles'
import { ActionButton } from '../ActionButton/ActionButton'

type EnvironmentFormParams = {
  environments: any[]
}

export function EnvironmentForm({ environments }: EnvironmentFormParams): JSX.Element {

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
      render: (id: string) => <ActionButton onEdit={() => { console.log(id) }} onDelete={() => { console.log(id) }}/>
    }
  ]

  return (
    <UnitForm>
      <UnitTable
        size='small'
        columns={tableColumns}
        dataSource={environments}
      />
    </UnitForm>
  )
}