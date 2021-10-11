import React from 'react'

import { AgendaForm } from './components/AgendaForm/AgendaForm'
import { EnvironmentForm } from './components/EnvironmentForm/EnvironmentForm'
import { MenuForm } from './components/MenuForm/MenuForm'
import { TableForm } from './components/TableForm/TableForm'
import { Container, MainWrapper } from './styles'

type ConfigureParams = {
  establishment: any
}

export function Configure({ establishment }: ConfigureParams): JSX.Element {

  return (
    <MainWrapper>
      {establishment
        ? (
          <Container>
            <EnvironmentForm
              environments={establishment.environments}
              key='environment-form-wrapper'
            />
            <MenuForm
              menu_items={establishment.menu_items}
              key='menu-form-wrapper'
            />
            <TableForm
              tables={establishment.environments.flatMap(environment => environment.tables)}
              key='table-form-wrapper'
            />
            <AgendaForm
              schedule={establishment.schedule}
              key='agenda-form-wrapper'
            />
          </Container>
        )
        : <div>Configurações vazias</div>
      }
    </MainWrapper>
  )
}