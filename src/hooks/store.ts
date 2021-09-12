import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userReducer from './User';
import commonReducer from './Common';

export const store = configureStore({
	reducer: {
		user: userReducer,
    common: commonReducer
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
