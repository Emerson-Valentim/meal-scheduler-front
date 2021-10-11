import styled from 'styled-components'

import { colors } from '../../../../styles/colors'
import { Form, Radio, Table } from 'antd'

export const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: ${colors.secondary};

  width: 70%;
  min-height: 100vh;

  overflow-y: auto;

  @media(max-width: 800px) {
    width: 100%;
    overflow-y: hidden;
  }
`

export const UnitForm = styled(Form)`
  width: 96%;
  
  background-color: pink;
  
  border-radius: 1em;
  
  margin: 1em;

  @media(max-width: 800px) {
    margin: unset;
    min-height: 24%;
    width: 100%;
  }
`

export const UnitTable = styled(Table)`
  padding: 1em;

  .ant-table-cell {
    text-align: center !important;
  }
`

export const UnitRadioGroup = styled(Radio.Group)`
`