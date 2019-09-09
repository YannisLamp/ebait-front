import axios from './axiosConfig';
import handleError from './handleError';

const getUsers = async (orderBy, order, pageSize, currPage) => {
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
        }
        )
        .catch(error => { handleError(error) });
}


const getNotVerifiedUsers = async (orderBy, order, pageSize, currPage) => {
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
        }
        )
        .catch(error => { handleError(error) });
}


const getUserInfo = async (userId) => {
    return axios.get('/users/' + userId, { data: {} })
        .then(
            response => {
                return response.data;
            }
        )
        .catch(error => {handleError(error)});
}


const editUserInfo = async (userId, firstName, lastName, email, phoneNumber, country, address, afm) => {
    const editUserData = {
        firstName, lastName, email,
        phoneNumber, country, address, afm
    };

    return axios.put('/users/' + userId, editUserData)
        .then(response => {
            return response.data;
        })
        .catch(error => {handleError(error)});
}


const changeUserPassword = async (currPassword, newPassword) => {
    const changePasswordData = { currPassword, newPassword };

    return axios.put('/users/change_password/', changePasswordData)
        .then(response => {
            return response.data;
        })
        .catch(error => {handleError(error)});
}


const verifyUser = async (userId) => {
    return axios.put('/admin/verify/' + userId, { data: {} })
        .then(response => {
            return response.data;
        })
        .catch(error => {handleError(error)});
}

const verifyAll = async (userId) => {
    return axios.put('/admin/verify/', { data: {} })
        .then(response => {
            return response.data;
        })
        .catch(error => {handleError(error)});
}


export const usersApi = {
    getUsers,
    getNotVerifiedUsers,
    getUserInfo,
    verifyUser,
    editUserInfo,
    changeUserPassword,
};
