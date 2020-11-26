import * as actions from '../firebase/firebaseActions.js';
import firebase from '../firebase/firebaseConfig.js';

const firebaseReadDatabaseMiddleware = ({ dispatch, getState }) => (
	next,
) => async (action) => {
	next(action);

	if (action.type !== actions.firebaseReadDatabaseCallBegan.type) return;

	const { ref, onSuccess, onError } = action.payload;

	try {
		const result = await firebase
			.database()
			.ref(ref)
			.once('value')
			.then((snapshot) => snapshot.val());

		// Default
		dispatch(actions.firebaseCallSuccess(result));

		// For custom success actions
		if (onSuccess) {
			dispatch({
				type: onSuccess,
				payload: result,
			});
		}
	} catch (error) {
		// Default
		dispatch(actions.firebaseCallFailed(error.message));

		// For custom error actions
		if (onError) {
			dispatch({
				type: onError,
				payload: error,
			});
		}
	}
};

export default firebaseReadDatabaseMiddleware;
