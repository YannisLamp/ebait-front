// Action types
const messageTypes = {
    GET_CONTACTS_REQUEST: 'ebait/message/GET_CONTACTS_REQUEST',
    GET_CONTACTS_SUCCESS: 'ebait/message/GET_CONTACTS_SUCCESS',

    SELECT_CONTACT: 'ebait/message/SELECT_CONTACT',
    SELECT_TAB: 'ebait/message/SELECT_TAB',

    GET_ALL_INBOX_REQUEST: 'ebait/message/GET_ALL_INBOX_REQUEST',
    GET_ALL_INBOX_SUCCESS: 'ebait/message/GET_ALL_INBOX_SUCCESS',

    GET_ALL_SENT_REQUEST: 'ebait/message/GET_ALL_SENT_REQUEST',
    GET_ALL_SENT_SUCCESS: 'ebait/message/GET_ALL_SENT_SUCCESS',

    GET_NOTIFICATIONS: 'ebait/message/GET_NOTIFICATIONS',

    CLEAR_STORE: 'ebait/message/CLEAR_STORE',
}


// Action creators
export const messageActions = {
    getContactsRequest,
    getContactsSuccess,
    selectContact,

    selectTab,

    getAllInboxRequest,
    getAllInboxSuccess,

    getAllSentRequest,
    getAllSentSuccess,

    getNotifications,

    clearStore,
}


function getContactsRequest() {
    return { type: messageTypes.GET_CONTACTS_REQUEST }
}

function getContactsSuccess(contacts) {
    return { type: messageTypes.GET_CONTACTS_SUCCESS, contacts }
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

function getAllSentRequest() {
    return { type: messageTypes.GET_ALL_SENT_REQUEST }
}

function getAllSentSuccess(sent) {
    return { type: messageTypes.GET_ALL_SENT_SUCCESS, sent }
}

function getNotifications(notifications) {
    return { type: messageTypes.GET_NOTIFICATIONS, notifications }
}

function clearStore() {
    return { type: messageTypes.CLEAR_STORE }
}



// Reducer Initialization
const initialState = {
    contacts: [],
    selectedContact: null,
    isLoadingContacts: false,

    notifications: 0,
    tabValue: 0,

    inbox: [],
    sent: [],
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

                inbox : action.inbox,
                isLoadingInbox: false,
            };
        case messageTypes.GET_ALL_SENT_REQUEST:
            return {
                ...state,

                
            };
        case messageTypes.GET_ALL_SENT_SUCCESS:
            return {
                ...state,

                sent: action.sent
            };
        case messageTypes.GET_NOTIFICATIONS:
            return {
                ...state,

                notifications: action.notifications
            };
        case messageTypes.CLEAR_STORE:
            return {
                ...initialState
            };
        default:
            return state
    }
}