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
		authStarted: (state) => {
			state.loading = true;
		},
		authFailed: (state) => {
			state.loading = false;
		},
		userAuthorized: (state, action) => {
			state.user = action.payload;
			state.loading = false;
		},
		userLoggedOut: (state) => {
			state.user = null;
			state.loading = false;
		},
	},
});

export const {
	userAuthorized,
	userLoggedOut,
	authStarted,
	authFailed,
} = authSlice.actions;
export default authSlice.reducer;

// Action creators
export const subscribeToUserAuthStateChanges = () => {
	return firebaseActions.subscribeAuthCallBegan({
		onAuthorized: userAuthorized.type,
		onLoggedOut: userLoggedOut.type,
		onStart: authStarted.type,
		onError: authFailed.type,
	});
};

export const signup = (email, password) =>
	firebaseActions.userSignupCallBegun({
		email,
		password,
		onError: authFailed.type,
	});
export const login = (email, password) =>
	firebaseActions.userLoginCallBegun({
		email,
		password,
		onError: authFailed.type,
	});
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
