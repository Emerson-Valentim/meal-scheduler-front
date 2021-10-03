import React from 'react'
import { AgendaCard } from './styles'

export function ReservationForm({ item }) {

  const handleClick = () => {
    if(item.classes === 'currentUser') {
      console.log('enable delete')
    }
  }
  
  return (
    <AgendaCard 
    permission={item.classes === 'currentUser'}
    onClick={handleClick}
    >
      {item.name}
    </AgendaCard>
  )
}