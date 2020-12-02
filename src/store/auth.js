import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

import * as firebaseActions from './firebase/firebaseActions';

const initialState = {
	user: null,
	loading: false,
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		userAuthorized: (state, action) => {
			state.user = action.payload;
		},
		userLoggedOut: (state) => {
			state.user = null;
		},
	},
});

// Action creators
export const subscribeToUserAuthStateChanges = () =>
	firebaseActions.subscribeAuthCallBegan({
		onAuthorized: authSlice.actions.userAuthorized.type,
		onLoggedOut: authSlice.actions.userLoggedOut.type,
	});

export const signup = (email, password) =>
	firebaseActions.userSignupCallBegun({ email, password });
export const login = (email, password) =>
	firebaseActions.userLoginCallBegun({ email, password });
export const logout = () => firebaseActions.userLogoutCallBegun();

// Selectors
export const isUserLoggedIn = () => {
	createSelector(
		(state) => state.auth.user,
		(user) => Boolean(user),
	);
};

export const getUserId = () => {
	createSelector(
		(state) => state.auth.user,
		(user) => (user ? user.id : null),
	);
};

export default authSlice.reducer;
