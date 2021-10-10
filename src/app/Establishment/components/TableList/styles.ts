import { Card } from 'antd'
import styled from 'styled-components'

export const TableCard = styled(Card)`
  min-width: 95%;

  :hover {
    cursor: pointer;
  }

  box-shadow: ${props => props.selected ? '0 4px 8px 0 rgba(0,0,0,0.3)' : 'none'};
  
  transition: 0.5s;
`