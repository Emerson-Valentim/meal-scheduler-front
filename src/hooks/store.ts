import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import userReducer from './User'
import commonReducer from './Common'
import establishmentReducer from './Establishment'
import tableReducer from './Table'
import scheduleReducer from './Schedule'
import reservationReducer from './Reservation'

export const store = configureStore({
  reducer: {
    user: userReducer,
    common: commonReducer,
    establishment: establishmentReducer,
    table: tableReducer,
    schedule: scheduleReducer,
    reservation: reservationReducer
  },
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
