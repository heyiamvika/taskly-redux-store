import store from './store/store';
import {
	subscribeToUserEvents,
	getDaysWithEvents,
	getDayEvents,
	getEventByKey,
	addNewEvent,
	updateEvent,
	removeEvent,
	getYearEvents,
	getMonthEvents,
} from './store/calendar';

import {
	signup,
	login,
	logout,
	subscribeToUserAuthStateChanges,
} from './store/auth';

import { apiCallBegan, apiCallSuccess, apiCallFailed } from './store/api';

// store.dispatch(
// 	apiCallBegan({
// 		url: '/bugs',
// 	}),
// );

store.subscribe(() => {
	const state = store.getState();

	// const daysWithEvents = getDaysWithEvents('2020', '9')(state);
	// console.log('daysWithEvents', daysWithEvents);

	// const dayEvents = getDayEvents('2020', '12', '1')(state);
	// console.log('dayEvents', dayEvents);

	// const eventByKey = getEventByKey(
	// 	'2020',
	// 	'12',
	// 	'1',
	// 	'-MNXs6DUJ2g-x82YAxQO',
	// )(state);
	// console.log('event by key', eventByKey);

	// const yearEvents = getYearEvents('2020')(state);
	// console.log('yearEvents', yearEvents);

	// const monthEvents = getMonthEvents('2020', '12')(state);
	// console.log('monthEvents', monthEvents);

	// const dayEvents = getDayEvents('2020', '12', '1')(state);
	// console.log('dayEvents', dayEvents);

	// const dayEvents = getDayEvents('2020', '12', '1')(state);
	// console.log('dayEvents', dayEvents);
});

// store.dispatch(subscribeToUserAuthStateChanges());
// store.dispatch(signup('viktoriian@wix.com', 'balalajaja'));

store.dispatch(subscribeToUserEvents('B7cbkRoH7hTKGOPHNCRSpq9gXs23'));

setTimeout(
	() => store.dispatch(subscribeToUserEvents('B7cbkRoH7hTKGOPHNCRSpq9gXs23')),
	5000,
);

// store.dispatch(
// 	addNewEvent('B7cbkRoH7hTKGOPHNCRSpq9gXs23', '2020', '12', '1', {
// 		emoji: '',
// 		startTime: '20/10/2020',
// 		finishTime: '20/10/2020',
// 		title: 'Hemllllloooo',
// 		notes: 'This is a note',
// 		isPinned: false,
// 	}),
// );

// // store.dispatch(
// 	updateEvent(
// 		'B7cbkRoH7hTKGOPHNCRSpq9gXs23',
// 		'2020',
// 		'12',
// 		'1',
// 		'-MNXrlbjJoxyS4Ey6WhB',
// 		{
// 			emoji: '',
// 			startTime: '20/10/2020',
// 			finishTime: '20/10/2020',
// 			title: 'Uppppdaaated',
// 			notes: 'This is a note',
// 			isPinned: false,
// 		},
// 	),
// );

// store.dispatch(
// 	removeEvent(
// 		'B7cbkRoH7hTKGOPHNCRSpq9gXs23',
// 		'2020',
// 		'12',
// 		'1',
// 		'-MNXrlbjJoxyS4Ey6WhB',
// 	),
// );
