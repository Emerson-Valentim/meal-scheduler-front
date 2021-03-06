import styled from 'styled-components'
import { Card, Modal, Menu } from 'antd'
import { colors } from '../../styles/colors'

export const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  
  align-items: center;
  
  background-color: ${colors.primary};
  
  height: 100vh;
  
  overflow: hidden;

  h1 {
    max-width: 70%;
    font-family: 'COCOGOOSE', sans-serif;
    font-size: ${({ hFontSize }) => hFontSize || ''};
  }
`

export const EstablishmentList = styled.div`
  display: flex;

  flex-direction: row;
  flex-wrap: wrap;

  justify-content: space-evenly;

  overflow-y: auto;

  background-color: gray;

  height: 80vh;
  min-width: 100%;
  padding: 1vh;

`

export const EstablishmentCard = styled(Card)`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;

  width: 40vh;
  height: 50vh;

  border-radius: 3vh;
  
  margin: 1vh;

  background-color: white;

  h1 {
    text-align: center;
    max-width: 100%;

    font-size: 3vh;
  }

  .ant-card-cover {
    margin-top: 2vh;
    max-width: 95%;
    max-height: 80%;
  }
   
  img {
    height: 100%;
    width: 100%;
  }
`

const modalBodyMargin = '1px'

export const ModalWrapper = styled(Modal)`

  display: flex;
  flex-direction: column;
  top: 6vh !important;
  width: 50% !important;

  .ant-modal-close-x {
    color: black;
    
    :hover {
      transform: scale(1.1);
    }
  }

  .ant-modal-content {
    width: 100%;

    background: ${colors.primary};

    border:  ${modalBodyMargin} solid gray;

    .ant-modal-header {
      border-color: black;
      background: transparent;
    }
    
    .ant-modal-body {
      display: flex;

      height: 70vh;
      overflow-y: hidden;

      align-items: center;
      flex-direction: column;
    }

    .ant-modal-footer {
      border-color: black;

      button {
        width: 30%;
      }
      
      .ant-btn-primary {
          color: white !important;
          background: black;
          border-color: black;

          :hover {
            border: 1px solid white !important;
          }
      }

      .ant-btn {
        :hover, :focus {
          color: black;
          border-color: black;
        }
      }
    }
  }

  @media(max-width: 800px) {
    width: 95% !important;
  }
`

export const CustomViewBody = styled.div`
  padding: 3vh 0 1vh 0;
  background-color: white;

  width: 100%;
  
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  gap: 1vh;
  
  overflow-y: auto;
`

export const CustomMenu = styled(Menu)`
  width: 100%;

  display: flex;

  flex-direction: row;

  justify-content: space-evenly;
  
  border-bottom: 1px solid black;
`

export const CustomMenuItem = styled(Menu.Item)`

  .ant-menu-item-icon {
    vertical-align: -0.125em;
  }

`