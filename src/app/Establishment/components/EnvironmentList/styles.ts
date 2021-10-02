import { Card } from 'antd'
import styled from 'styled-components'

export const EnvironmentCard = styled(Card)`
  min-width: 47%;
  margin-bottom: 1vh;
`

export const EnvironmentCardBody = styled.div`
  display: flex;
  flex-direction: column;

  text-align: center;

  min-width: 100%;
  min-height: 40%;

  word-break: break-all;
  
  p {
    margin-bottom: 1px;

    text-align: left;

    :last-child {
      margin-bottom: 2vh;
    }
  }
`

export const EnvironmentCardRules = styled.div`
  svg {
    vertical-align: -0.125em;
    margin-right: 0.5vw;
  }
`