import styled from 'styled-components'
import { ReactAgenda } from 'react-agenda'

export const MainWrapper = styled.div`
  width: 100%;
  
  background-color: white;
  padding: 2vw;

  overflow-y: auto;

  .agenda__table {
    overflow-y: hidden !important;
    height: 100%;

    .dragDiv {
      width: 100%;
      cursor: default;
    }

    .currentUser, .otherUser, .canceled {
      border: none
    }
  }
`

export const AgendaDescription = styled.div`
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  margin-bottom: 2vw;
  
  h4 {
    font-weight: 600;
  }
`

export const WorkingDayDescription = styled.div`
  border-top: 1px black solid;

  padding: 0.250em;
  
  p {
    margin-bottom: 0 !important;
  }

`

const buildEffect = (visibility, opacity) => ({
  visibility,
  opacity
})

export const DateTimePicker = styled.div`
  width: 100%;

  ${props => props.visible
    ? buildEffect('visible', '100')
    : buildEffect('hidden', '0')
}
  
  transition: visibility 1s, opacity 0.5s linear;
  
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;

  div {
    width: 49%;

    .ant-picker-input {
      width: 100%;
    }
  }

  h4 {
    text-align: center;
    width: 100%;
  }
`

export const CustomAgenda = styled(ReactAgenda)`
  max-height: 100%;
`