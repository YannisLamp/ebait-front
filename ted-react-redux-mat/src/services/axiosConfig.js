import axios from 'axios';
import Qs from 'qs'

const instance = axios.create({
    baseURL: 'https://localhost:8443/api',
    paramsSerializer: params => Qs.stringify(params, {arrayFormat: 'repeat'})
});

instance.interceptors.request.use(function (config) {
    const token = localStorage.getItem('jwt');
    if (token) {
        config.headers.Authorization = token;
    }
    return config;
});

export default instance;