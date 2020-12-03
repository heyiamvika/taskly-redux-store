import * as firebaseActions from '../firebase/firebaseActions.js';
import { auth } from '../firebase/firebaseConfig.js';

const firebaseActionTypes = [
	firebaseActions.subscribeAuthCallBegan.type,
	firebaseActions.userSignupCallBegun.type,
	firebaseActions.userLoginCallBegun.type,
	firebaseActions.userLogoutCallBegun.type,
];

const firebaseAuthMiddleware = ({ dispatch }) => (next) => async (action) => {
	next(action);
	if (!firebaseActionTypes.includes(action.type)) return;

	try {
		switch (action.type) {
			case firebaseActions.subscribeAuthCallBegan.type: {
				const { onAuthorized, onLoggedOut } = action.payload;
				await subscribeToUserAuth(dispatch, onAuthorized, onLoggedOut);
				break;
			}
			case firebaseActions.userSignupCallBegun.type: {
				const { email, password } = action.payload;
				await signupUser(email, password);
				break;
			}
			case firebaseActions.userLoginCallBegun.type: {
				const { email, password } = action.payload;
				await loginUser(email, password);
				break;
			}
			case firebaseActions.userLogoutCallBegun.type: {
				await logoutUser();
				break;
			}
			default:
				break;
		}
	} catch (error) {
		const { onError } = action.payload;

		// Default
		dispatch(firebaseActions.firebaseCallFailed(error.message));

		// For custom error actions
		if (onError) {
			dispatch({
				type: onError,
				payload: error,
			});
		}
	}
};

export default firebaseAuthMiddleware;

const subscribeToUserAuth = (dispatch, onAuthorized, onLoggedOut) =>
	auth.onAuthStateChanged((user) => {
		// Default
		dispatch(firebaseActions.firebaseCallSuccess());

		if (user) {
			// User is signed in.
			if (onAuthorized) {
				const { displayName: fullName, email, photoURL: profileImage } = user;
				dispatch({
					type: onAuthorized,
					payload: {
						fullName,
						email,
						profileImage,
					},
				});
			}
		} else {
			// No user is signed in.
			if (onLoggedOut) {
				// console.log(user);
				dispatch({
					type: onLoggedOut,
				});
			}
		}
	});

const signupUser = (email, password) =>
	auth.createUserWithEmailAndPassword(email, password);

const loginUser = (email, password) =>
	auth.signInWithEmailAndPassword(email, password);

const logoutUser = () => auth.signOut();
