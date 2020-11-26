import axios from 'axios';

import * as actions from '../api';

const api = ({ dispatch, getState }) => (next) => async (action) => {
	next(action);

	if (action.type !== actions.apiCallBegan.type) return;

	const { url, method, data, onSuccess, onError } = action.payload;

	try {
		const result = await axios.request({
			baseURL: 'http://localhost:9001/api',
			url,
			method,
			data,
		});

		// General
		dispatch(actions.apiCallSuccess(result.data));

		// Specific, if provided in action payload
		if (onSuccess) {
			dispatch({
				type: onSuccess,
				payload: result,
			});
		}
	} catch (error) {
		// Specific, if provided in action payload
		// General
		dispatch(actions.apiCallFailed(error));

		if (onError) {
			dispatch({
				type: onError,
				payload: error,
			});
		}
	}
};

export default api;
