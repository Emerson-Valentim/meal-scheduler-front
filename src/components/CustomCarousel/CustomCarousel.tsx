import React from 'react'
import { Carousel as AntCarousel } from 'antd'
import { CarouselStyle, StyledCarousel } from './style'

type CarouselDefinition = {
  items: JSX.Element[],
  style: CarouselStyle,
}

export function CustomCarousel({ items, style }: CarouselDefinition): JSX.Element {
  return (
    <StyledCarousel style={style}>
      <AntCarousel>
        {items.map(item => item)}
      </AntCarousel>
    </StyledCarousel>
  )
}