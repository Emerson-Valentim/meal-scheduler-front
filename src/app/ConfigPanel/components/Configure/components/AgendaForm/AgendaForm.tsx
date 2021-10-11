import React from 'react'
import { UnitForm } from '../../styles'

type AgendaFormParams = {
  schedule: any
}

export function AgendaForm({ schedule }: AgendaFormParams): JSX.Element {
  return (
    <UnitForm>
      {
        schedule
      }
    </UnitForm>
  )
}