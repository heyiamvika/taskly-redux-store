import {
	combineReducers,
	configureStore,
	getDefaultMiddleware,
} from '@reduxjs/toolkit';

import authReducer from './auth';
import calendarReducer from './calendar';

import firebaseReadDatabaseMiddleware from './middleware/firebaseReadDatabaseMiddleware';

const rootReducer = combineReducers({
	auth: authReducer,
	calendar: calendarReducer,
});

export default configureStore({
	reducer: rootReducer,
	middleware: [...getDefaultMiddleware(), firebaseReadDatabaseMiddleware],
});
