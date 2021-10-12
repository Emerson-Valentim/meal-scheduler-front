import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { authRequest, request, HttpData } from '../../api'

export interface TableState {
  load: TableFilter
}

type TableFilter = {
  list?: HttpData<any[]>,
}

const initialState: TableState = {
  load: {
    list: {
      state: 'pending',
      data: []
    }
  }
}

export const loadTables = createAsyncThunk('table/load', async (): Promise<any[]> => {
  const { data: tableList } = await request<any[]>('GET', 'table/load/')
  return tableList.length ? tableList : []
})

export const createTable = createAsyncThunk('table/create', async (data: any): Promise<any> => {
  const { data: table } = await authRequest<any>('POST', 'table/create', { data })
  return table
})

export const deleteTable = createAsyncThunk('table/delete/id', async (id: number): Promise<any> => {
  const { data: table } = await authRequest<any[]>('DELETE', `table/delete/${id}`)
  return table
})

export const table = createSlice({
  name: 'table',
  initialState,
  reducers: {
  },
  extraReducers: (builder) =>
    builder
      .addCase(loadTables.pending, (state) => {
        state.load = {
          ...state.load,
          list: {
            state: 'pending',
            data: []
          },
        }
      })
      .addCase(loadTables.rejected, (state) => {
        state.load = {
          ...state.load,
          list: {
            state: 'error',
            data: []
          },
        }
      })
      .addCase(loadTables.fulfilled, (state, { payload }) => {
        state.load = {
          ...state.load,
          list: {
            state: 'ok',
            data: payload ? payload : (initialState.load.list?.data || []),
          }
        }
      }),
})

export default table.reducer
