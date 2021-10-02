import React from 'react'

import { useAppSelector } from '../../hooks/hooks'
import { LoadingModal } from './styles'

import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';


export function Loading() {

  const { enabled } = useAppSelector((state) => state.common.loadingState)
  const antIcon = <LoadingOutlined style={{ fontSize: '200px', color: 'black' }} spin />;

  return (
    <LoadingModal enabled={enabled}>
      <Spin indicator={antIcon} />
    </LoadingModal>
  )
}