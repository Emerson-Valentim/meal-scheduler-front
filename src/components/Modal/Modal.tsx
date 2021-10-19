import React, { useState } from 'react'
import { updateModal } from '../../hooks/Common'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { MainModal } from './styles'

export function Modal(): JSX.Element {
  const dispatch = useAppDispatch()

  const { enabled, component, title } = useAppSelector((state) => state.common.modalState)

  return (
    <MainModal
      visible={enabled}
      key='main-modal'
      onCancel={() => dispatch(updateModal({
        component: undefined,
        enabled: false,
        title: 'Sem ação definida'
      }))}
      okButtonProps={{ display: 'none !important' }}
      closable={true}
      destroyOnClose
      title={title}
    >
      {component}
    </MainModal>
  )
}