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

export const loadEnvironment = createAsyncThunk('establishment/load/id', async (filterId: number): Promise<any> => {
  const { data: establishment } = await request<any[]>('GET', `establishment/load/${filterId}`)
  return establishment
})

export const createEnvironment = createAsyncThunk('establishment/create', async (data: any): Promise<any> => {
  const { data: establishment } = await authRequest<any[]>('POST', 'establishment/create', { data })
  return establishment
})

export const updateEnvironment = createAsyncThunk('establishment/update/id', async ({ id, ...data}: any): Promise<any> => {
  const { data: establishment } = await authRequest<any[]>('PUT', `establishment/update/${id}`, { data })
  return establishment
})

export const establishment = createSlice({
  name: 'establishment',
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

export default establishment.reducer
