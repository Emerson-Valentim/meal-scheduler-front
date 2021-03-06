import React , { useCallback } from 'react'
import { Button } from 'antd'

import { useHistory } from 'react-router-dom'

import { MainWrapper } from './styles'
import { WestPlazaCard } from '../../../../components/WestPlazaCard/WestPlazaCard'
import { Card } from '../../../../components/WestPlazaCard/styles'
import { CustomCarousel } from '../../../../components/CustomCarousel/CustomCarousel'
import { CarouselStyle } from '../../../../components/CustomCarousel/styles'

export function Introduction(): JSX.Element {

  const history = useHistory()

  const listInfoAboutEstablishment = useCallback(() => {
    history.push('/welcome')
  }, [])

  const carouselStyle: CarouselStyle = {
    height: '1vh',
    width: '4vh',
    'border-radius': '10px',
    'slicker-slider': {
      position: 'fixed',
      bottom: '7.5%'
    }
  }

  return (
    <CustomCarousel style={carouselStyle} items={
      [
        <MainWrapper key="wrapper-plaza">
          <WestPlazaCard/>
        </MainWrapper>,
        <MainWrapper key="first-wrapper">
          <Card key="first-card">
            <img src="/Intro1.png" alt="Welcome" />
            <h1>Celebre!</h1>
            <p>Aproveite os melhores momentos da sua vida com pessoas que você ama</p>
          </Card>
        </MainWrapper> ,
        <MainWrapper key="second-wrapper">
          <Card key="second-card">
            <img src="/Intro2.png" alt="Location" />
            <h1>Localização</h1>
            <p>Tudo em um lugar só, o Boulevard Gastronômico do Shopping West Plaza inteiro na palpa de suas mãos</p>
          </Card>
        </MainWrapper>,
        <MainWrapper key="third-wrapper">
          <Card key="third-card">
            <img src="/Intro3.png" alt="Enjoy" />
            <h1>Aproveite e avalie</h1>
            <p>Aprecie a melhor da nossa Boulevard Gastronômico e ao final da sua experiência, deixe sua avaliação</p>
          </Card>
        </MainWrapper>,
        <MainWrapper key="fourth-wrapper">
          <Card key="fourth-card">
            <WestPlazaCard button={
              <Button onClick={listInfoAboutEstablishment}>Acessar</Button>
            }/>
          </Card>
        </MainWrapper>
      ]
    }/>
  )
}
