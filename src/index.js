import store from './store/store';
import {
	newEventAdded,
	eventDeleted,
	eventDetailsChanged,
	loadEvents,
} from './store/calendar';

import firebase from 'firebase/firebase.js';

console.log(firebase);
// Initialize firebase

store.dispatch(loadEvents());
