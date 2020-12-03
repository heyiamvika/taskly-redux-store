import axios from 'axios';

const action = {
	type: 'apiCallBegan',
	payload: {
		url: '/bugs',
		method: 'get',
		data: {},
		onSuccess: 'bugsReceived',
		onError: 'apiRequestFailed',
	},
};

const api = (store) => (next) => (action) => {
	if (action.type !== 'apiCallBegan') return next(action);

	const { url, method, data, onSuccess, onError } = action.payload;

	axios.request({
		baseURL: 'http://localhost:9001/api',
		url,
		method,
		data,
	});
};

export default api;
