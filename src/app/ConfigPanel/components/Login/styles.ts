import styled from 'styled-components'
import { Form } from 'antd'

export const MainWrapper = styled.div`
  padding: 1em;
  display: flex;

  justify-content: center;
  align-items: center;

  width: 30%;
  height: 100%;

  overflow-x: hidden;

  @media(max-width: 800px) {
    width: 100%;
  }
`

export const CustomLoginForm = styled(Form)`
  padding: 1em;

  display: flex;
  flex-direction: column;
  justify-content: center;

  width: 100%;
  height: 60%;

  background-color: gray;
  border-radius: 1em;
`

export const LoginFormItem = styled(Form.Item)`

.ant-form-item-control-input {
    
  }
`

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;

  button {
    width: 50%;
  }
`