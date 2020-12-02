import { createAction } from '@reduxjs/toolkit';

// Auth
export const subscribeAuthCallBegan = createAction(
	'firebase/subscribeAuthCallBegan',
);
export const userSignupCallBegun = createAction('firebase/userSignupCallBegun');
export const userLoginCallBegun = createAction('firebase/userLoginCallBegun');
export const userLogoutCallBegun = createAction('firebase/userLogoutCallBegun');

// Database
export const subscribeDatabaseCallBegan = createAction(
	'firebase/subscribeDatabaseCallBegan',
);
export const addItemCallBegun = createAction('firebase/addItemCallBegun');
export const updateItemCallBegun = createAction('firebase/updateItemCallBegun');
export const removeItemCallBegun = createAction('firebase/removeItemCallBegun');

// Default
export const firebaseCallSuccess = createAction('firebase/firebaseCallSuccess');
export const firebaseCallFailed = createAction('firebase/firebaseCallFailed');
