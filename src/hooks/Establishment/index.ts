import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { authRequest, request, HttpData } from '../../api'

export interface EstablishmentState {
  load: EstablishmentFilter
}

type EstablishmentFilter = {
  list?: HttpData<any[]>,
  filtered?: HttpData<any>
}

const initialState: EstablishmentState = {
  load: {
    list: {
      state: 'ok',
      data: []
    },
    filtered: {
      state: 'ok',
      data: []
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
            state: 'loading',
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
      .addCase(loadEstablishment.pending, (state) => {
        state.load = {
          ...state.load,
          filtered: {
            state: 'loading',
            data: undefined
          }
        }
      })
      .addCase(loadEstablishment.rejected, (state) => {
        state.load = {
          ...state.load,
          filtered: {
            state: 'loading',
            data: undefined
          }
        }
      })
      .addCase(loadEstablishment.fulfilled, (state, { payload }) => {
        state.load = {
          ...state.load,
          filtered: {
            state: 'loading',
            data: payload
          }
        }
      }),
})

export default establishment.reducer
