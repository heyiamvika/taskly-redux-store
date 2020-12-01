import store from './store/store';
import {
	subscribeToUserEvents,
	getDaysWithEvents,
	getDayEvents,
	addNewEvent,
} from './store/calendar';

store.subscribe(() => {
	const state = store.getState();

	const daysWithEvents = getDaysWithEvents('2020', '9')(state);
	console.log('daysWithEvents', daysWithEvents);

	const dayEvents = getDayEvents('2020', '9', '20')(state);
	console.log('dayEvents', dayEvents);
});

store.dispatch(subscribeToUserEvents('B7cbkRoH7hTKGOPHNCRSpq9gXs23'));

store.dispatch(
	addNewEvent({
		uid: 'B7cbkRoH7hTKGOPHNCRSpq9gXs23',
		year: '2020',
		month: '12',
		day: '1',
		event: {
			emoji: '',
			startTime: '20/10/2020',
			finishTime: '20/10/2020',
			title: 'Hemllllloooo',
			notes: 'This is a note',
			isPinned: false,
		},
	}),
);
