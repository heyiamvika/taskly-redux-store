import * as actions from '../firebase/firebaseActions.js';
import firebase from '../firebase/firebaseConfig.js';

const firebaseSubscribeDatabaseMiddleware = ({ dispatch }) => (next) => (
	action,
) => {
	next(action);

	if (action.type !== actions.firebaseSubscribeDatabaseCallBegan.type) return;

	const { ref, onSuccess, onError } = action.payload;

	try {
		firebase
			.database()
			.ref(ref)
			.on('value', (snapshot) => {
				const result = snapshot.val();

				// Default
				dispatch(actions.firebaseCallSuccess(result));

				// For custom success actions
				if (onSuccess) {
					dispatch({
						type: onSuccess,
						payload: result,
					});
				}
			});
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

export default firebaseSubscribeDatabaseMiddleware;
