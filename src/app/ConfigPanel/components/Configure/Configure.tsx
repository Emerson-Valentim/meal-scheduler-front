import React from 'react'

import { useAppDispatch } from '../../../../hooks/hooks'
import { MainWrapper } from './styles'

type ConfigureParams = {
  establishment: boolean
}

export function Configure({ establishment }: ConfigureParams) {

  const dispatch = useAppDispatch()

  return (
    <MainWrapper>
      {establishment
        ? <div>Configurações preenchidas</div>
        : <div>Configurações vazias</div>
      }
    </MainWrapper>
  )
}