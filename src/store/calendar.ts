import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

import { isObjectEmpty } from '../utils';

import * as firebaseActions from './firebase/firebaseActions';
import {
	createEventsRef,
	createAttendeesRef,
} from './firebase/firebaseRefCreators';

import { CalendarState, Events } from './store-types/calendar';

const initialState: CalendarState = {
	events: {},
	loading: false,
	isSubscribed: false,
};

const calendarSlice = createSlice({
	name: 'calendar',
	initialState,
	reducers: {
		eventsChangesRequested: (state: CalendarState) => {
			state.loading = true;
		},
		eventsChangesRequestFailed: (state: CalendarState) => {
			state.loading = false;
		},
		eventsUpdated: (state: CalendarState, action: Events) => {
			state.events = action.payload;
			state.loading = false;
		},
		subscribedToEvents: (state: CalendarState) => {
			state.isSubscribed = true;
		},
	},
});

const {
	eventsChangesRequested,
	eventsChangesRequestFailed,
	eventsUpdated,
	subscribedToEvents,
} = calendarSlice.actions;
export default calendarSlice.reducer;

// Action creators
// export const subscribeToUserEvents = (uid: string) => (dispatch, getState) => {
// 	const { isSubscribed } = getState().calendar;
// 	if (isSubscribed) return;

// 	// TO_DO: get user id from auth.user.id
// 	const ref = createEventsRef({ uid });

// 	// dispatch(
// 	// 	firebaseActions.subscribeDatabaseCallBegan({
// 	// 		ref,
// 	// 		onSuccess: eventsUpdated.type,
// 	// 		onStart: eventsChangesRequested.type,
// 	// 		onError: eventsChangesRequestFailed.type,
// 	// 	}),
// 	// );

// 	// dispatch(subscribedToEvents());
// };

// export const addNewEvent = (
// 	uid: string,
// 	year: string,
// 	month: string,
// 	day: string,
// 	event: Event,
// ) => {
// 	const ref = createEventsRef({ uid, year, month, day });
// 	const eventToAdd = { ...event, isPinned: false };

// 	return firebaseActions.addItemCallBegun({
// 		ref,
// 		item: eventToAdd,
// 	});
// };

// export const updateEvent = (uid, year, month, day, eventKey, updatedEvent) => {
// 	const ref = createEventsRef({ uid, year, month, day, eventKey });

// 	return firebaseActions.updateItemCallBegun({
// 		ref,
// 		updatedEvent,
// 	});
// };

// export const removeEvent = (uid, year, month, day, eventKey) => {
// 	const ref = createEventsRef({ uid, year, month, day, eventKey });

// 	return firebaseActions.removeItemCallBegun({
// 		ref,
// 	});
// };

// export const pinEvent = (uid, year, month, day, eventKey, event) => {
// 	const ref = createEventsRef({ uid, year, month, day, eventKey });
// 	const pinnedEvent = { ...event, isPinned: true };

// 	return firebaseActions.updateItemCallBegun({ ref, pinnedEvent });
// };

// export const unpinEvent = (uid, year, month, day, eventKey, event) => {
// 	const ref = createEventsRef({ uid, year, month, day, eventKey });
// 	const unpinnedEvent = { ...event, isPinned: false };

// 	return firebaseActions.updateItemCallBegun({ ref, unpinnedEvent });
// };

// Collaboration!!
// export const addNewAttendee = (
// 	attendeeEmail,
// 	uid,
// 	year,
// 	month,
// 	day,
// 	eventKey,
// ) => {
// 	// Google's ADMIN SDK (backend) needed:
// 	// https://firebase.google.com/docs/auth/admin/manage-users
// 	// const ref = createAttendeesRef({ uid, year, month, day, eventKey });
// 	// return firebaseActions.addItemCallBegun({
// 	// 	ref,
// 	// 	item: attendee,
// 	// });
// };

// export const removeAttendee = () => {
// };

// Selectors
// export const getDaysWithEvents = (year, month) =>
// 	createSelector(
// 		(state) => state.calendar.events,
// 		(events) => {
// 			const result = [];

// 			if (!isObjectEmpty(events)) {
// 				const monthlyEvents = events[year][month];
// 				for (const day in monthlyEvents) {
// 					if (!isObjectEmpty(monthlyEvents[day])) result.push(day);
// 				}
// 			}

// 			return result;
// 		},
// 	);

// export const getYearEvents = (year) =>
// 	createSelector(
// 		(state) => state.calendar.events,
// 		(events) => (events.hasOwnProperty(year) ? events[year] : []),
// 	);

// export const getMonthEvents = (year, month) =>
// 	createSelector(getYearEvents(year), (yearEvents) =>
// 		yearEvents.hasOwnProperty(month) ? yearEvents[month] : [],
// 	);

// export const getDayEvents = (year, month, day) =>
// 	createSelector(
// 		getMonthEvents(year, month),
// 		(monthEvents) => monthEvents[day] || [],
// 	);

// export const getEventByKey = (year, month, day, eventKey) =>
// 	createSelector(
// 		getDayEvents(year, month, day),
// 		(dayEvents) => dayEvents[eventKey] || [],
// 	);

// Helper functions
// const getDaysInMonthCount = (year, month) => new Date(year, month, 0).getDate();
