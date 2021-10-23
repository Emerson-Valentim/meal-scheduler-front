import React from 'react'
import { MainWrapper } from './styles'
import { UnitForm } from '../../styles'

type AgendaFormParams = {
  schedule: any
}

export function AgendaTable({ schedule }: AgendaFormParams): JSX.Element {
  /**
  * @todo Implement this screen.
  */
  return (
    <MainWrapper>
      <h4>Horário de atendimento</h4>
      <UnitForm
        onFinish={(value) => console.log(value)}
      >
        {['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'].map((day, index) => (
          day
        ))}
      </UnitForm>
    </MainWrapper>
  )
}