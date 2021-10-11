import styled from 'styled-components'

import { colors } from '../../../../styles/colors'
import { Form } from 'antd'

export const MainWrapper = styled.div`
  background-color: ${colors.secondary};

  padding: 1em;
  width: 70%;


  @media(max-width: 800px) {
    width: 100%;
  }
`

export const UnitForm = styled(Form)`
`