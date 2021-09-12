import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import authRequest from '../../api'

export type Credentials = {
  cnpj: string
  password: string
}

export enum LoginReasonError {
  BAD_CREDENTIALS = 'badCredentials',
  LOGGED = 'logged',
  DEFAULT = 'default'
}

export interface UserState {
  credentials: Credentials
  logged: {
    value: boolean
    reason: LoginReasonError
  }
}

const initialState: UserState = {
  credentials: {
    cnpj: '',
    password: '',
  },
  logged: {
    value: false,
    reason: LoginReasonError.DEFAULT
  },
}

const saveCredentials = (credentials?: Credentials) => window.localStorage.setItem('credentials', credentials ? JSON.stringify(credentials) : '')

export const authenticate = createAsyncThunk('user/load', async (credentials: Credentials) => {
  saveCredentials(credentials)
  const { data: userInfo } = await authRequest('GET', 'user/load')
  return userInfo
})

export const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<Credentials>) => {
      state.credentials = action.payload
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(authenticate.pending, (state) => {
        state.logged = {
          value: false,
          reason: LoginReasonError.DEFAULT
        }
      })
      .addCase(authenticate.rejected, (state) => {
        state.logged = {
          value: false,
          reason: LoginReasonError.BAD_CREDENTIALS
        }
      })
      .addCase(authenticate.fulfilled, (state) => {
        state.logged = {
          value: true,
          reason: LoginReasonError.LOGGED
        }
      }),
})

export const { login } = user.actions

export default user.reducer
