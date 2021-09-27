import styled from "styled-components"

export const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  
  align-items: center;
  
  background-color: green;
  
  height: 100vh;
  min-width: 100%;

  h1 {
    max-width: 60%;
    font-family: 'COCOGOOSE', sans-serif;
    font-size: ${({hFontSize}) => hFontSize || ''};
  }
`

export const EstablishmentList = styled.div`
  display: flex;

  flex-direction: row;
  flex-wrap: wrap;

  align-content: flex-start;
  justify-content: space-around;

  overflow-y: scroll;

  background-color: gray;

  height: 70vh;
  min-width: 100%;
  padding: 1vh;

`

export const EstablishmentCard = styled.div`
  width: 45%;
  height: 35%;

  border-radius: 3vh;
  
  margin: 1vh;

  background-color: white;

  h1 {
    text-align: center;
    max-width: 100%;

    font-size: 3vh;
  }

  img {
    max-width: 65%;
    max-height: 65%;
  }

`