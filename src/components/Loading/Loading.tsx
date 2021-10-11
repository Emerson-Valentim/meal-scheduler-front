import React, { useState, useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { LoadingModal, Reload } from './styles'

import { Button, Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { enableAlert, EnumAlert } from '../../hooks/Common'

export function Loading(): JSX.Element {

  const dispatch = useAppDispatch()

  const { enabled } = useAppSelector((state) => state.common.loadingState)
  const antIcon = <LoadingOutlined style={{ fontSize: '200px', color: 'black' }} spin />

  const [reload, allowReload] = useState(false)

  useEffect(() => {
    if (enabled) {
      const timeout = setTimeout(() => {
        allowReload(true)
        dispatch(enableAlert({
          enabled: true,
          message: 'Parece que tivemos um problema',
          type: EnumAlert.ERROR
        }))
      }, 10000)

      return () => {
        clearTimeout(timeout)
      }
    }
  }, [enabled])

  return (
    <LoadingModal enabled={enabled}>
      <Spin indicator={antIcon} />
      {reload
        ? (
          <Reload>
            <Button onClick={() => { window.location.reload() }}>Atualizar</Button>
          </Reload>
        )
        : null}
    </LoadingModal>
  )
}