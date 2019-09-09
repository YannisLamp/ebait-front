import axios from './axiosConfig';
import handleError from './handleError';


const getAllContacts = async () => {
    return axios.get('/messages/allcontacts')
        .then(response => {
            return response.data;
        })
        .catch(error => { handleError(error) });
}


const sendMessage = async (userId, message) => {
    const jsonRequest = {
        userId,
        message
    }

    return axios.post('/messages', jsonRequest)
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


const deleteMessage = async (messageId) => {
    return axios.delete('/messages/' + messageId, {})
        .then(
            response => {
                return response.data;
            }
        )
        .catch(error => { handleError(error) });
}

export const messageApi = {
    getAllContacts,

    sendMessage,
    getInboxFrom,
    getSentTo,

    deleteMessage,
};