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

export default configureStore({
	reducer: rootReducer,
	middleware: [
		...getDefaultMiddleware(),
		firebaseAuthMiddleware,
		firebaseDatabaseMiddleware,
	],
});
