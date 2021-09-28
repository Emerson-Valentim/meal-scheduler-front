import { Card, Collapse, Modal } from "antd"
import styled from "styled-components"

export const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  
  align-items: center;
  
  background-color: #C8D4A1;
  
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

  img {
    margin-top: 2vh;
    width: 95%
  }
`

export const ModalWrapper = styled(Modal)`

  display: flex;
  flex-direction: column;
  top: 6vh !important;

  .ant-modal-close-x {
    color: black;
    
    :hover {
      transform: scale(1.1);
    }
  }

  .ant-modal-content {
    width: 100%;

    background: #C8D4A1;

    border:  1px solid gray;

    .ant-modal-header {
      border-color: black;
      background: transparent;
    }
    
    .ant-modal-body {
      display: flex;

      height: 70vh;
      overflow-y: auto;

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
        :hover {
          color: black;
          border-color: black;
        }
      }
    }
  }
`

export const CustomCollapse = styled(Collapse)`
  margin-bottom: 1vh;
  
  .ant-collapse-content-box {
    max-height: 40vh;
    overflow-y: auto;
  }
`

export const CollapseWrapper = styled.div`
  width: 100%;
`