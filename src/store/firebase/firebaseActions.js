import { createAction } from '@reduxjs/toolkit';

export const subscribeDatabaseCallBegan = createAction(
	'firebase/subscribeDatabaseCallBegan',
);
export const addItemCallBegun = createAction('firebase/addItemCallBegun');
export const updateItemCallBegun = createAction('firebase/updateItemCallBegun');
export const removeItemCallBegun = createAction('firebase/removeItemCallBegun');

// Default
export const firebaseCallSuccess = createAction('firebase/firebaseCallSuccess');
export const firebaseCallFailed = createAction('firebase/firebaseCallFailed');
