import styled from 'styled-components'

import { colors } from '../../../../styles/colors'
import { Form, Radio, Table } from 'antd'

export const MainWrapper = styled.div`
  width: 70%;
  background-color: ${colors.secondary};

  overflow-y: auto;

  @media(max-width: 800px) {
    overflow-y: unset;
    width: 100%;
  }
`

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 0.3em;

  width: 100%;

  &:first-child {
    margin-top: 1em;
  }
`

export const UnitForm = styled(Form)`
  width: 96%;
  
  background-color: pink;
  
  border-radius: 1em;
  
  margin-bottom: 1em;

  @media(max-width: 800px) {
    min-height: 24%;
    width: 100%;
  }
`

export const UnitTable = styled(Table)`
  padding: 1em;
  margin-bottom: 1em;

  border-radius: 1em;

  background-color: pink;

  .ant-table-cell {
    text-align: center !important;
  }
`

export const UnitRadioGroup = styled(Radio.Group)`
`