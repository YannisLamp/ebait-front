import axios from './axiosConfig';
import handleError from './handleError';

import { auctionActions } from '../store/ducks/auctionStore';

const createAuction = async (name, description, ends, firstBid, buyout, categories, country, locationDescription, selectedLat, selectedLng, photos) => {

    const jsonRequest = {
        name: name,
        description: description,
        ends: ends,
        firstBid: firstBid,
        buyPrice: buyout,
        country: country,

        categories: categories,

        location: {
            latitude: selectedLat,
            longitude: selectedLng,
            text: locationDescription
        },
    }

    return axios.post('/auctions', jsonRequest)
        .then(
            response => {
                // After the auction is created, make a request to append all the photos
                // the user has uploaded
                const itemID = response.data.itemID;
                return uploadMultiplePhotos(itemID, photos)
                    .then(response => {
                        return response.data;
                    });
            })
        .catch(error => { handleError(error) });
}


const editAuction = async (itemID, name, description, ends, firstBid, buyout, categories, country, locationDescription, selectedLat, selectedLng, photos, deletedPhotos) => {

    const jsonRequest = {
        name: name,
        description: description,
        ends: ends,
        firstBid: firstBid,
        buyPrice: buyout,
        country: country,

        categories: categories,

        location: {
            latitude: selectedLat,
            longitude: selectedLng,
            text: locationDescription
        },
    }

    return axios.put('/auctions/' + itemID, jsonRequest)
        .then(
            response => {
                // Then delete all the photos that the iser has deleted in the UI
                for (const photo of deletedPhotos) {
                    deleteAuctionPhoto(photo.photoId)
                        .catch(error => { handleError(error) });;
                }

                // After the auction is edited, make a request to append all the new photos
                // the user has uploaded
                return uploadMultiplePhotos(itemID, photos);
            },
        )
        .catch(error => { handleError(error) });
}


const getAllAuctions = (categories, description, lowestPrice, highestPrice, location, order, orderBy, currPage, pageSize) => {

    //params

    const jsonRequest = {
        params: {

            categories: categories,
            description: description,
            lowestPrice: lowestPrice,
            highestPrice: highestPrice,
            location: location,

            //order: orderBy,
            //orderBy: order,

            pageNo: currPage,
            pageSize: pageSize,
        }
    }

    return axios.get('/search/auctions/filters', jsonRequest)
        .then(response => {
            return response.data;
        })
        .catch(error => { handleError(error) });
}

const getRecommendedAuctions = () => {
    return axios.get('/search/auctions/recommend_auctions')
        .then(response => {
            return response.data;
        })
        .catch(error => { handleError(error) });
}

const getAuctionById = (auctionId) => {
    return axios.get('/search/auctions/' + auctionId)
        .then(response => {
            return response.data;
        })
        .catch(error => { handleError(error) });
}

function getActiveAuctions() {
    return axios.get('/search/auctions/active', {
        params: {

            // category: 
            // description: 'substring'

            // gia to currentbid
            // belowPrice:
            // abovePrice:

            // location: location.text

            // orderBy: orderBy,
            // pageNo: currPage,

            // pageSize: pageSize,
            // order: order,
        }
    })
        .then(response => {
            return response.data;
        })
        .catch(error => { handleError(error) });
}

const buyoutAuction = async (id) => {
    return axios.put('/auctions/buyout/' + id)
        .then(response => {
            return response.data;
        })
        .catch(error => { handleError(error) });
}

const placeBid = async (id, amount) => {
    const jsonRequest = {
        amount: amount
    }

    return axios.put('/auctions/add_bid/' + id, jsonRequest)
        .then(response => {
            return response.data;
        })
        .catch(error => { handleError(error) });
}

const deleteAuctionPhoto = async (photoId) => {
    return axios.delete('/auctions/delete_photo/' + photoId, {

    })
        .then(response => {
            return response.data;
        })
        .catch(error => { handleError(error) });
}

