import styled from 'styled-components'
import { Form, Radio } from 'antd'

export const MainWrapper = styled.div`
  padding: 1em;
  display: flex;

  flex-direction: column;

  justify-content: space-evenly;
  align-items: center;

  width: 30%;
  min-height: 100vh;

  overflow-x: hidden;


  @media(max-width: 800px) {
    border-right: none;
    width: 100%;
  }
`

export const EstablishmentForm = styled(Form)`
  padding: 1em;

  display: flex;
  flex-direction: column;
  justify-content: center;

  width: 100%;
  height: 60vh;

  background-color: gray;
  border-radius: 1em;
  place-content: center;
`

export const EstablishmentFormItem = styled(Form.Item)`
  place-content: center;
  width: 100%;
`

export const RadioWrapper = styled(Radio.Group)`
  width: 100%;
  display: flex;
  
  .ant-space-item {
    margin-left: 3px;
  }
`

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-around;

  width: 100%;

  button {
    margin-left: .4em;
    margin-right: .4em;
    width: 50%;
  }
`