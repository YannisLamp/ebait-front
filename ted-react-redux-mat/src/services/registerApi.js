import axios from './axiosConfig';

import { loginApi } from './loginApi';
import { userActions } from '../store/ducks/userStore';

import handleError from './handleError';

const registerThunk = (username, password, firstName, lastName, email, phoneNumber, country, address, afm) => {
    return dispatch => {
        dispatch(userActions.registerRequest({ username }));

        const jsonRequest = {
            username,
            password,
            firstName,
            lastName,
            email,
            phoneNumber,
            country,
            address,
            afm
        }

        const user = {
            username,
            password
        }

        axios.post('/register', jsonRequest)
            .then(
                response => {
                    // console.log(response.headers);
                    dispatch(userActions.registerSuccess(user));

                    // If register was a success, then log him in (redirection will take place after login)
                    dispatch(loginApi.loginThunk(username, password));
                }
            )
            .catch(error => {
                dispatch(userActions.registerFailure(error));
                handleError(error);

                // let errorMsg = '';
                // for (let currError of error.response.data.errors) {
                //     errorMsg += currError.defaultMessage + '\n';
                // }
                // dispatch(alertActions.error(errorMsg));

            });

    };
}


const checkUsernameExists = (username) => {
    return axios.post('/exists', { username })
        .then(
            response => {
                return response.data;
            }
        )
        .catch(error => {handleError(error)});
}

export const registerApi = {
    registerThunk,
    checkUsernameExists
};