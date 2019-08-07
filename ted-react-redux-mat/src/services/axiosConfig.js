import axios from 'axios';

//@CrossOrigin(origins = "http://localhost:9000")

const instance = axios.create({
    baseURL: 'http://localhost:8080/api'
});

export default instance;