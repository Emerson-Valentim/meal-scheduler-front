import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export enum EnumAlert {
  SUCCESS = 'success',
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error'
}
export interface AlertState {
  message: string
  type: EnumAlert
  enabled: boolean
}

export interface LoadingState {
  enabled: boolean
}

export interface CommonState {
  alertState: AlertState
  loadingState: LoadingState
}

const initialState: CommonState = {
  alertState: {
    message: 'Bem vindo, agora você já pode utilizar as funcionalidades!',
    type: EnumAlert.INFO,
    enabled: false
  },
  loadingState: {
    enabled: false
  }
}

export const common = createSlice({
  name: 'alertBox',
  initialState,
  reducers: {
    enableAlert: (state, action: PayloadAction<AlertState>) => {
      state.alertState = action.payload
    },
    disableAlert: (state): void => {
      state.alertState = {
        ...state.alertState,
        enabled: false
      }
    },
    updateLoading: (state, action: PayloadAction<boolean>) => {
      state.loadingState.enabled = action.payload
    },
  }
})

export const { enableAlert, disableAlert, updateLoading } = common.actions

export default common.reducer