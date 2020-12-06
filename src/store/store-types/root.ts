import { AuthState } from './auth';
import { CalendarState } from './calendar';

export type RootState = {
	auth: AuthState;
	calendar: CalendarState;
};
