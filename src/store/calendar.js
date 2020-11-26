import { v4 as uuidv4 } from 'uuid';
import { createSlice } from '@reduxjs/toolkit';

import { createSelector } from 'reselect';

import { firebaseSubscribeDatabaseCallBegan } from './firebase/firebaseActions';

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
		eventsUpdated: (state, action) => {
			state.events = action.payload;
		},
		// newEventAdded: (state, action) => {
		// 	// const { date, event } = action.payload;
		// 	// const newEvent = { ...event, id: uuidv4() };
		// 	// if (!hasDateInCalendar(state, date)) {
		// 	// 	state.events[date] = [];
		// 	// }
		// 	// state.events[date].push(newEvent);
		// },
		// eventDeleted: (state, action) => {
		// 	// const { date, eventId } = action.payload;
		// 	// state.events[date] = state.events[date].filter(
		// 	// 	(event) => event.id !== eventId,
		// 	// );
		// 	// if (isDayEmpty(state, date)) {
		// 	// 	delete state.events[date];
		// 	// }
		// },
		// eventDetailsChanged: (state, action) => {
		// 	const { date, eventId, newEvent } = action.payload;

		// 	state.events[date] = state.events.date.map((event) =>
		// 		event.id === eventId ? { ...event, ...newEvent } : event,
		// 	);
		// },
	},
});

// Action creators
export const subscribeToUserEvents = () => {
	// Note! Should we pass uid as arguments??
	const ref = '/calendars/B7cbkRoH7hTKGOPHNCRSpq9gXs23';

	return firebaseSubscribeDatabaseCallBegan({
		ref,
		onSuccess: calendarSlice.actions.eventsUpdated.type,
	});
};

// Selectors (with memoization using Reselect library)

// 1. get month events booleans
// REFACTOR
export const getDaysWithEvents = (year, day) =>
	createSelector(
		(state) => state.calendar,
		(calendar) => {
			const result = [];

			if (Object.keys(calendar.events).length !== 0) {
				const monthlyEvents = calendar.events['2020']['9'];

				for (const day in monthlyEvents) {
					if (Object.values(monthlyEvents[day]).length > 0) result.push(day);
				}
			}

			return result;
		},
	);

// 2. Get weekly pinned events

// 3. Get day events
export const getDayEvents = (year, month, day) =>
	createSelector(
		(state) => state.calendar,
		(calendar) => {
			return Object.keys(calendar.events).length === 0
				? []
				: Object.values(calendar.events[year][month][day]);
		},
	);

// helper functions
const isDayEmpty = (calendar, date) => calendar.events[date].length === 0;
const hasDateInCalendar = (calendar, date) =>
	calendar.events.hasOwnProperty(date);

export const {
	// newEventAdded,
	// eventDeleted,
	// eventDetailsChanged,
} = calendarSlice.actions;
export default calendarSlice.reducer;
