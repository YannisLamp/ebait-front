import axios from './axiosConfig';

export const usersApi = {
    getUsers,
    getNotVerifiedUsers,
    getUserInfo,
    verifyUser,
    editUserInfo,
    changeUserPassword,
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



function editUserInfo(userId, firstName, lastName, email, 
        phoneNumber, country, address, afm) {
    const editUserData = { firstName, lastName, email, 
        phoneNumber, country, address, afm };

    return axios.put('/users/' + userId, editUserData)
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


function changeUserPassword(currPassword, newPassword) {
    const changePasswordData = { currPassword, newPassword };

    return axios.put('/users/change_password/', changePasswordData)
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



