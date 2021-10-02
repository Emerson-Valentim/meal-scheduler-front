import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { authRequest, request, HttpData } from '../../api'
import { ReservationDefinition } from '../../app/Establishment/components/Reservation/Reservation'

type ReservationParams = {
  establishment?: number
  environments: number[]
  table?: number
  interval: any
}

type ReservationFilter = {
  list: HttpData<any[]>,
}

type ReservationCreation = {
  params: ReservationParams
}

export interface ReservationState {
  load: ReservationFilter
  create: ReservationCreation
}

const initialState: ReservationState = {
  load: {
    list: {
      state: 'pending',
      data: []
    }
  },
  create: {
    params: {
      establishment: undefined,
      environments: [],
      table: undefined,
      interval: {
        start: '',
        end: ''
      }
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

export const reservation = createSlice({
  name: 'Reservation',
  initialState,
  reducers: {
    resetNewReservation: (state, { payload }: PayloadAction<any>) => {
      state.create.params = {
        establishment: payload,
        environments: [],
        table: undefined,
        interval: {
          start: '',
          end: ''
        }
      }
    },
    filterEnvironment: (state, { payload }: PayloadAction<any>) => {
      const currentEnvironments = state.create.params.environments
      const environmentIndex = currentEnvironments.indexOf(payload)

      environmentIndex > -1
        ? state.create.params.environments.splice(environmentIndex, 1)
        : state.create.params.environments.push(payload)
    },
    filterTable: (state, { payload }: PayloadAction<any>) => {
      const tableId = payload;
      state.create.params.table = tableId
    }
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

export const { filterEnvironment, filterTable, resetNewReservation } = reservation.actions

export default reservation.reducer
