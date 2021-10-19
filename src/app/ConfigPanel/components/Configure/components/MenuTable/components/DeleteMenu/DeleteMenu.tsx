import React from 'react'

import { Button } from 'antd'
import { deleteMenu } from '../../../../../../../../hooks/Menu'
import { updateLoading, updateModal } from '../../../../../../../../hooks/Common'
import { useAppDispatch, useAppSelector } from '../../../../../../../../hooks/hooks'
import { EditDeleteParams } from '../../../../Configure'
import { loadEstablishment } from '../../../../../../../../hooks/Establishment'

export function DeleteMenu({ id }: EditDeleteParams): JSX.Element {

  const dispatch = useAppDispatch()

  const establishment_id = useAppSelector((state) => state.establishment.load.filtered.data.id)

  const confirmDelete = async () => {
    dispatch(updateLoading(true))
    await dispatch(deleteMenu(id))
    dispatch(updateModal({
      enabled: false,
      component: undefined,
      title: ''
    }))
    await dispatch(loadEstablishment(establishment_id))
    dispatch(updateLoading(false))
  }

  return (
    <>
      <p>Realmente deseja deletar o cardápio de ID {id}?</p>
      <Button type="primary" onClick={confirmDelete}>Confirmar</Button>
    </>
  )
}