const uploadMultiplePhotos = async (auctionId, photos) => {
    const formData = new FormData();

    for (const photo of photos) {
        formData.append('imageFile', photo);
    }

    return axios.post('/auctions/' + auctionId + '/upload_multiple_photos', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
        .then(
            response => {
                return response.data;
            }
        )
        .catch(error => { handleError(error) });
}

const getUserAuctions = async (type) => {
    return axios.get('/auctions', {
        //'created', 'started', 'finished'
        params: {
            type,
        }
    })
        .then(response => {
            return response.data;
        })
        .catch(error => { handleError(error) });
}

const startAuction = async (itemID) => {
    return axios.put('/auctions/start/' + itemID)
        .then(response => {
            return response.data;
        })
        .catch(error => { handleError(error) });
}

const deleteAuction = async (itemID) => {
    return axios.delete('/auctions/' + itemID)
        .then(response => {
            return response.data;
        })
        .catch(error => { handleError(error) });
}

const getRootCategories = async () => {
    return axios.get('/categories/root')
        .then(response => {
            return response.data;
        })
        .catch(error => { handleError(error) });
}


const getChildrenCategories = async (parentId) => {
    return axios.get('/categories/children/' + parentId)
        .then(response => {
            return response.data;
        })
        .catch(error => { handleError(error) });
}


const getAllCats = async (reqs) => {
    return Promise.all(reqs)
        .then(allResp => {
            return allResp;
        })
        .catch(error => { handleError(error) });
}

const getAllAuctionsThunk = (categoryFields, description, lowestPrice, highestPrice, location, order, orderBy, currPage, pageSize) => {
    let categories = [];
    for (let cat of categoryFields) {
        if (cat.selectedValue != "") {
            //categories.push({ name: cat.selectedValue });
            categories.push(cat.selectedValue);
        }
    }

    const jsonRequest = {
        params: {

            categories: categories,

            description: description,
            lowestPrice: lowestPrice,
            highestPrice: highestPrice,
            location: location,

            //order: orderBy,
            //orderBy: order,

            pageNo: currPage,
            pageSize: pageSize,
        }
    }

    return dispatch => {
        dispatch(auctionActions.getAuctionsRequest());
        axios.get('/search/auctions/filters', jsonRequest)
            .then(response => {
                const auctions = response.data.auctions;
                const totalFilteredAuctions = response.data.totalFilteredAuctions;
                dispatch(auctionActions.getAuctionsSuccess(auctions, totalFilteredAuctions));
            })
            .catch(error => { handleError(error) });
    }
}

const changePageThunk = (categories, description, lowestPrice, highestPrice, location, order, orderBy, newPage, pageSize) => {
    return dispatch => {
        dispatch(auctionActions.changeCurrentPage(newPage));
        dispatch(getAllAuctionsThunk(categories, description, lowestPrice, highestPrice, location, order, orderBy, newPage, pageSize));
    }
}

const changePageSizeThunk = (categories, description, lowestPrice, highestPrice, location, order, orderBy, newPageSize) => {
    return dispatch => {
        dispatch(auctionActions.changePageSize(newPageSize));
        dispatch(auctionActions.changeCurrentPage(0));
        dispatch(getAllAuctionsThunk(categories, description, lowestPrice, highestPrice, location, order, orderBy, 0, newPageSize));
    }
}

const getRootCategoriesThunk = () => {
    return dispatch => {
        getRootCategories()
            .then(data => {
                if (data) {
                    dispatch(auctionActions.initCategory({
                        selectedIndex: '',
                        selectedValue: '',
                        allCategories: data,
                    }));
                }
            });
    }
}

const initFromScratchThunk = () => {
    return dispatch => {
        dispatch(getRootCategoriesThunk());
        dispatch(getAllAuctionsThunk([], '', null, null, null, null, null, 0, 10));
        dispatch(auctionActions.removeFilters());
    }
}

const pickCategoryThunk = (catIndex, level, categoryFields, description, lowestPrice, highestPrice, location, order, orderBy, currPage, pageSize) => {

    return dispatch => {
        const cat = categoryFields[level].allCategories[catIndex];
        // Get the categories of the next level
        getChildrenCategories(cat.id)
            .then(data => {
                if (data) {
                    // Change current field value
                    categoryFields[cat.level].selectedIndex = catIndex;
                    categoryFields[cat.level].selectedValue = cat.name;

                    if (data.length > 0) {
                        // We want an extra object to be in the list
                        categoryFields.splice(cat.level + 2);
                        categoryFields[cat.level + 1] = {
                            selectedIndex: '',
                            selectedValue: '',
                            allCategories: data,
                        }
                    }
                    else {
                        categoryFields.splice(cat.level + 1);
                    }

                    dispatch(auctionsApi.getAllAuctionsThunk(categoryFields, description, lowestPrice, highestPrice,
                        location, order, orderBy, currPage, pageSize));

                    dispatch(auctionActions.setCategories(categoryFields));
                }
            });
    }
}

const deleteCategoryThunk = (categoryFields, description, lowestPrice, highestPrice, location, order, orderBy, currPage, pageSize) => {
    return dispatch => {
        if (categoryFields.length === 1) {
            categoryFields[0].selectedIndex = '';
            categoryFields[0].selectedValue = '';
        }
        else {
            categoryFields.pop();
        }

        dispatch(auctionsApi.getAllAuctionsThunk(categoryFields, description, lowestPrice, highestPrice,
            location, order, orderBy, currPage, pageSize));

        dispatch(auctionActions.setCategories(categoryFields));
    }
}

export const auctionsApi = {
    createAuction,
    editAuction,
    getUserAuctions,
    getActiveAuctions,
    getAllAuctions,
    getRecommendedAuctions,
    getAuctionById,
    startAuction,
    deleteAuction,

    placeBid,
    buyoutAuction,

    getRootCategories,
    getChildrenCategories,
    getAllCats,

    getAllAuctionsThunk,
    changePageThunk,
    changePageSizeThunk,
    getRootCategoriesThunk,
    initFromScratchThunk,
    pickCategoryThunk,
    deleteCategoryThunk,
};