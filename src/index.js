import store from './store/store';

import {
	newEventAdded,
	eventDeleted,
	eventDetailsChanged,
} from './store/calendar';

const date = new Date();

store.dispatch(
	newEventAdded({
		date: '25/10/1994',
		event: {
			title: 'My test event',
			notes: 'My noted',
			timeStart: date.toLocaleString(),
			timeEnd: date.toLocaleString(),
			emoji: 'h',
		},
	}),
);

store.dispatch(
	eventDeleted({
		date: '25/10/1994',
		eventId: '50c3f0ff-c80d-471e-be36-d35afe90b09d',
	}),
);
