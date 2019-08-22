import axios from './axiosConfig';

export const usersApi = {
    getUsers,
    getUserInfo
};

function getUsers() {    
        return axios.get('/admin/allUsers')
            .then(response => {
                    // If the login process was successful, save authorization JWT
                    //const authorizationJwt = response.headers.authorization;
                    //axios.defaults.headers.common['Authorization'] = authorizationJwt;

                    // Then request and save logged in user information  
                    //const userId = response.headers.userid;
                    return response.data;
                },
                error => {

                    if (error.response.status === 401) {
                        // auto logout if 401 response returned from api
                        // dispatch(logoutThunk);
                        //window.location.reload(true);
                    }
                }
            );
}


function getUserInfo(userId) {
    return axios.get('/users/' + userId, {data:{}})
        .then(response => {
            console.log('response');
            console.log(response);
            return response.data;
        }
        //error => {
        //    console.log('response error');
        //    console.log(error);
        //}
        );
}





// GIA USERS META
function editUserInfo(userId) {
    return axios.put('/users/' + userId, {data:{}})
        .then(response => {
            console.log('response');
            console.log(response);
            return response.data;
        }
        //error => {
        //    console.log('response error');
        //    console.log(error);
        //}
        );
}

function changeUserPassword(userId) {
    return axios.put('/users/' + userId, {data:{}})
        .then(response => {
            console.log('response');
            console.log(response);
            return response.data;
        }
        //error => {
        //    console.log('response error');
        //    console.log(error);
        //}
        );
}


function verifyUser(userId) {
    return axios.post('/users/' + userId, {data:{}})
        .then(response => {
            console.log('response');
            console.log(response);
            return response.data;
        }
        //error => {
        //    console.log('response error');
        //    console.log(error);
        //}
        );
}


