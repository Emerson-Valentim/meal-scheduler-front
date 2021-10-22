import React from 'react'

import { AgendaTable } from './components/AgendaTable/AgendaTable'
import { EnvironmentTable } from './components/EnvironmentTable/EnvironmentTable'
import { MenuTable } from './components/MenuTable/MenuTable'
import { TableForm } from './components/TableEnv/TableEnv'
import { Container, MainWrapper } from './styles'

type ConfigureParams = {
  establishment: any
}

export type EditDeleteParams = {
  id: number
}

export function Configure({ establishment }: ConfigureParams): JSX.Element {

  return (
    <MainWrapper>
      {establishment
        ? (
          <Container>
            <EnvironmentTable
              environments={establishment.environments}
              key='environment-form-wrapper'
            />
            <MenuTable
              menu_items={establishment.menu_items}
              key='menu-form-wrapper'
            />
            <TableForm
              tables={establishment.environments.flatMap(environment => environment.tables)}
              key='table-form-wrapper'
            />
            <AgendaTable
              schedule={establishment.schedule}
              key='agenda-form-wrapper'
            />
          </Container>
        )
        /**
          * @todo Implement this screen.
          */
        : <div>Configurações vazias</div>
      }
    </MainWrapper>
  )
}