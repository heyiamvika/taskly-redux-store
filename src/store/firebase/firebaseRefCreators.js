export const createEventsRef = (refOptions) => {
	// const { uid, year, month, day, eventKey } = refOptions;
	const slugs = Object.values(refOptions);
	return `/events/${slugs.join('/')}/`;
};

export const createAttendeesRef = (refOptions) => {
	const baseRef = createEventsRef(refOptions);
	return `${baseRef}/attendees/`;
};
