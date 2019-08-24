import axios from './axiosConfig';

export const usersApi = {
    getUsers,
    getNotVerifiedUsers,
    getUserInfo,
    verifyUser,
};

function getUsers(orderBy, order, pageSize, currPage) {    
        return axios.get('/admin/users', {
            params: {
                orderBy: orderBy,
                pageNo: currPage,

                pageSize: pageSize,
                order: order,

            }
            })
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


function getNotVerifiedUsers(orderBy, order, pageSize, currPage) {    
    return axios.get('/admin/not_verified_users', {
        params: {
            orderBy: orderBy,
            pageNo: currPage,

            pageSize: pageSize,
            order: order,

        }
        })
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
    return axios.put('/users/change_password' + userId, {data:{}})
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
    return axios.put('/admin/verify/' + userId, {data:{}})
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

function verifyAll(userId) {
    return axios.put('/admin/verify/', {data:{}})
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


