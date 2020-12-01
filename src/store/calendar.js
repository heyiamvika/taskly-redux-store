import { v4 as uuidv4 } from 'uuid';

import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import {
	firebaseSubscribeDatabaseCallBegan,
	firebaseWriteDatabaseCallBegan,
} from './firebase/firebaseActions';

import { isObjectEmpty } from '../utils';

const initialState = {
	events: {},
	loading: false,
	lastFetch: null,
};

const calendarSlice = createSlice({
	name: 'calendar',
	initialState,
	reducers: {
		eventsUpdated: (state, action) => {
			state.events = action.payload;
		},
	},
});

// Action creators
export const subscribeToUserEvents = (userId) => {
	// TO_DO: get user id from auth.user.id

	const ref = `/calendars/${userId}`;

	return firebaseSubscribeDatabaseCallBegan({
		ref,
		onSuccess: calendarSlice.actions.eventsUpdated.type,
	});
};

export const addNewEvent = (eventDetails) => {
	const { uid, year, month, day, event } = eventDetails;
	const ref = `calendars/${uid}/${year}/${month}/${day}`;

	return firebaseWriteDatabaseCallBegan({ ref, event });
};

// Selectors (with memoization using Reselect library)

// 1. get month events booleans
// REFACTOR
export const getDaysWithEvents = (year, month) =>
	createSelector(
		(state) => state.calendar.events,
		(events) => {
			const result = [];

			if (!isObjectEmpty(events)) {
				const monthlyEvents = events[year][month];

				for (const day in monthlyEvents) {
					if (!isObjectEmpty(monthlyEvents[day])) {
						result.push(day);
					}
				}
			}

			return result;
		},
	);

// 2. Get weekly pinned events

// 3. Get day events
export const getDayEvents = (year, month, day) =>
	createSelector(
		(state) => state.calendar.events,
		(events) => {
			return isObjectEmpty(events)
				? []
				: Object.values(events[year][month][day]);
		},
	);

export default calendarSlice.reducer;
