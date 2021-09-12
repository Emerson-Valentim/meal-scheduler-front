import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import authRequest, { HttpData } from '../../api'

export interface EstablishmentState {
  load: HttpData
}

const initialState: EstablishmentState = {
  load: {
    state: 'ok',
    data: []
  }
}

export const load = createAsyncThunk('establishment/load', async (id?: number) => {
  const { data: establishmentList } = await authRequest('GET', `establishment/load${ id ? `/${id}`: ''}`)
  return establishmentList
})

export const establishment = createSlice({
  name: 'establishment',
  initialState,
  reducers: {
  },
  extraReducers: (builder) =>
    builder
      .addCase(load.pending, (state) => {
        state.load = {
          data: [],
          state: 'loading'
        }
      })
      .addCase(load.rejected, (state) => {
        state.load = {
          data: [],
          state: 'error'
        }
      })
      .addCase(load.fulfilled, (state, action) => {
        state.load = {
          data: action.payload ? action.payload : [],
          state: action.payload ? 'ok' : 'notFound'
        }
      }),
})

export default establishment.reducer
