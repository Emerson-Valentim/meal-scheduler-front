import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { authRequest, request, HttpData } from '../../api'

export interface ScheduleState {
  load: ScheduleFilter
}

type ScheduleDefinition = {
  definition: {
    [key: number]: {
      start: string
      end: string
    }
  }
}

type ScheduleFilter = {
  filtered: HttpData<ScheduleDefinition | undefined>,
}

const initialState: ScheduleState = {
  load: {
    filtered: {
      state: 'pending',
      data: undefined
    }
  }
}

export const loadSchedule = createAsyncThunk('schedule/load', async (scheduleId: number): Promise<any> => {
  const { data: schedule } = await request<any[]>('GET', `schedule/load/${scheduleId}`)
  return schedule
})

export const createSchedule = createAsyncThunk('schedule/create', async (data: any): Promise<any> => {
  const { data: schedule } = await authRequest<any[]>('POST', 'schedule/create', { data })
  return schedule
})

export const updateSchedule = createAsyncThunk('schedule/update', async ({id, ...data}: any): Promise<any> => {
  const { data: schedule } = await authRequest<any[]>('PUT', `schedule/update/${id}`, { data })
  return schedule
})

export const Schedule = createSlice({
  name: 'Schedule',
  initialState,
  reducers: {
  },
  extraReducers: (builder) =>
    builder
      .addCase(loadSchedule.pending, (state) => {
        state.load = {
          ...state.load,
          filtered: {
            state: 'pending',
            data: undefined
          },
        }
      })
      .addCase(loadSchedule.rejected, (state) => {
        state.load = {
          ...state.load,
          filtered: {
            state: 'error',
            data: undefined
          },
        }
      })
      .addCase(loadSchedule.fulfilled, (state, { payload }) => {
        state.load = {
          ...state.load,
          filtered: {
            state: 'ok',
            data: payload,
          }
        }
      }),
})

export default Schedule.reducer
