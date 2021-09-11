import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import request from '../../api';
import { RootState, AppThunk } from '../store';

export type Credentials = {
	cnpj: string;
	password: string;
};

export interface UserState {
	credentials: Credentials;
	logged: {
		value: boolean;
		reason: 'badCredentials' | 'error' | 'default';
	};
}

const initialState: UserState = {
	credentials: {
		cnpj: '',
		password: '',
	},
	logged: {
		value: false,
		reason: 'default',
	},
};

export const authenticate = createAsyncThunk('user/load', async () => {
	const { data: userInfo } = await request('GET', 'user/load', {});
	return userInfo;
});

export const user = createSlice({
	name: 'user',
	initialState,
	reducers: {
		login: (state, action: PayloadAction<Credentials>) => {
			state.credentials = action.payload;
		},
	},
	extraReducers: (builder) =>
		builder
			.addCase(authenticate.pending, (state) => {
				state.logged = {
					value: false,
					reason: 'default',
				};
			})
			.addCase(authenticate.rejected, (state) => {
				state.logged = {
					value: false,
					reason: 'badCredentials',
				};
			})
			.addCase(authenticate.fulfilled, (state) => {
				state.logged = {
					value: true,
					reason: 'default',
				};
			}),
});

export const { login } = user.actions;

export default user.reducer;
