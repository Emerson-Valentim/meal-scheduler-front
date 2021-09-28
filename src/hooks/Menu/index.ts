import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { authRequest, request, HttpData } from '../../api'

export interface MenuState {
  load: MenuFilter
}

type MenuFilter = {
  list?: HttpData<any[]>,
}

const initialState: MenuState = {
  load: {
    list: {
      state: 'ok',
      data: []
    }
  }
}

export const loadMenus = createAsyncThunk('Menu/load', async (establishmentId: number): Promise<any[]> => {
  const { data: menuList } = await request<any[]>('GET', 'Menu/load/')
  return menuList.length ? menuList : []
})

export const Menu = createSlice({
  name: 'Menu',
  initialState,
  reducers: {
  },
  extraReducers: (builder) =>
    builder
      .addCase(loadMenus.pending, (state) => {
        state.load = {
          ...state.load,
          list: {
            state: 'loading',
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
            data: payload ? payload : (initialState.load.list?.data || []),
          }
        }
      }),
})

export default Menu.reducer
