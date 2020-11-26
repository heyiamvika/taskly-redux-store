import { v4 as uuidv4 } from 'uuid';
import { createSlice } from '@reduxjs/toolkit';

import { firebaseReadDatabaseCallBegan } from './firebase/firebaseActions';

const initialState = {
	events: {},
	loading: false,
	lastFetch: null,
};

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
		eventsReceived: (state, action) => {
			// Use normalizr to set correct data!
			const { year, month, events } = action.payload;

			state.events = action.payload;
		},
		newEventAdded: (state, action) => {
			const { date, event } = action.payload;
			const newEvent = { ...event, id: uuidv4() };

			if (!hasDateInCalendar(state, date)) {
				state.events[date] = [];
			}

			state.events[date].push(newEvent);
		},
		eventDeleted: (state, action) => {
			const { date, eventId } = action.payload;

			state.events[date] = state.events[date].filter(
				(event) => event.id !== eventId,
			);

			if (isDayEmpty(state, date)) {
				delete state.events[date];
			}
		},
		eventDetailsChanged: (state, action) => {
			const { date, eventId, newEvent } = action.payload;

			state.events[date] = state.events.date.map((event) =>
				event.id === eventId ? { ...event, ...newEvent } : event,
			);
		},
	},
});

export const {
	newEventAdded,
	eventDeleted,
	eventDetailsChanged,
	eventsReceived,
} = calendarSlice.actions;
export default calendarSlice.reducer;

// Action creators
export const loadUserEvents = () => {
	// Note! Should we pass uid, year and month as arguments??
	const ref = '/calendars/B7cbkRoH7hTKGOPHNCRSpq9gXs23';

	return firebaseReadDatabaseCallBegan({
		ref,
		onSuccess: eventsReceived.type,
	});
};

// Selectors
// 1. get month events
// 3. Get day events
// 2. Get weekly pinned events

// helper functions
const isDayEmpty = (calendar, date) => calendar.events[date].length === 0;
const hasDateInCalendar = (calendar, date) =>
	calendar.events.hasOwnProperty(date);
