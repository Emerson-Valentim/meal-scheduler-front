import { Carousel } from "antd"
import styled from "styled-components"

export const MainWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80%;

  padding: 1em;
`

export const WelcomeCarousel = styled.div`
  max-width: 100%;
  min-height: 100%;

  .ant-carousel {
    .slick-slider {
      ul {
        li {
          background: green;
        }

        .slick-active {
        }
      }
    }
  }
`