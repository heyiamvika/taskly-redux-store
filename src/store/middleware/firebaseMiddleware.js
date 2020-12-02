import * as firebaseActions from '../firebase/firebaseActions.js';
import { database } from '../firebase/firebaseConfig.js';

const firebaseActionTypes = [
	firebaseActions.subscribeDatabaseCallBegan.type,
	firebaseActions.addItemCallBegun.type,
	firebaseActions.updateItemCallBegun.type,
	firebaseActions.removeItemCallBegun.type,
];

const firebaseMiddleware = ({ dispatch }) => (next) => (action) => {
	next(action);

	if (!firebaseActionTypes.includes(action.type)) return;

	try {
		switch (action.type) {
			case firebaseActions.subscribeDatabaseCallBegan.type: {
				const { ref, onSuccess } = action.payload;
				subscribeToDatabase(dispatch, ref, onSuccess);
				break;
			}
			case firebaseActions.addItemCallBegun.type: {
				const { ref, event } = action.payload;
				addNewItemToDatabase(ref, event);
				break;
			}
			case firebaseActions.updateItemCallBegun.type: {
				const { ref, updatedEvent } = action.payload;
				editItemDetails(ref, updatedEvent);
				break;
			}
			case firebaseActions.removeItemCallBegun.type: {
				const { ref } = action.payload;
				removeItemFromDatabase(ref);
				return;
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

export default firebaseMiddleware;

function subscribeToDatabase(dispatch, ref, onSuccess) {
	database.ref(ref).on('value', (snapshot) => {
		const result = snapshot.val();

		// Default
		dispatch(firebaseActions.firebaseCallSuccess(result));

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
	database.ref(ref).push(item);
}

function editItemDetails(ref, updatedItem) {
	database.ref(ref).update(updatedItem);
}

function removeItemFromDatabase(ref) {
	database.ref(ref).remove();
}
