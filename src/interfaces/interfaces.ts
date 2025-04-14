import { message } from 'antd';
import axios from 'axios';

const axiosInstance = axios.create({
	baseURL: 'http://localhost:3000/',
	timeout: 3000,
});

axiosInstance.interceptors.request.use(function (config) {
	const accessToken = localStorage.getItem('access_token');

	if (accessToken) {
		config.headers.authorization = 'Bearer ' + accessToken;
	}
	return config;
});

axiosInstance.interceptors.response.use(
	(response) => {
		return response;
	},
	async (error) => {
		// if (!error.response) {
		// 	return Promise.reject(error);
		// }
		const { data, config } = error.response;

		if (data.code === 401 && !config.url.includes('/user/admin/refresh')) {
			const res = await refreshToken();

			if (res.status === 200 || res.status === 201) {
				return axiosInstance(config);
			} else {
				message.error(res.data);

				setTimeout(() => {
					window.location.href = '/login';
				}, 1500);
			}
		} else {
			return error.response;
		}
	}
);

async function refreshToken() {
	const res = await axiosInstance.get('/user/admin/refresh', {
		params: {
			refresh_token: localStorage.getItem('refresh_token'),
		},
	});
	console.log(res.data);
	localStorage.setItem('access_token', res.data.accessToken);
	localStorage.setItem('refresh_token', res.data.refreshToken);
	return res;
}

export async function login(username: string, password: string) {
	return await axiosInstance.post('/user/admin/login', {
		username,
		password,
	});
}

export async function userSearch(
	username: string,
	nickName: string,
	email: string,
	pageNo: number,
	pageSize: number
) {
	return await axiosInstance.get('/user/list', {
		params: {
			username,
			nickName,
			email,
			pageNo,
			pageSize,
		},
	});
}

export async function freeze(id: number) {
	return await axiosInstance.get('/user/freeze', {
		params: {
			id,
		},
	});
}
