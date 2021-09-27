import React , { useCallback } from 'react'
import { Button, Carousel } from 'antd';

import { useHistory } from 'react-router-dom'

import { MainWrapper, WelcomeCarousel } from './styles';
import { WestPlazaCard } from '../../../../components/ShoppingHolder/ShoppingHolder';
import { Card } from '../../../../components/ShoppingHolder/styles';

export function Introduction(): JSX.Element {

  const history = useHistory()

  const listInfoAboutEstablishment = useCallback(() => {
    history.push('/welcome')
  }, [])

  return (
    <WelcomeCarousel>
      <Carousel>
        <MainWrapper>
          <WestPlazaCard/>
        </MainWrapper>
        <MainWrapper>
          <Card>
            <img src="/Intro1.png" alt="Welcome" />
            <h1>Celebre!</h1>
            <p>Aproveite os melhores momentos da sua vida com pessoas que você ama</p>
          </Card>
        </MainWrapper>
        <MainWrapper>
          <Card>
            <img src="/Intro2.png" alt="Location" />
            <h1>Localização</h1>
            <p>Tudo em um lugar só, o Boulevard Gastronômico do Shopping West Plaza inteiro na palpa de suas mãos</p>
          </Card>
        </MainWrapper>
        <MainWrapper>
          <Card>
            <img src="/Intro3.png" alt="Enjoy" />
            <h1>Aproveite e avalie</h1>
            <p>Aprecie a melhor da nossa Boulevard Gastronômico e ao final da sua experiência, deixe sua avaliação</p>
          </Card>
        </MainWrapper>
        <MainWrapper>
          <Card>
            <WestPlazaCard button={
              <Button onClick={listInfoAboutEstablishment}>Acessar</Button>
            }/>
          </Card>
        </MainWrapper>
      </Carousel>
    </WelcomeCarousel>
  )
}
