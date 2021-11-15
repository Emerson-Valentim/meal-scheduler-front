import styled from 'styled-components'

export const AgendaCard = styled.div`
  min-height: 3vh;

  text-align: center;

  p, h4 {
    font-size: 1.1vh;
    margin: 0;
  }

  cursor: ${props => props.permission ? 'pointer' : 'default'}

`

export const InputCard = styled.div`
  width: 100%;
  margin-top: 2px;
  text-align: left;

  display: flex;
  justify-content: space-around;

  span {
    width: 49%;
    span {
      width: 2em;
    }
  }
`