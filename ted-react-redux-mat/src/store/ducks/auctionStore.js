// Action types
const auctionTypes = {
    GET_AUCTIONS_REQUEST: 'ebait/auction/GET_AUCTIONS_REQUEST',
    GET_AUCTIONS_SUCCESS: 'ebait/auction/GET_AUCTIONS_SUCCESS',

    ADD_FILTERS: 'ebait/auction/ADD_FILTERS',
    REMOVE_FILTERS: 'ebait/auction/REMOVE_FILTERS',

    UPDATE_FILTERS: 'ebait/auction/UPDATE_FILTERS',

    CHANGE_PAGE_SIZE: 'ebait/auction/CHANGE_PAGE_SIZE',
    CHANGE_CURRENT_PAGE: 'ebait/auction/CHANGE_CURRENT_PAGE',

    INIT_CATEGORY: 'ebait/auction/INIT_CATEGORY',
    ADD_CATEGORY: 'ebait/auction/ADD_CATEGORY',
    REMOVE_CATEGORY: 'ebait/auction/REMOVE_CATEGORY',
}


// Action creators
export const auctionActions = {
    getAuctionsRequest,
    getAuctionsSuccess,

    addFilters,
    removeFilters,
    updateFilters,

    changePageSize,
    changeCurrentPage,

    initCategory,
    addCategory,
    removeCategory,
}


function getAuctionsRequest() {
    return { type: auctionTypes.GET_AUCTIONS_REQUEST }
}

function getAuctionsSuccess(auctions, totalFilteredAuctions) {
    return { type: auctionTypes.GET_AUCTIONS_SUCCESS, auctions, totalFilteredAuctions }
}


function addFilters(auctions) {
    return { type: auctionTypes.ADD_FILTERS, auctions }
}

function removeFilters() {
    return { type: auctionTypes.REMOVE_FILTERS }
}

function updateFilters({ description, lowestPrice, highestPrice, location }) {
    return { type: auctionTypes.UPDATE_FILTERS, description, lowestPrice, highestPrice, location }
}

function changePageSize(pageSize) {
    return { type: auctionTypes.CHANGE_PAGE_SIZE, pageSize }
}

function changeCurrentPage(currPage) {
    return { type: auctionTypes.CHANGE_CURRENT_PAGE, currPage }
}

function initCategory(category) {
    return { type: auctionTypes.INIT_CATEGORY, category }
}

function addCategory(category) {
    return { type: auctionTypes.ADD_CATEGORY, category }
}

function removeCategory() {
    return { type: auctionTypes.REMOVE_CATEGORY }
}



// Reducer Initialization
const initialState = {
    auctions: [], totalAuctions: 0, isLoading: true, pageSize: 10, currPage: 0,
    description: null, lowestPrice: null, highestPrice: null, location: null, showFilters: false,
    categoryFields: [{
        selectedIndex: '',
        selectedValue: '',
        allCategories: [],
    }],

};
// Reducer
export default function reducer(state = initialState, action) {
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

                description: action.description || action.description === '' ? action.description : state.description,
                lowestPrice: action.lowestPrice || action.lowestPrice === '' ? action.lowestPrice : state.lowestPrice,
                highestPrice: action.highestPrice || action.highestPrice === '' ? action.highestPrice : state.highestPrice,
                location: action.location || action.location === '' ? action.location : state.location,
            };
        case auctionTypes.ADD_FILTERS:
            return {
                ...state,
                showFilters: true
            };
        case auctionTypes.REMOVE_FILTERS:
            const allCategories = state.categories[0].allCategories;
            return {
                ...state,

                description: '',
                lowestPrice: null,
                highestPrice: null,
                location: '',
                categoryFields: [{
                    allCategories: allCategories,
                    selectedIndex: '',
                    selectedValue: '',
                }],
                showFilters: false
            };
        case auctionTypes.INIT_CATEGORY:
            return {
                ...state,

                categoryFields: [action.category],
            };
        case auctionTypes.ADD_CATEGORY:
            return {
                ...state,


            };
        case auctionTypes.REMOVE_CATEGORY:
            return {
                ...state,


            };
        case auctionTypes.CHANGE_PAGE_SIZE:
            return {
                ...state,

                pageSize: action.pageSize,
            };
        case auctionTypes.CHANGE_CURRENT_PAGE:
            return {
                ...state,

                currPage: action.currPage,
            };
        default:
            return state
    }
}