import styled from 'styled-components'

const buildStyle = (color, cursor) => ({
  'background-color': color,
  'cursor': cursor
})

export const AgendaCard = styled.div`
  min-height: 3vh;

  ${props => props.permission
    ? buildStyle('green', 'pointer')
    : buildStyle('gray', 'default')
  };
`