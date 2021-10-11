import React from 'react'

import { useAppDispatch } from '../../../../hooks/hooks'
import { AgendaForm } from './components/AgendaForm/AgendaForm'
import { EnvironmentForm } from './components/EnvironmentForm/EnvironmentForm'
import { MenuForm } from './components/MenuForm/MenuForm'
import { TableForm } from './components/TableForm/TableForm'
import { Container, MainWrapper, UnitForm } from './styles'

type ConfigureParams = {
  establishment: any
}

export function Configure({ establishment }: ConfigureParams): JSX.Element {

  const dispatch = useAppDispatch()

  return (
    <MainWrapper>
      {establishment
        ? (
          <Container>
            <EnvironmentForm environments={establishment.environments} />
            <MenuForm menu_items={establishment.menu_items} />
            <TableForm
              tables={establishment.environments.flatMap(environment => environment.tables)}
            />
            <AgendaForm schedule={establishment.schedule} />
          </Container>
        )
        : <div>Configurações vazias</div>
      }
    </MainWrapper>
  )
}