import React, { useEffect, useState, useMemo } from 'react'
import { updateLoading } from '../../hooks/Common'
import { loadEstablishment } from '../../hooks/Establishment'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { ConfigMode } from '../../hooks/User'
import { Configure } from './components/Configure/Configure'
import { Info } from './components/Info/Info'

import { Login } from './components/Login/Login'
import { Register } from './components/Register/Register'

import { MainWrapper } from './styles'

export type VisiblePanel = {
  enabled: boolean
}

export function ConfigPanel() {

  const dispatch = useAppDispatch()

  const screenMode = useAppSelector((state) => state.user.config.mode)
  const { value: logged } = useAppSelector((state) => state.user.logged)
  const { data: userInfo } = useAppSelector((state) => state.user.info)
  const { data: establishment } = useAppSelector((state) => state.establishment.load.filtered)

  const panelComponents = useMemo(() => (
    {
      [ConfigMode.LOGIN]: <Login />,
      [ConfigMode.REGISTER]: <Register />,
      [ConfigMode.INFO]: <Info establishment={establishment}/>
    }
  ), [establishment])

  const [currentComponent, setCurrentComponent] = useState(panelComponents[screenMode])

  useEffect(() => {
    if(logged && userInfo.establishment) {
      (async () => {
        dispatch(updateLoading(true))
        await dispatch(loadEstablishment(userInfo.establishment.id))
        dispatch(updateLoading(false))
      })()
    }
  }, [dispatch, logged, userInfo])

  useEffect(() => {
    setCurrentComponent(panelComponents[screenMode])
  }, [screenMode, panelComponents])

  return (
    <MainWrapper>
      {
        currentComponent
      }
      {
        logged
          ? <Configure establishment={establishment} />
          : <div>Bem vindo!</div>
      }
    </MainWrapper>
  )
}