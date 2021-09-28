import React, { useCallback } from 'react'

import { Card } from 'antd';

import { WestPlazaCard } from '../../components/ShoppingHolder/ShoppingHolder'
import { EstablishmentCard, EstablishmentList, MainWrapper } from './styles'

const { Meta } = Card

export function Establishment(): JSX.Element {

  const CardStyle = {
    hFontSize: '1.75vh',
    hFontColor: 'white',
    pFontSize: '2vh',
    pFontColor: 'white'
  }

  const openEstablishmentModal = useCallback(({ id }) => {
    alert(`Voce clicou no estabelecimento ${id}`)
  }, [])

  const establishments = [
    {
      id: 1,
      name: 'Nome',
      description: 'description'
    },
    {
      id: 2,
      name: 'Nome',
      description: 'description'
    }
  ]

  return (
    <MainWrapper>
      <WestPlazaCard card={CardStyle} />
      <h1>Confira os locais disponíveis</h1>
      <EstablishmentList>
        {establishments.map(({ name, description, id }) => (
          <EstablishmentCard
            hoverable
            cover={<img src="Intro2.png" alt={`${name}`} />}
            onClick={() => openEstablishmentModal({ id })}
          >
            <Meta title={name} description={description} />
          </EstablishmentCard>
        ))}
      </EstablishmentList>
    </MainWrapper>)
}