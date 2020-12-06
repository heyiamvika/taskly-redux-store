// State

export type Event = {};

export type Events = {
	[key: string]: Event;
};

export type CalendarState = {
	events: Events;
	loading: boolean;
	isSubscribed: boolean;
};

//
