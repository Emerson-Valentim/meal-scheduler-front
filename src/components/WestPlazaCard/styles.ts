import styled from "styled-components"

const welcomeButton = {
  background: 'black',
  color: 'white',
}

export interface ShoppingHolderDefinition {
  hFontSize?: string
  hFontColor?: string
  pFontSize?: string
  pFontColor?: string
}

export const Card = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;
  align-self: center;

  width: 80%;

  h1 {
    font-family: 'COCOGOOSE', sans-serif;
    font-size: ${({hFontSize}) => hFontSize || ''};
    color: ${({ hFontColor }) => hFontColor || 'black'}
  }

  p {
    font-family: 'Poppins', sans-serif;
    font-size: ${({pFontSize}) => pFontSize || '2vh' }};
    color: ${({ pFontColor }) => pFontColor || 'black'};
    width: 70vh;
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