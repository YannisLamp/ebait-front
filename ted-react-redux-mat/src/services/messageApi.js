import axios from './axiosConfig';
import handleError from './handleError';
import { history } from '../utils';

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

//return axios.put('/messages/', {id: messageId})
const markAsReadMessage = async (messageId) => {
    return axios.put('/messages/' + messageId, {})
        .then(
            response => {
                return response.data;
            }
        )
        .catch(error => { handleError(error) });
}

const refreshInboxThunk = () => {
    return dispatch => {
        // Refresh notifications
        getNotifications()
            .then(data => {
                if (data !== null) {
                    dispatch(messageActions.getNotifications(data));
                }
            })

        // Refresh contacts
        dispatch(messageActions.getContactsRequest());
        getAllContacts()
            .then(data => {
                dispatch(messageActions.getContactsSuccess(data));
            });

        // Refresh inbox
        dispatch(messageActions.getAllInboxRequest());
        getInboxAll()
            .then(data => {
                if (data) {
                    dispatch(messageActions.getAllInboxSuccess(data));
                }
            })
    }
}

const getSentThunk = () => {
    return dispatch => {
        dispatch(messageActions.getAllSentRequest());
        getSentAll()
            .then(data => {
                if (data) {
                    dispatch(messageActions.getAllSentSuccess(data));
                }
            });
    }
}

const notificationsClickThunk = () => {
    return dispatch => {
        dispatch(messageActions.selectTab(0));
        dispatch(messageActions.selectContact(null));
        history.push("/messages");
    }
}

export const messageApi = {
    getAllContacts,
    getNotifications,

    sendMessage,
    getInboxFrom,
    getSentTo,

    markAsReadMessage,
    deleteMessage,

    refreshInboxThunk,
    getSentThunk,
    notificationsClickThunk,
};