import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { request, authRequest, HttpData } from '../../api'

export type Credentials = {
  cnpj: string
  password: string
}

export type CreateUser = {
  phone: string
}

export enum LoginState {
  BAD_CREDENTIALS = 'badCredentials',
  LOGGED = 'logged',
  DEFAULT = 'default'
}


export enum RegisterState {
  ERROR = 'error',
  SUCCESS = 'success',
  DEFAULT = 'default'
}

export enum ConfigMode {
  LOGIN = 'login',
  REGISTER = 'register',
  INFO = 'info'
}

export interface UserState {
  credentials: Credentials
  logged: {
    value: boolean
    state: LoginState
  }
  config: {
    mode: ConfigMode
  }
  create: {
    params: Credentials & CreateUser
    result?: {
      data: any
      state: RegisterState
    }
  },
  info: HttpData<any>
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
  config: {
    mode: ConfigMode.LOGIN
  },
  create: {
    params: {
      cnpj: '',
      password: '',
      phone: ''
    },
    result: {
      data: undefined,
      state: RegisterState.DEFAULT
    }
  },
  info: {
    data: undefined,
    state: 'pending'
  }
}

const saveCredentials = (credentials?: Credentials) => window.localStorage.setItem('credentials', credentials ? JSON.stringify(credentials) : '')

export const authenticate = createAsyncThunk('user/load', async (credentials?: Credentials) => {
  credentials && saveCredentials(credentials)
  const { data: userInfo } = await authRequest('GET', 'user/load')
  return userInfo
})

export const createUser = createAsyncThunk('user/create', async (info: Credentials & CreateUser) => {
  const { data: userInfo } = await request('POST', 'user/create', { data: info })
  return userInfo
})

export const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateConfigMode: (state, action: PayloadAction<ConfigMode>) => {
      state.config.mode = action.payload
    }
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
      .addCase(authenticate.fulfilled, (state, { payload }) => {
        state.logged = {
          value: true,
          state: LoginState.LOGGED
        }
        state.info = {
          data: payload,
          state: 'ok'
        }
      })
      .addCase(createUser.pending, (state) => {
        state.create.result = {
          data: undefined,
          state: RegisterState.DEFAULT
        }
      })
      .addCase(createUser.rejected, (state) => {
        state.create.result = {
          data: undefined,
          state: RegisterState.ERROR
        }
      })
      .addCase(createUser.fulfilled, (state, { payload }) => {
        state.create.result = {
          data: payload,
          state: RegisterState.SUCCESS
        }
      })
})

export const { updateConfigMode } = user.actions

export default user.reducer
