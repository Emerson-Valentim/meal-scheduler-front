import styled from 'styled-components'

export interface CarouselStyle {
  height: string
  width: string
  'border-radius'?: string
  'slicker-slider'?: {
    position: string;
    bottom: string;
  }
}

export const StyledCarousel = styled.div`

  width: 100% !important;

  .ant-carousel {
    .slick-slider {
      ul {

        ${props => props.style['slicker-slider']}

        li {            
          background: white;

          ${props => props.style}

          button {
            background: gray;

            ${props => props.style}
          }
        }
      }
    }
    .slick-list {
      .slick-slide {
        div {
          div {
            display: flex !important;
            margin-bottom: 5vh;
          }
        }
      }
    }
  }
`