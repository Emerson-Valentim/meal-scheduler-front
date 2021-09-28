import React from 'react'

import { CustomCarousel } from '../../components/CustomCarousel/CustomCarousel'
import { WestPlazaCard } from '../../components/ShoppingHolder/ShoppingHolder'
import { EstablishmentCard, EstablishmentList, MainWrapper } from './styles'

export function Establishment(): JSX.Element {

  const CardStyle = {
    hFontSize: '1.75vh',
    hFontColor: 'white',
    pFontSize: '2vh',
    pFontColor: 'white'
  }

  const commonSize = {
    height: '100%',
    width: '100%',
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
            <CustomCarousel items={[
              <div>
                <h1>{name}</h1>
                <img src="Intro2.png" alt={`${name}`}/>
              </div>
            ]} style={commonSize}/>
          </EstablishmentCard>
        ))}
      </EstablishmentList>
    </MainWrapper>)
}