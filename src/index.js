import store from './store/store';
import {
	subscribeToUserEvents,
	getDaysWithEvents,
	getDayEvents,
	addNewEvent,
	updateEvent,
	removeEvent,
} from './store/calendar';

store.subscribe(() => {
	const state = store.getState();

	const daysWithEvents = getDaysWithEvents('2020', '9')(state);
	console.log('daysWithEvents', daysWithEvents);

	const dayEvents = getDayEvents('2020', '9', '20')(state);
	console.log('dayEvents', dayEvents);
});

store.dispatch(subscribeToUserEvents('B7cbkRoH7hTKGOPHNCRSpq9gXs23'));

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

// store.dispatch(
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
