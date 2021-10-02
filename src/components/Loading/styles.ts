import styled from 'styled-components'

export const LoadingModal = styled.div`

  display: ${(props) => props.enabled ? 'flex' : 'none'};

  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;

  overflow: auto;
  outline: 0;

  z-index: 2000;
  background-color: gray;
  opacity: 85%;

  justify-content: center;
  align-items: center;

  height: 100vh;
  width: 100vw;
`
export const Reload = styled.div`
  position: fixed;

  width: 44vw;

  background-color: transparent;

  bottom: 1.5vh;
  left: 0;

  button {
    color: black !important;

    border: none;
    width: 100%;
    border-radius: 0 1vw 1vh 0;
    background-color: white;

    :active {
      background-color: #FFFFFF;
    }
  }
`