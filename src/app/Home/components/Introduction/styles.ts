import styled from "styled-components"

const commonSize = {
  height: '1vh',
  width: '4vh',
  'border-radius': '10px'
}

const welcomeButton = {
  background: 'black',
  color: 'white',
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

  align-items: center;

  width: 80%;

  h1 {
    font-family: 'COCOGOOSE', sans-serif;
    font-size: ${({hFontSize}) => hFontSize || ''};
  }

  p {
    font-family: 'Poppins', sans-serif;
    font-size: ${({pFontSize}) => pFontSize || '2vh' }};
    color: ${({ color }) => color || 'black'};
  }

  img {
    max-width: fit-content;
    height: 40vh;
    align-self: center;
    padding-bottom: 3vh;
  }

  button {
    ${welcomeButton}
    
    border: none;
    border-radius: 1vh;
    
    width: 40%;

    :hover {
      ${welcomeButton}

      transform: scale(1.05);

      background-color: #1E1F1E;
    }

    :focus {
      ${welcomeButton}
    }
  }
`