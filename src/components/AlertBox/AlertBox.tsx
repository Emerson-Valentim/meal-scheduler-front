import React, { useEffect } from 'react'

import { Alert } from 'antd'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { disableAlert, EnumAlert } from '../../hooks/Common'

export function AlertBox(): JSX.Element {

  const dispatch = useAppDispatch()

  const { type, message, enabled } = useAppSelector((state) => state.common.alertState)

  const closeAlert = () => {
    dispatch(disableAlert())
  }

  useEffect(() => {
    if (enabled && [EnumAlert.SUCCESS, EnumAlert.INFO].includes(type)) {
      const timeout = setTimeout(() => {
        closeAlert()
      }, 5000)

      return () => {
        clearTimeout(timeout)
      }
    }
  }, [enabled, type])

  return (
    <div>
      {enabled ? (<Alert
        message={message}
        type={type}
        closable
        showIcon
        style={ { zIndex: 3000, width: '100vw', position: 'absolute' }}
        onClose={closeAlert} />) : null}
    </div>)
}