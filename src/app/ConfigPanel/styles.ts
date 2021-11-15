import styled from 'styled-components'
import { colors } from '../../styles/colors'

export const MainWrapper = styled.div`
  background-color: ${colors.primary};

  height: 100vh;
  width: 100vw;

  display: flex;

  flex-direction: row;

  justify-content: center;

  overflow-y: auto;

  @media(max-width: 800px) {
    flex-direction: column;
    min-height: 100vh;
  }
`