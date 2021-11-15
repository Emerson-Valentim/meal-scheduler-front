import styled from 'styled-components'
import { colors } from '../../../../../../styles/colors'

export const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;

  border-radius: 1em;

  width: 96%;

  background-color: ${colors.primary};

  form {
    width: 100%;
  }

  .ant-form-item {
    display: flex;
    flex-direction: column;
    align-items: center;

    background-color: transparent;

    .ant-form-item-control {
      width: 97% !important;

      .ant-picker-range {
        width: 100%;

        input {
          text-align: center;
        }
      }
    }
  }

  @media(max-width: 800px) {
    min-height: 24%;
    width: 100%;
    .ant-form-item {
      .ant-form-item-control {
        width: 94% !important;
      }
    }
  }
`