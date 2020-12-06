import {
	combineReducers,
	configureStore,
	getDefaultMiddleware,
} from '@reduxjs/toolkit';

import authReducer from './auth';
import calendarReducer from './calendar';

import firebaseAuthMiddleware from './middleware/firebaseAuthMiddleware';
import firebaseDatabaseMiddleware from './middleware/firebaseDatabaseMiddleware';

const rootReducer = combineReducers({
	auth: authReducer,
	calendar: calendarReducer,
});

const store = configureStore({
	reducer: rootReducer,
	middleware: [
		...getDefaultMiddleware(),
		firebaseAuthMiddleware,
		firebaseDatabaseMiddleware,
	],
});

export type StoreDispatch = typeof store.dispatch;
export default store;
