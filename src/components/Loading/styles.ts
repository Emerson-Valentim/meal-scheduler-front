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

  z-index: 1000;
  background-color: gray;
  opacity: 85%;

  justify-content: center;
  align-items: center;

  height: 100vh;
  width: 100vw;
`