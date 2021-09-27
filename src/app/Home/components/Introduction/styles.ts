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

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 80%;

  h1 {
    font-family: 'COCOGOOSE', sans-serif;
    font-size: ${({hFontSize}) => hFontSize || ''};
  }

  p {
    font-family: 'Poppins', sans-serif;
    font-size: ${({pFontSize}) => pFontSize || '2vh' }};
    color: ${({ color }) => color || 'black'}
  }

  img {
    max-width: fit-content;
    align-self: center;
    margin-bottom: 3vh;
  }
  
`
