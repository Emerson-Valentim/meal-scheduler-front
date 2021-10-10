import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { authRequest, request, HttpData } from '../../api'

export interface EstablishmentState {
  load: EstablishmentFilter
}

type EstablishmentFilter = {
  list: HttpData<any[]>,
  filtered: HttpData<any>
}

const initialState: EstablishmentState = {
  load: {
    list: {
      state: 'pending',
      data: []
    },
    filtered: {
      state: 'pending',
      data: undefined
    }
  }
}

export const loadEstablishments = createAsyncThunk('establishment/load', async (): Promise<any[]> => {
  const { data: establishmentList } = await request<any[]>('GET', 'establishment/load')
  return establishmentList.length ? establishmentList : []
})

export const loadEstablishment = createAsyncThunk('establishment/load/id', async (filterId: number): Promise<any> => {
  const { data: establishment } = await request<any[]>('GET', `establishment/load/${filterId}`)
  return establishment
})

export const createEstablishment = createAsyncThunk('establishment/create', async (data: any): Promise<any> => {
  const { data: establishment } = await authRequest<any[]>('POST', `establishment/create`, { data })
  return establishment
})

export const updateEstablishment = createAsyncThunk('establishment/update/id', async ({ id, ...data}: any): Promise<any> => {
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
      .addCase(loadEstablishments.pending, (state) => {
        state.load = {
          ...state.load,
          list: {
            state: 'pending',
            data: []
          },
        }
      })
      .addCase(loadEstablishments.rejected, (state) => {
        state.load = {
          ...state.load,
          list: {
            state: 'error',
            data: []
          },
        }
      })
      .addCase(loadEstablishments.fulfilled, (state, { payload }) => {
        state.load = {
          ...state.load,
          list: {
            state: 'ok',
            data: payload ? payload : (initialState.load.list?.data || []),
          }
        }
      })
      .addCase(loadEstablishment.rejected, (state) => {
        state.load = {
          ...state.load,
          filtered: {
            state: 'pending',
            data: undefined
          }
        }
      })
      .addCase(loadEstablishment.fulfilled, (state, { payload }) => {
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
