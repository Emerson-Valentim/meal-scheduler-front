import React from 'react'
import { useAppSelector } from '../../../../hooks/hooks'

type ConfigureParams = {
  logged: boolean
}

export function Configure( { logged }: ConfigureParams) {
  return (
    <div>
      { logged ? 'Logado' : 'Não logado'}
    </div>
  )
}