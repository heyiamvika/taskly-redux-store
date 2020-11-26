import {
	createStore,
	combineReducers,
	compose,
	configureStore,
	getDefaultMiddleware,
} from '@reduxjs/toolkit';

import authReducer from './auth';
import calendarReducer from './calendar';

const rootReducer = combineReducers({
	auth: authReducer,
	calendar: calendarReducer,
});

export default configureStore({
	reducer: rootReducer,
	middleware: [...getDefaultMiddleware()],
});
