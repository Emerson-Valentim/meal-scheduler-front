import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { authRequest, request, HttpData } from '../../api'
import { ReservationDefinition } from '../../app/Establishment/components/Reservation/Reservation'

export interface ReservationState {
  load: ReservationFilter
}

type ReservationFilter = {
  list?: HttpData<any[]>,
}

const initialState: ReservationState = {
  load: {
    list: {
      state: 'pending',
      data: []
    }
  }
}

export const loadReservations = createAsyncThunk('reservation/safeLoad', async (params: Omit<ReservationDefinition, 'schedule'>): Promise<any[]> => {
  const { data: reservationList } = await request<any[]>('GET', 'reservation/safeLoad', { params })
  return reservationList.length ? reservationList : []
})

export const createReservation = createAsyncThunk('reservation/create', async (data: any): Promise<any> => {
  const { data: newReservation } = await request<any>('POST', 'reservation/create', { data })
  return newReservation
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
            state: 'pending',
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
      })
      .addCase(createReservation.pending, (state) => {
        
      })
      .addCase(createReservation.rejected, (state) => {
        
      })
      .addCase(createReservation.fulfilled, (state) => {
        
      }),
})

export default Reservation.reducer
