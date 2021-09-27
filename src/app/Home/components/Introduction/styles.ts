import styled from "styled-components"

const commonSize = {
  height: '1vh',
  width: '4vh',
  'border-radius': '10px'
}

export const WelcomeCarousel = styled.div`
  .ant-carousel {
    .slick-slider {
      ul {
        li {            
          background: white;

          ${commonSize}

          button {
            background: gray;

            ${commonSize}
          }
        }
      }
    }
    .slick-list {
      .slick-slide {
        div {
          div {
            display: flex !important;
          }
        }
      }
    }
  }
`
export const MainWrapper = styled.div`
  display: flex;

  justify-content: center;
  align-items: center;

  background-color: green;

  height: 100vh;
`