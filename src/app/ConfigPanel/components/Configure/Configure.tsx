import React from 'react'

import { useAppDispatch } from '../../../../hooks/hooks'
import { MainWrapper, UnitForm } from './styles'

type ConfigureParams = {
  establishment: boolean
}

export function Configure({ establishment }: ConfigureParams): JSX.Element {

  const dispatch = useAppDispatch()

  return (
    <MainWrapper>
      {establishment
        ? (
          <>
            <UnitForm>
              Ambientes
            </UnitForm>
            <UnitForm>
              Cardapio
            </UnitForm>
            <UnitForm>
              Mesas
            </UnitForm>
            <UnitForm>
              Agenda
            </UnitForm>
          </>
        )
        : <div>Configurações vazias</div>
      }
    </MainWrapper>
  )
}