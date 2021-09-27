import React from 'react'
import { WestPlazaCard } from '../../components/ShoppingHolder/ShoppingHolder'
import { EstablishmentCard, EstablishmentList, MainWrapper } from './styles'

export function Establishment(): JSX.Element {

  const CardStyle = {
    hFontSize: '1.75vh',
    hFontColor: 'white',
    pFontSize: '2vh',
    pFontColor: 'white'
  }

  const establishments = [
    {
      name: 'Nome',
      description: 'description'
    },
    {
      name: 'Nome',
      description: 'description'
    },
    {
      name: 'Nome',
      description: 'description'
    },
    {
      name: 'Nome',
      description: 'description'
    },
    {
      name: 'Nome',
      description: 'description'
    },
    {
      name: 'Nome',
      description: 'description'
    },
    {
      name: 'Nome',
      description: 'description'
    },
    {
      name: 'Nome',
      description: 'description'
    },
  ]

  return (
    <MainWrapper>
      <WestPlazaCard card={CardStyle} />
      <h1>Confira os locais disponíveis</h1>
      <EstablishmentList>
        {establishments.map( ({ name, description }) => (
          <EstablishmentCard>
            <h1>{name}</h1>
            <img src="Intro2.png" alt={`${name}`}/>
          </EstablishmentCard>
        ))}
      </EstablishmentList>
    </MainWrapper>)
}