import axios from './axiosConfig';
import handleError from './handleError';

export const messageApi = {
    getAllContacts,

    sendMessage,
    getInboxFrom,
    getSentTo,

    deleteMessage,
};


function getAllContacts() {
    return axios.get('/messages/allcontacts')
        .then(response => {
            return response.data;
        })
        .catch(error => { handleError(error) });
}


function sendMessage(userId, message) {

    const jsonRequest = {
        userId,
        message
    }

    return axios.post('/messages', jsonRequest)
        .catch(error => { handleError(error) });
}


function getInboxFrom(userId) {
    return axios.get('/messages/inbox/' + userId)
        .then(
            response => {
                return response.data;
            }
        )
        .catch(error => { handleError(error) });
}


function getSentTo(userId) {
    return axios.get('/messages/sent/' + userId)
        .then(
            response => {
                return response.data;
            }
        )
        .catch(error => { handleError(error) });

}


function deleteMessage(messageId) {
    return axios.delete('/messages/' + messageId, {})
        .then(
            response => {
                return response.data;
            }
        )
        .catch(error => { handleError(error) });
}

