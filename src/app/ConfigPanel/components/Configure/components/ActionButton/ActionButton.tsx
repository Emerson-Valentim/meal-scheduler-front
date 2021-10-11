import React from 'react'

import { Button } from 'antd'
import { RiDeleteBin7Line, RiEditBoxLine } from 'react-icons/ri'
import { ButtonWrapper } from './styles'

type ActionButtonParams = {
  onEdit: (params?: any) => void
  onDelete: (params?: any) => void
}

export function ActionButton({ onEdit, onDelete }: ActionButtonParams): JSX.Element {
  return (
    <ButtonWrapper>
      <Button onClick={onEdit} icon={<RiEditBoxLine/>}/>
      <Button onClick={onDelete} icon={<RiDeleteBin7Line/>}/>
    </ButtonWrapper>
  )
}