// Action types
const messageTypes = {
    GET_CONTACTS_REQUEST: 'ebait/message/GET_CONTACTS_REQUEST',
    GET_CONTACTS_SUCCESS: 'ebait/message/GET_CONTACTS_SUCCESS',

    SELECT_CONTACT: 'ebait/message/SELECT_CONTACT',
    SELECT_TAB: 'ebait/message/SELECT_TAB',

    GET_ALL_INBOX_REQUEST: 'ebait/message/GET_ALL_INBOX_REQUEST',
    GET_ALL_INBOX_SUCCESS: 'ebait/message/GET_ALL_INBOX_SUCCESS',

    GET_NOTIFICATIONS: 'ebait/message/GET_NOTIFICATIONS',
}


// Action creators
export const messageActions = {
    getContactsRequest,
    getContactsSuccess,
    selectContact,

    selectTab,

    getAllInboxRequest,
    getAllInboxSuccess,

    getNotifications,
}


function getContactsRequest() {
    return { type: messageTypes.GET_CONTACTS_REQUEST }
}

function getContactsSuccess(contacts) {
    return { type: messageTypes.GET_CONTACTS_SUCCESS, contacts}
}

function selectContact(selectedContact) {
    return { type: messageTypes.SELECT_CONTACT, selectedContact }
}

function selectTab(selectedTab) {
    return { type: messageTypes.SELECT_TAB, selectedTab }
}

function getAllInboxRequest() {
    return { type: messageTypes.GET_ALL_INBOX_REQUEST }
}

function getAllInboxSuccess(inbox) {
    return { type: messageTypes.GET_ALL_INBOX_SUCCESS, inbox }
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
    tabValue: 0,
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
                isLoadingContacts: false,
            };
        case messageTypes.SELECT_CONTACT:
            return {
                ...state,

                selectedContact: action.selectedContact,
            };
        case messageTypes.SELECT_TAB:
            return {
                ...state,

                tabValue: action.selectedTab,
            };
        case messageTypes.GET_ALL_INBOX_REQUEST:
            return {
                ...state,

                isLoadingInbox: true,
            };
        case messageTypes.GET_ALL_INBOX_SUCCESS:
            return {
                ...state,

                isLoadingInbox: false,
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