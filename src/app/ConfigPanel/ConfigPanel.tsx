import React, { useEffect, useState, useMemo } from 'react'
import { useAppSelector } from '../../hooks/hooks'
import { ConfigMode } from '../../hooks/User'
import { Configure } from './components/Configure/Configure'

import { Login } from './components/Login/Login'
import { Register } from './components/Register/Register'

import { MainWrapper } from './styles'

export type VisiblePanel = {
  enabled: boolean
}

export function ConfigPanel() {

  const screenMode = useAppSelector(state => state.user.config.mode)
  const { value: logged } = useAppSelector((state) => state.user.logged)

  const panelComponents = useMemo(() => (
    {
      [ConfigMode.LOGIN]: <Login />,
      [ConfigMode.REGISTER]: <Register />,
      [ConfigMode.INFO]: <div>Oi</div>
    }
  ), [])

  const [ currentComponent, setCurrentComponent ] = useState(panelComponents[logged ? ConfigMode.INFO : ConfigMode.LOGIN])


  useEffect(() => {
    setCurrentComponent(panelComponents[screenMode])
  }, [screenMode, panelComponents])

  return (
    <MainWrapper>
      {
        currentComponent
      }
      <Configure logged={logged} />
    </MainWrapper>
  )
}