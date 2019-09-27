import store from '../store';
import { alertActions } from '../store/ducks/alertStore';
import { history } from '../utils';

export default function handleError(error) {
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
         console.log(error.response.data);
        // console.log(error.response.status);
        // console.log(error.response.headers);

        // If error was 403 Forbidden, then user is not authorized, or jwt expired
        // Auto logout 
        if (error.response.status === 403) {
            store.dispatch(alertActions.error('Forbidden, Logging out'));
            history.push('/login');
        }
        else {
            store.dispatch(alertActions.error(error.response.data.message));
        }
    }
    else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        store.dispatch(alertActions.error('No response, maybe server is down'));
        console.log(error.request);
    }
    else {
        // Something happened in setting up the request that triggered an Error
        store.dispatch(alertActions.error('Error', error.message));
        //console.log('Error', error.message);
    }
    //console.log(error.config);
}
