import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { authRequest, request, HttpData } from '../../api'

export interface MenuState {
  load: MenuFilter
}

type MenuFilter = {
  list: HttpData<any[]>,
  filtered: HttpData<any>
}

const initialState: MenuState = {
  load: {
    list: {
      state: 'pending',
      data: []
    },
    filtered: {
      state: 'pending',
      data: undefined
    }
  }
}

export const loadMenus = createAsyncThunk('menu/load', async (): Promise<any[]> => {
  const { data: menuList } = await request<any[]>('GET', 'menu/load/')
  return menuList.length ? menuList : []
})

export const loadMenu = createAsyncThunk('menu/load/id', async (id: number): Promise<any> => {
  const { data: menu } = await request<any>('GET', `menu/load/${id}`)
  return menu
})

export const createMenu = createAsyncThunk('menu/create', async (data: any): Promise<any> => {
  const { data: menu } = await authRequest<any>('POST', 'menu/create', { data })
  return menu
})

export const updateMenu = createAsyncThunk('menu/update', async ({ id, ...data }: any): Promise<any> => {
  const { data: menu } = await authRequest<any>('PUT', `menu/update/${id}`, { data })
  return menu
})

export const deleteMenu = createAsyncThunk('menu/delete', async (id: number): Promise<any> => {
  const { data: menu } = await authRequest<any>('delete', `menu/delete/${id}`)
  return menu
})

export const menu = createSlice({
  name: 'menu',
  initialState,
  reducers: {
  },
  extraReducers: (builder) =>
    builder
      .addCase(loadMenus.pending, (state) => {
        state.load = {
          ...state.load,
          list: {
            state: 'pending',
            data: []
          },
        }
      })
      .addCase(loadMenus.rejected, (state) => {
        state.load = {
          ...state.load,
          list: {
            state: 'error',
            data: []
          },
        }
      })
      .addCase(loadMenus.fulfilled, (state, { payload }) => {
        state.load = {
          ...state.load,
          list: {
            state: 'ok',
            data: payload ? payload : (initialState.load.list.data || []),
          }
        }
      })
      .addCase(loadMenu.fulfilled, (state, { payload }) => {
        state.load = {
          ...state.load,
          filtered: {
            state: 'ok',
            data: payload ? payload : (initialState.load.filtered.data || undefined),
          }
        }
      }),
})

export default menu.reducer
