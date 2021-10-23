import styled from 'styled-components'

export const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;

  border-radius: 1em;

  width: 96%;

  background-color: pink;

  form {
    width: 100%;
  }

  @media(max-width: 800px) {
    min-height: 24%;
    width: 100%;
  }
`