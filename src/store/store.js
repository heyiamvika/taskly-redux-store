import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth';
import calendarReducer from './calendar';

export default configureStore({
	reducer: {
		auth: authReducer,
		calendar: calendarReducer,
	},
});
