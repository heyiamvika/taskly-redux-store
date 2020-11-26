import store from './store/store';
import {
	newEventAdded,
	eventDeleted,
	eventDetailsChanged,
	loadUserEvents,
} from './store/calendar';

store.dispatch(loadUserEvents());
