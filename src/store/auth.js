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
		authStarted: (state, action) => {
			state.loading = true;
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

export const { authStarted } = authSlice.actions;
export default authSlice.reducer;
