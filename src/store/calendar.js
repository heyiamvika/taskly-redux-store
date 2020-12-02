// import { v4 as uuidv4 } from 'uuid';

import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

import { isObjectEmpty } from '../utils';

import * as firebaseActions from './firebase/firebaseActions';

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

	return firebaseActions.subscribeDatabaseCallBegan({
		ref,
		onSuccess: calendarSlice.actions.eventsUpdated.type,
	});
};

export const addNewEvent = (uid, year, month, day, event) => {
	const ref = `/calendars/${uid}/${year}/${month}/${day}`;
	return firebaseActions.addItemCallBegun({ ref, event });
};

export const updateEvent = (uid, year, month, day, eventKey, updatedEvent) => {
	const ref = `/calendars/${uid}/${year}/${month}/${day}/${eventKey}`;
	return firebaseActions.updateItemCallBegun({ ref, updatedEvent });
};

export const removeEvent = (uid, year, month, day, eventKey) => {
	const ref = `/calendars/${uid}/${year}/${month}/${day}/${eventKey}`;
	return firebaseActions.removeItemCallBegun({ ref });
};

// export const pinEvent = (eventId) => {};

// // Collaboration!!
// export const addAttendee = () => {};

// export const removeAttendee = () => {};

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

export const { eventsUpdated } = calendarSlice.actions;
export default calendarSlice.reducer;
