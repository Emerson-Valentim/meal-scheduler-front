import { Button, Carousel } from 'antd';
import React from 'react'

import { MainWrapper, WelcomeCarousel } from './styles';

export function Introduction(): JSX.Element {

  return (
    <WelcomeCarousel>
      <Carousel>
        <MainWrapper>
          <p>Shopping</p>
          <p>West Plaza</p>
        </MainWrapper>
        <MainWrapper>
          <p>Celebre!</p>
          <p>Aproveite os melhores momentos da sua vida com pessoas que você ama</p>
        </MainWrapper>
        <MainWrapper>
          <p>Localização</p>
          <p>Tudo em um lugar só, o Boulevard Gastronômico do Shopping West Plaza inteiro na palpa de suas mãos</p>
        </MainWrapper>
        <MainWrapper>
          <p>Aproveite e avalie</p>
          <p>Aprecie a melhor da nossa Boulevard Gastronômico e ao final da sua experiência, deixe sua avaliação</p>
        </MainWrapper>
        <MainWrapper>
          <p>Shopping</p>
          <p>West Plaza</p>
          <Button>Acessar</Button>
        </MainWrapper>
      </Carousel>
    </WelcomeCarousel>
  )
}
