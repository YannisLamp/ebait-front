// Action types
const messageTypes = {
    GET_CONTACTS_REQUEST: 'ebait/message/GET_CONTACTS_REQUEST',
    GET_CONTACTS_SUCCESS: 'ebait/message/GET_CONTACTS_SUCCESS',

    GET_ALL_INBOX_REQUEST: 'ebait/message/GET_ALL_INBOX_REQUEST',
    GET_ALL_INBOX_SUCCESS: 'ebait/message/GET_ALL_INBOX_SUCCESS',

    GET_NOTIFICATIONS: 'ebait/message/GET_NOTIFICATIONS',
}


// Action creators
export const messageActions = {
    getContactsRequest,
    getContactsSuccess,

    getAllInboxRequest,
    getAllInboxSuccess,

    getNotifications,
}


function getContactsRequest() {
    return { type: messageTypes.GET_CONTACTS_REQUEST }
}

function getContactsSuccess(contacts, selectedContact) {
    return { type: messageTypes.GET_CONTACTS_SUCCESS, contacts, selectedContact }
}

function getAllInboxRequest() {
    return { type: messageTypes.GET_ALL_INBOX_REQUEST }
}

function getAllInboxSuccess(inbox) {
    return { type: messageTypes.GET_ALL_INBOX_SUCCESS, inbox}
}

function getNotifications(notifications) {
    return { type: messageTypes.GET_NOTIFICATIONS, notifications }
}



// Reducer Initialization
const initialState = {
    contacts: [],
    selectedContact: null, 
    isLoadingContacts: false,
    
    notifications: 0,
    //tabValue: 0,
};
// Reducer
export default function reducer(state = initialState, action) {
    //const { showFilters } = state;

    switch (action.type) {
        case messageTypes.GET_CONTACTS_REQUEST:
            return {
                ...state,

                isLoadingContacts: true,
            };
        case messageTypes.GET_CONTACTS_SUCCESS:
            return {
                ...state,

                contacts: action.contacts,
                selectedContact: action.selectedContact, 
                isLoadingContacts: false,
            };
        case messageTypes.GET_NOTIFICATIONS:
            return {
                ...state,

                notifications: action.notifications
            };
        default:
            return state
    }
}