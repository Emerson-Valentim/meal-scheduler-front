import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { authRequest, request, HttpData } from '../../api'
import { ReservationDefinition } from '../../app/Establishment/components/Agenda/Agenda'
import { RootState } from '../store'

export enum ReservationStatus {
  SCHEDULED = 'scheduled',
  CANCELED = 'canceled',
  FINISHED = 'finished'
}

type ReservationParams = {
  establishment?: number
  environments: number[]
  table?: number
  interval: any
  cpf: string
  phone: string
}

type ReservationFilter = {
  list: HttpData<any[]>,
}

type ReservationCreation = {
  params: ReservationParams
}

type ReservationDelete = {
  id: number | undefined
}
export interface ReservationState {
  load: ReservationFilter
  privateLoad: ReservationFilter
  create: ReservationCreation
  delete: ReservationDelete
}

const initialState: ReservationState = {
  load: {
    list: {
      state: 'pending',
      data: []
    }
  },
  privateLoad: {
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
      },
      cpf: '',
      phone: ''
    }
  },
  delete: {
    id: undefined
  }
}

export const loadReservations = createAsyncThunk('reservation/safeLoad', async (params: Omit<ReservationDefinition, 'schedule'> | undefined, { getState }): Promise<any[]> => {
  const { reservation } = getState() as RootState
  const payload = {
    table_id: reservation.create.params.table,
    establishment_id: reservation.create.params.establishment,
  }
  const { data: reservationList } = await request<any[]>('GET', 'reservation/safeLoad', { params: params || payload })
  return reservationList.length ? reservationList : []
})

export const privateLoadReservations = createAsyncThunk('reservation/load', async (): Promise<any[]> => {
  const { data: reservationList } = await authRequest<any[]>('GET', 'reservation/load')
  return reservationList.length ? reservationList : []
})

export const createReservation = createAsyncThunk('reservation/create', async (data: any): Promise<any> => {
  const { data: newReservation } = await request<any>('POST', 'reservation/create', { data })
  return newReservation
})

export const updateReservation = createAsyncThunk('reservation/update', async ({ id, ...data }: any): Promise<any> => {
  const { data: updatedReservation } = await authRequest<any>('PUT', `reservation/update/${id}`, { data })
  return updatedReservation
})

export const safeUpdateReservation = createAsyncThunk('reservation/safeUpdate', async ({ id, ...data }: any): Promise<any> => {
  const { data: updatedReservation } = await request<any>('PUT', `reservation/safeUpdate/${id}`, { data })
  return updatedReservation
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
        },
        cpf: '',
        phone: ''
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
      const tableId = payload
      state.create.params.table = tableId
    },
    setReservationInterval: (state, { payload }: PayloadAction<any>) => {
      state.create.params.interval = payload
    },
    setReservationDelete: (state, { payload }: PayloadAction<any>) => {
      state.delete.id = payload
    },
    setIndividualInfo: (state, { payload }: PayloadAction<any>) => {
      state.create.params.cpf = payload.cpf
      state.create.params.phone = payload.phone
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
      .addCase(privateLoadReservations.fulfilled, (state, { payload }) => {
        state.privateLoad = {
          ...state.privateLoad,
          list: {
            state: 'ok',
            data: payload.map(reservation => ({...reservation, key: reservation})).sort((a, b) => b.id - a.id)
          }
        }
      })
  ,
})

export const {
  filterEnvironment,
  filterTable,
  resetNewReservation,
  setReservationInterval,
  setReservationDelete,
  setIndividualInfo
} = reservation.actions

export default reservation.reducer
