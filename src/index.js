import store from './store/store';
import { subscribeToUserEvents } from './store/calendar';

store.dispatch(subscribeToUserEvents());
