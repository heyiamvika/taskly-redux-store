import { createAction } from '@reduxjs/toolkit';

export const firebaseSubscribeDatabaseCallBegan = createAction(
	'firebase/firebaseSubscribeDatabaseCallBegan',
);
export const firebaseWriteDatabaseCallBegan = createAction(
	'firebase/firebaseWriteDatabaseCallBegan',
);

// Default
export const firebaseCallSuccess = createAction('firebase/firebaseCallSuccess');
export const firebaseCallFailed = createAction('firebase/firebaseCallFailed');
