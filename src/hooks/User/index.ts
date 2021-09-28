import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { authRequest } from '../../api'

export type Credentials = {
  cnpj: string
  password: string
}

export enum LoginState {
  BAD_CREDENTIALS = 'badCredentials',
  LOGGED = 'logged',
  DEFAULT = 'default'
}

export interface UserState {
  credentials: Credentials
  logged: {
    value: boolean
    state: LoginState
  }
}

const initialState: UserState = {
  credentials: {
    cnpj: '',
    password: '',
  },
  logged: {
    value: false,
    state: LoginState.DEFAULT
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
  },
  extraReducers: (builder) =>
    builder
      .addCase(authenticate.pending, (state) => {
        state.logged = {
          value: false,
          state: LoginState.DEFAULT
        }
      })
      .addCase(authenticate.rejected, (state) => {
        state.logged = {
          value: false,
          state: LoginState.BAD_CREDENTIALS
        }
      })
      .addCase(authenticate.fulfilled, (state) => {
        state.logged = {
          value: true,
          state: LoginState.LOGGED
        }
      }),
})

export default user.reducer
