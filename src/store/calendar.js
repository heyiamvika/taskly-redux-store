import { v4 as uuidv4 } from 'uuid';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

// const Calendar = {
// 	'23/05/10': [
// 		{
// 			title: 'My test event',
// 			notes: 'My noted',
// 			timeStart: new Date(),
// 			timeEnd: new Date(),
// 			emoji: 'h',
// 		},
// 	],
// };

const calendarSlice = createSlice({
	name: 'calendar',
	initialState,
	reducers: {
		newEventAdded: (state, action) => {
			const { date, event } = action.payload;
			const newEvent = { ...event, id: uuidv4() };

			if (!hasDateInCalendar(state, date)) {
				state[date] = [];
			}

			state[date].push(newEvent);
		},
		eventDeleted: (state, action) => {
			const { date, eventId } = action.payload;

			state[date] = state[date].filter((event) => event.id !== eventId);

			if (isDayEmpty(state, date)) {
				delete state[date];
			}
		},
		eventDetailsChanged: (state, action) => {
			const { date, eventId, newEvent } = action.payload;

			state[date] = state.date.map((event) =>
				event.id === eventId ? { ...event, ...newEvent } : event,
			);
		},
	},
});

// helper functions
const isDayEmpty = (calendar, date) => calendar[date].length === 0;
const hasDateInCalendar = (calendar, date) => calendar.hasOwnProperty(date);

export const {
	newEventAdded,
	eventDeleted,
	eventDetailsChanged,
} = calendarSlice.actions;
export default calendarSlice.reducer;
