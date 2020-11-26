import store from './store/store';
import {
	subscribeToUserEvents,
	getDaysWithEvents,
	getDayEvents,
} from './store/calendar';

store.subscribe(() => {
	const state = store.getState();

	const daysWithEvents = getDaysWithEvents('2020', '9')(state);
	console.log(daysWithEvents);

	const dayEvents = getDayEvents('2020', '9', '20')(state);
	console.log(dayEvents);
});

store.dispatch(subscribeToUserEvents());
