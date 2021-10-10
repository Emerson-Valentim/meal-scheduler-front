import React from 'react'

import { Card, ShoppingHolderDefinition } from './styles'

type WestPlazaCardProps = {
  button?: JSX.Element | undefined
  card?: ShoppingHolderDefinition
}

export function WestPlazaCard(params?: WestPlazaCardProps) {
  return (
    <Card {...params?.card}>
      <h1>Shopping</h1>
      <p>West Plaza</p>
      {params?.button}
    </Card>
  )
}