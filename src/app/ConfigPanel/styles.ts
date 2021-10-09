import styled from 'styled-components'
import { colors } from '../../styles/colors'

export const MainWrapper = styled.div`
  background-color: ${colors.primary};

  height: 100vh;
  width: 100vw;

  display: flex;

  flex-direction: row;

  @media(max-width: 800px) {
    flex-direction: column;
  }
`