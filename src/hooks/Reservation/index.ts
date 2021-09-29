import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { authRequest, request, HttpData } from '../../api'

export interface ReservationState {
  load: ReservationFilter
}

type ReservationFilter = {
  list?: HttpData<any[]>,
}

const initialState: ReservationState = {
  load: {
    list: {
      state: 'ok',
      data: []
    }
  }
}

export const loadReservations = createAsyncThunk('reservation/load', async (establishmentId: number): Promise<any[]> => {
  const { data: reservationList } = await request<any[]>('GET', 'reservation/load/')
  return reservationList.length ? reservationList : []
})

export const Reservation = createSlice({
  name: 'Reservation',
  initialState,
  reducers: {
  },
  extraReducers: (builder) =>
    builder
      .addCase(loadReservations.pending, (state) => {
        state.load = {
          ...state.load,
          list: {
            state: 'loading',
            data: []
          },
        }
      })
      .addCase(loadReservations.rejected, (state) => {
        state.load = {
          ...state.load,
          list: {
            state: 'error',
            data: []
          },
        }
      })
      .addCase(loadReservations.fulfilled, (state, { payload }) => {
        state.load = {
          ...state.load,
          list: {
            state: 'ok',
            data: payload ? payload : (initialState.load.list?.data || []),
          }
        }
      }),
})

export default Reservation.reducer
