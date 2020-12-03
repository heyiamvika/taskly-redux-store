import * as firebaseActions from '../firebase/firebaseActions.js';
import { database } from '../firebase/firebaseConfig.js';

const firebaseActionTypes = [
	firebaseActions.subscribeDatabaseCallBegan.type,
	firebaseActions.addItemCallBegun.type,
	firebaseActions.updateItemCallBegun.type,
	firebaseActions.removeItemCallBegun.type,
];

const firebaseDatabaseMiddleware = ({ dispatch }) => (next) => async (
	action,
) => {
	if (!firebaseActionTypes.includes(action.type)) return next(action);

	next(action);

	try {
		switch (action.type) {
			case firebaseActions.subscribeDatabaseCallBegan.type: {
				const { ref, onSuccess, onStart } = action.payload;
				await subscribeToDatabase(dispatch, ref, onSuccess, onStart);
				break;
			}
			case firebaseActions.addItemCallBegun.type: {
				const { ref, item } = action.payload;

				await addNewItem(ref, item);
				break;
			}
			case firebaseActions.updateItemCallBegun.type: {
				const { ref, updatedItem } = action.payload;
				await editItem(ref, updatedItem);
				break;
			}
			case firebaseActions.removeItemCallBegun.type: {
				const { ref } = action.payload;
				await removeItem(ref);
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
				payload: error.message,
			});
		}
	}
};

export default firebaseDatabaseMiddleware;

const subscribeToDatabase = (dispatch, ref, onSuccess, onStart) =>
	database.ref(ref).on('value', (snapshot) => {
		// For loading indicators
		if (onStart) dispatch({ type: onStart });

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

const addNewItem = (ref, item) => database.ref(ref).push(item);
const editItem = (ref, updatedItem) => database.ref(ref).update(updatedItem);
const removeItem = (ref) => database.ref(ref).remove();
