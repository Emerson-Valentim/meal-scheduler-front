import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { authRequest, request, HttpData } from '../../api'

export interface ScheduleState {
  load: ScheduleFilter
}

type ScheduleFilter = {
  filtered?: HttpData<any>,
}

const initialState: ScheduleState = {
  load: {
    filtered: {
      state: 'ok',
      data: {}
    }
  }
}

export const loadSchedule = createAsyncThunk('schedule/load', async (scheduleId?: number): Promise<any> => {
  if(scheduleId) {
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
            state: 'loading',
            data: {}
          },
        }
      })
      .addCase(loadSchedule.rejected, (state) => {
        state.load = {
          ...state.load,
          filtered: {
            state: 'error',
            data: {}
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
