import { createAction } from '@reduxjs/toolkit';

export const firebaseReadDatabaseCallBegan = createAction(
	'firebase/firebaseReadDatabaseCallBegan',
);
export const firebaseWriteDatabaseCallBegan = createAction(
	'firebase/firebaseWriteDatabaseCallBegan',
);

// Default
export const firebaseCallSuccess = createAction('firebase/firebaseCallSuccess');
export const firebaseCallFailed = createAction('firebase/firebaseCallFailed');
