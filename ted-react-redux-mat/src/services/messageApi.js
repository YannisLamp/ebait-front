import axios from './axiosConfig';
import handleError from './handleError';

import { messageActions } from '../store/ducks/messageStore';

const getAllContacts = async () => {
    return axios.get('/messages/allcontacts')
        .then(response => {
            return response.data;
        })
        .catch(error => { handleError(error) });
}

const getNotifications = async () => {
    return axios.get('/messages/notifs', {})
    .then(
        response => {
            return response.data;
        }
    )
    .catch(error => { handleError(error) });
}
 
const sendMessage = async (userId, subject, message) => {
    const jsonRequest = {
        userId,
        subject,
        message
    }

    return axios.post('/messages', jsonRequest)
        .catch(error => { handleError(error) });
}

const getInboxAll = async () => {
    return axios.get('/messages/inbox/all')
        .then(
            response => {
                return response.data;
            }
        )
        .catch(error => { handleError(error) });
}

const getInboxFrom = async (userId) => {
    return axios.get('/messages/inbox/' + userId)
        .then(
            response => {
                return response.data;
            }
        )
        .catch(error => { handleError(error) });
}

const getSentTo = async (userId) => {
    return axios.get('/messages/sent/' + userId)
        .then(
            response => {
                return response.data;
            }
        )
        .catch(error => { handleError(error) });
}

const getSentAll = async () => {
    return axios.get('/messages/sent/all')
        .then(
            response => {
                return response.data;
            }
        )
        .catch(error => { handleError(error) });
}


const deleteMessage = async (messageId) => {
    return axios.delete('/messages/' + messageId, {})
        .then(
            response => {
                return response.data;
            }
        )
        .catch(error => { handleError(error) });
}

const markAsReadMessage = async (messageId) => {
    return axios.put('/messages/' + messageId, {})
        .then(
            response => {
                return response.data;
            }
        )
        .catch(error => { handleError(error) });
}

const initInboxThunk = () => {
    return dispatch => {
        // Init contacts
        dispatch(messageActions.getContactsRequest());
        getAllContacts()
            .then(data => {
                dispatch(messageActions.getContactsSuccess(data));
            });

        // Init notifications
        getNotifications()
            .then(data => {
                console.log(data);
            })

        // Init inbox
        getInboxAll()
            .then(data => {
                console.log(data);
            })
    }
}

const refreshInboxThunk = () => {
    return dispatch => {
        // Refresh notifications
        getNotifications()
            .then(data => {
                console.log(data);
            })

        // If there are new notifications, then fetch new stuff
        // Refresh contacts
        dispatch(messageActions.getContactsRequest());
        getAllContacts()
            .then(data => {
                dispatch(messageActions.getContactsSuccess(data));
            });

        // Refresh inbox
        getInboxAll()
            .then(data => {
                console.log(data);
            })
    }
}

const getSentThunk = () => {
    return dispatch => {
        getSentAll()
            .then(data => {

            });

    }
}

export const messageApi = {
    getAllContacts,
    getNotifications,

    sendMessage,
    getInboxFrom,
    getSentTo,

    deleteMessage,

    initInboxThunk,
    refreshInboxThunk,
    getSentThunk,
};