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
		eventsChangesRequested: (state) => {
			state.loading = true;
		},
		eventsChangesRequestFailed: (state) => {
			state.loading = false;
		},
		eventsUpdated: (state, action) => {
			state.events = action.payload;
			state.loading = false;
		},
	},
});

export const {
	eventsChangesRequested,
	eventsChangesRequestFailed,
	eventsUpdated,
} = calendarSlice.actions;
export default calendarSlice.reducer;

// Action creators
export const subscribeToUserEvents = (userId) => {
	// TO_DO: get user id from auth.user.id
	const ref = `/calendars/${userId}`;

	return firebaseActions.subscribeDatabaseCallBegan({
		ref,
		onSuccess: eventsUpdated.type,
		onStart: eventsChangesRequested.type,
		onError: eventsChangesRequestFailed.type,
	});
};

export const addNewEvent = (uid, year, month, day, event) => {
	const ref = `/calendars/${uid}/${year}/${month}/${day}`;
	return firebaseActions.addItemCallBegun({
		ref,
		event,
	});
};

export const updateEvent = (uid, year, month, day, eventKey, updatedEvent) => {
	const ref = `/calendars/${uid}/${year}/${month}/${day}/${eventKey}`;
	return firebaseActions.updateItemCallBegun({
		ref,
		updatedEvent,
	});
};

export const removeEvent = (uid, year, month, day, eventKey) => {
	const ref = `/calendars/${uid}/${year}/${month}/${day}/${eventKey}`;
	return firebaseActions.removeItemCallBegun({
		ref,
	});
};

export const pinEvent = (uid, year, month, day, eventKey, event) => {
	const ref = `/calendars/${uid}/${year}/${month}/${day}/${eventKey}`;
	const pinnedEvent = { ...event, isPinned: true };

	return firebaseActions.updateItemCallBegun({ ref, pinnedEvent });
};

export const unpinEvent = (uid, year, month, day, eventKey, event) => {
	const ref = `/calendars/${uid}/${year}/${month}/${day}/${eventKey}`;
	const unpinnedEvent = { ...event, isPinned: false };

	return firebaseActions.updateItemCallBegun({ ref, unpinnedEvent });
};

// Collaboration!!
// export const addAttendee = () => {};

// export const removeAttendee = () => {};

// Selectors
export const getDaysWithEvents = (year, month) =>
	createSelector(
		(state) => state.calendar.events,
		(events) => {
			const result = [];

			if (!isObjectEmpty(events)) {
				const monthlyEvents = events[year][month];
				for (const day in monthlyEvents) {
					if (!isObjectEmpty(monthlyEvents[day])) result.push(day);
				}
			}

			return result;
		},
	);

export const getYearEvents = (year) =>
	createSelector(
		(state) => state.calendar.events,
		(events) => (events.hasOwnProperty(year) ? events[year] : []),
	);

export const getMonthEvents = (year, month) =>
	createSelector(getYearEvents(year), (yearEvents) =>
		yearEvents.hasOwnProperty(month) ? yearEvents[month] : [],
	);

export const getDayEvents = (year, month, day) =>
	createSelector(
		getMonthEvents(year, month),
		(monthEvents) => monthEvents[day] || [],
	);

export const getEventByKey = (year, month, day, eventKey) =>
	createSelector(
		getDayEvents(year, month, day),
		(dayEvents) => dayEvents[eventKey] || [],
	);

// Helper functions
// const getDaysInMonthCount = (year, month) => new Date(year, month, 0).getDate();
