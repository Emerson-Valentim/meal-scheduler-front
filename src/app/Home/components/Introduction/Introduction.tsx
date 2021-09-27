import React from 'react'
import { Button, Carousel } from 'antd';

import { Card, MainWrapper, WelcomeCarousel } from './styles';

export function Introduction(): JSX.Element {

  return (
    <WelcomeCarousel>
      <Carousel>
        <MainWrapper>
          <Card color="white" pFontSize="4vh">
            <h1>Shopping</h1>
            <p>West Plaza</p>
          </Card>
        </MainWrapper>
        <MainWrapper>
          <Card>
            <img src="/Intro2.png" alt="Welcome"/>
            <h1>Celebre!</h1>
            <p>Aproveite os melhores momentos da sua vida com pessoas que você ama</p>
          </Card>
        </MainWrapper>
        <MainWrapper>
          <Card>
            <img src="/Intro2.png" alt="Location"/>
            <h1>Localização</h1>
            <p>Tudo em um lugar só, o Boulevard Gastronômico do Shopping West Plaza inteiro na palpa de suas mãos</p>
          </Card>
        </MainWrapper>
        <MainWrapper>
          <Card>
            <img src="/Intro3.png" alt="Enjoy"/>
            <h1>Aproveite e avalie</h1>
            <p>Aprecie a melhor da nossa Boulevard Gastronômico e ao final da sua experiência, deixe sua avaliação</p>
          </Card>
        </MainWrapper>
        <MainWrapper>
          <Card>
            <h1>Shopping</h1>
            <p>West Plaza</p>
            <Button>Acessar</Button>
          </Card>
        </MainWrapper>
      </Carousel>
    </WelcomeCarousel>
  )
}
