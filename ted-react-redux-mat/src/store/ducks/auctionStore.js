// Action types
const auctionTypes = {
    GET_AUCTIONS_REQUEST: 'ebait/auction/GET_AUCTIONS_REQUEST',
    GET_AUCTIONS_SUCCESS: 'ebait/auction/GET_AUCTIONS_SUCCESS',

    EMPTY_CATEGORIES: 'ebait/auction/EMPTY_CATEGORIES',
    ALTER_CATEGORIES: 'ebait/auction/ALTER_CATEGORIES',

    ADD_FILTERS: 'ebait/auction/ADD_FILTERS',
    UPDATE_FILTERS: 'ebait/auction/UPDATE_FILTERS',
    REMOVE_FILTERS: 'ebait/auction/REMOVE_FILTERS',
}


// Action creators
export const auctionActions = {
    getAuctionsRequest,
    getAuctionsSuccess,

    updateFilters,
    addFilters,
    removeFilters,
}


function getAuctionsRequest() {
    return { type: auctionTypes.GET_AUCTIONS_REQUEST }
}

function getAuctionsSuccess(auctions, totalFilteredAuctions) {
    return { type: auctionTypes.GET_AUCTIONS_SUCCESS, auctions, totalFilteredAuctions }
}

function updateFilters(description, lowestPrice, highestPrice, location) {
    return { type: auctionTypes.UPDATE_FILTERS, description, lowestPrice, highestPrice, location }
}

function addFilters(auctions) {
    return { type: auctionTypes.ADD_FILTERS, auctions }
}

function removeFilters() {
    return { type: auctionTypes.REMOVE_FILTERS }
}



// Reducer Initialization
const initialState = {
    auctions: [], totalAuctions: 0, isLoading: true,
    description: '', lowestPrice: null, highestPrice: null, location: '', showFilters: false
};
// Reducer
export default function reducer(state = initialState, action) {
    //const { showFilters } = state;

    switch (action.type) {
        case auctionTypes.GET_AUCTIONS_REQUEST:
            return {
                ...state,

                isLoading: true,
            };
        case auctionTypes.GET_AUCTIONS_SUCCESS:
            return {
                ...state,

                auctions: action.auctions,
                totalAuctions: action.totalFilteredAuctions,
                isLoading: false,
            };
        case auctionTypes.UPDATE_FILTERS:
            return {
                ...state,

                description: action.description,
                lowestPrice: action.lowestPrice,
                highestPrice: action.highestPrice,
                location: action.location,
            };
        case auctionTypes.ADD_FILTERS:
            return {
                ...state,
                showFilters: true
            };
        case auctionTypes.REMOVE_FILTERS:
            return {
                ...state,

                description: '',
                lowestPrice: null,
                highestPrice: null,
                location: '',
                showFilters: false
            };

        default:
            return state
    }
}