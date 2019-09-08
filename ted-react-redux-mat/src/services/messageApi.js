import axios from './axiosConfig';
import handleError from './handleError';

export const messageApi = {
    getAllContacts,

    sendMessage,
    //getInboxMessages,
    //getSentMessages,

    //deleteMessage,
};


function getAllContacts() {
    return axios.get('/messages/allcontacts')
        .then(response => {
            return response.data;
        })
        .catch(error => {handleError(error)});
}


function sendMessage(userId, message) {

    const jsonRequest = {
        userId,
        message
    }

    return axios.post('/messages', jsonRequest)
        .catch(error => {handleError(error)});
}



//GET '/messages/inbox/{userId}'


//GET '/messages/sent/{userId}'

//DELETE
function deleteAuctionPhoto(photoId) {
    return axios.delete('/auctions/delete_photo/' + photoId, {

    })
        .then(response => {
            return response.data;
        })
        .catch(error => {handleError(error)});
}
 
