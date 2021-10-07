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

export const loadSchedule = createAsyncThunk('schedule/load', async (scheduleId?: number): Promise<any> => {
  if (scheduleId) {
    const { data: schedule } = await request<any[]>('GET', `schedule/load/${scheduleId}`)
    return schedule
  }
  return undefined
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
            data: payload ? payload : (initialState.load.filtered?.data || {}),
          }
        }
      }),
})

export default Schedule.reducer
