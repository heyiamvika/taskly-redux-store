import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

const initialState = {
	user: null,
	loading: false,
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		signup: (state, action) => {
			state.user = action.payload;
		},
		login: (state, action) => {
			state.user = action.payload;
		},
		logout: (state) => {
			state.user = null;
		},
	},
});

// Selectors (with memoization using Reselect library)

export const getUserId = () => {
	createSelector(
		(state) => state.auth.user,
		(user) => {
			if (!user) return null;

			return user.id;
		},
	);
};

export const { signup, login, logout } = authSlice.actions;
export default authSlice.reducer;
