import axios from 'axios';

// @CrossOrigin(origins = "http://localhost:9000")

const instance = axios.create({
    baseURL: 'http://localhost:8080/api'
});

instance.interceptors.request.use(function (config) {
    const token = localStorage.getItem('jwt');
    if (token) {
        config.headers.Authorization = token;
    }
    return config;
});

//axios.defaults.headers.common['Authorization'] = authorizationJwt;

export default instance;