import * as actions from '../firebase/firebaseActions.js';
import firebase from '../firebase/firebaseConfig.js';

const firebaseActionTypes = [
	actions.firebaseSubscribeDatabaseCallBegan.type,
	actions.firebaseWriteDatabaseCallBegan.type,
];

const firebaseMiddleware = ({ dispatch }) => (next) => (action) => {
	next(action);

	if (!firebaseActionTypes.includes(action.type)) return;

	try {
		switch (action.type) {
			case actions.firebaseSubscribeDatabaseCallBegan.type: {
				const { ref, onSuccess, onError } = action.payload;
				subscribeToDatabase(dispatch, ref, onSuccess);
				return;
			}
			case actions.firebaseWriteDatabaseCallBegan.type: {
				const { ref, event } = action.payload;
				addNewItemToDatabase(ref, event);
				return;
			}
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

export default firebaseMiddleware;

function subscribeToDatabase(dispatch, ref, onSuccess) {
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
}

function addNewItemToDatabase(ref, item) {
	firebase.database().ref(ref).push(item);
}
