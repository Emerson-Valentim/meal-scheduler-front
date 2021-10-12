import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { authRequest, request, HttpData } from '../../api'

export enum EnvironmentLocation {
  indoor = 'Interno',
  outdoor = 'Externo',
}

type EnvironmentFilter = {
  filtered: HttpData<any>
}

export interface EnvironmentState {
  load: EnvironmentFilter
}

const initialState: EnvironmentState = {
  load: {
    filtered: {
      state: 'pending',
      data: undefined
    }
  }
}

export const loadEnvironment = createAsyncThunk('environment/load/id', async (id: number): Promise<any> => {
  const { data: environment } = await request<any[]>('GET', `environment/load/${id}`)
  return environment
})

export const createEnvironment = createAsyncThunk('environment/create', async (data: any): Promise<any> => {
  const { data: environment } = await authRequest<any[]>('POST', 'environment/create', { data })
  return environment
})

export const updateEnvironment = createAsyncThunk('environment/update/id', async ({ id, ...data}: any): Promise<any> => {
  const { data: environment } = await authRequest<any[]>('PUT', `environment/update/${id}`, { data })
  return environment
})

export const deleteEnvironment = createAsyncThunk('environment/delete/id', async (id: number): Promise<any> => {
  const { data: environment } = await authRequest<any[]>('DELETE', `environment/delete/${id}`)
  return environment
})

export const environment = createSlice({
  name: 'environment',
  initialState,
  reducers: {
  },
  extraReducers: (builder) =>
    builder
      .addCase(loadEnvironment.rejected, (state) => {
        state.load = {
          ...state.load,
          filtered: {
            state: 'pending',
            data: undefined
          }
        }
      })
      .addCase(loadEnvironment.fulfilled, (state, { payload }) => {
        state.load = {
          ...state.load,
          filtered: {
            state: 'ok',
            data: payload
          }
        }
      })
      .addCase(createEnvironment.fulfilled, (state, { payload }) => {
        state.load = {
          ...state.load,
          filtered: {
            state: 'ok',
            data: payload
          }
        }
      }),
})

export default environment.reducer
