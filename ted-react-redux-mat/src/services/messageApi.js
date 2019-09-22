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

const refreshMessagesThunk = () => {
    return dispatch => {
        // get contacts
        dispatch(messageActions.getContactsRequest());
        getAllContacts()
            .then(data => {
                const selectedContact = data.length > 0 ? data[0] : null
                dispatch(messageActions.getContactsSuccess(data, selectedContact));
            });

        // get inbox

    }
}

export const messageApi = {
    getAllContacts,
    getNotifications,

    sendMessage,
    getInboxFrom,
    getSentTo,

    deleteMessage,

    refreshMessagesThunk,
};