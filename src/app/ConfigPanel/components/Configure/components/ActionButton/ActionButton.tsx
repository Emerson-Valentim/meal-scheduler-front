import { Button } from 'antd'
import React from 'react'
import { RiDeleteBin7Line, RiEditBoxLine } from 'react-icons/ri'

type ActionButtonParams = {
  onEdit: (params?: any) => void
  onDelete: (params?: any) => void
}

export function ActionButton({ onEdit, onDelete }: ActionButtonParams): JSX.Element {
  return (
    <div>
      <Button onClick={onEdit} icon={<RiEditBoxLine/>}/>
      <Button onClick={onDelete} icon={<RiDeleteBin7Line/>}/>
    </div>
  )
}