import Cookies from 'js-cookie';
import axios from 'axios';
import { LOAD_USER_PROFILE_SUCCESS, LOAD_USER_PROFILE_FAIL,
         SEND_DATA_SUCCESS, SEND_DATA_FAIL,
         GET_FEATURES_SUCCESS, GET_FEATURES_FAIL,
         GET_FEATURES_COUNT_SUCCESS, GET_FEATURES_COUNT_FAIL,
         GET_DECEPTIVE_COUNT_SUCCESS, GET_DECEPTIVE_COUNT_FAIL,
         GET_T_SENTIMENT_COUNT_SUCCESS, GET_T_SENTIMENT_COUNT_FAIL,
         GET_T_DECEPTIVE_COUNT_SUCCESS, GET_T_DECEPTIVE_COUNT_FAIL,
         GET_ACTUAL_FEATURES_SUCCESS, GET_ACTUAL_FEATURES_FAIL,
         GET_NBD_ACCURACY_SUCCESS, GET_NBD_ACCURACY_FAIL,
         GET_RFD_ACCURACY_SUCCESS, GET_RFD_ACCURACY_FAIL,
         GET_SVMD_ACCURACY_SUCCESS, GET_SVMD_ACCURACY_FAIL,
         GET_DECEPTIVE_ACCURACIES_SUCCESS, GET_DECEPTIVE_ACCURACIES_FAIL, 
         GET_USERS_SUCCESS, GET_USERS_FAIL, GET_DATA_COUNTS_SUCCESS, GET_DATA_COUNTS_FAIL
} from './types';

export const load_user = () => async dispatch => {
    const config = {
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };

    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/accounts/user`, config);

        if(response.data.error)
        {
            dispatch({
                type:  LOAD_USER_PROFILE_FAIL
            });
        }
        else {
            dispatch({
                type: LOAD_USER_PROFILE_SUCCESS,
                payload: response.data
            });
        }
    } catch (err) {
        dispatch({
            type:  LOAD_USER_PROFILE_FAIL
        })
    }
}

export const send_data = (email, review) => async dispatch => {

    const config = {
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken':  Cookies.get('csrftoken')
        }
    };

    const body = JSON.stringify({'withCredentials':true, email, review });

    console.log(body);
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/accounts/update_user`, body, config);
        console.log(response);

        if(response.data.success)
        {
            dispatch({
                type: SEND_DATA_SUCCESS
            });
            // console.log('a');
            // return <Redirect to='/login' />;
        }
        else {
            
            dispatch({
                type: SEND_DATA_FAIL
            });
        }

    } catch (err) {

        dispatch({
            type: SEND_DATA_FAIL
        });
    }
};

export const get_features = (file_name) => async dispatch => {

    const config = {
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken':  Cookies.get('csrftoken')
        }
    };

    const body = JSON.stringify({'withCredentials':true, "file_name": file_name });

    console.log(body);
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/accounts/training_features`, body, config);
        // console.log(response);
        window.location.reload();
        if(response.data.success)
        {
            dispatch({
                type: GET_FEATURES_SUCCESS
            });
            // console.log('a');
            // return <Redirect to='/login' />;
        }
        else {
            
            dispatch({
                type: GET_FEATURES_FAIL
            });
        }

    } catch (err) {

        dispatch({
            type: GET_FEATURES_FAIL
        });
    }
};


export const get_sentiment_count = () => async dispatch => {

    const config = {
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken':  Cookies.get('csrftoken')
        }
    };

    const body = JSON.stringify({'withCredentials':true});

    console.log(body);
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/accounts/sentiment_count`, body, config);
        console.log(response);
        // window.location.reload();
        if(response.data.success)
        {
            dispatch({
                type: GET_FEATURES_COUNT_SUCCESS,
                payload: response.data
            });
            // console.log('a');
            // return <Redirect to='/login' />;
        }
        else {
            
            dispatch({
                type: GET_FEATURES_COUNT_FAIL
            });
        }

    } catch (err) {

        dispatch({
            type: GET_FEATURES_COUNT_FAIL
        });
    }
};


export const get_deceptive_count = () => async dispatch => {

    const config = {
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken':  Cookies.get('csrftoken')
        }
    };

    const body = JSON.stringify({'withCredentials':true});

    console.log(body);
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/accounts/deceptive_count`, body, config);
        console.log(response);
        // window.location.reload();
        if(response.data.success)
        {
            dispatch({
                type: GET_DECEPTIVE_COUNT_SUCCESS,
                payload: response.data
            });
            // console.log('a');
            // return <Redirect to='/login' />;
        }
        else {
            
            dispatch({
                type: GET_DECEPTIVE_COUNT_FAIL
            });
        }

    } catch (err) {

        dispatch({
            type: GET_DECEPTIVE_COUNT_FAIL
        });
    }
};

export const get_t_features = (file_name) => async dispatch => {

    const config = {
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken':  Cookies.get('csrftoken')
        }
    };

    const body = JSON.stringify({'withCredentials':true, "file_name": file_name });

    console.log(body);
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/accounts/actual_features`, body, config);
        console.log(response);
        window.location.reload();
        if(response.data.success)
        {
            dispatch({
                type: GET_ACTUAL_FEATURES_SUCCESS
            });
            // console.log('a');
            // return <Redirect to='/login' />;
        }
        else {
            
            dispatch({
                type: GET_ACTUAL_FEATURES_FAIL
            });
        }

    } catch (err) {

        dispatch({
            type: GET_ACTUAL_FEATURES_FAIL
        });
    }
};

export const get_t_sentiment_count = () => async dispatch => {

    const config = {
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken':  Cookies.get('csrftoken')
        }
    };

    const body = JSON.stringify({'withCredentials':true});

    console.log(body);
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/accounts/t_sentiment_count`, body, config);
        console.log(response);
        // window.location.reload();
        if(response.data.success)
        {
            dispatch({
                type: GET_T_SENTIMENT_COUNT_SUCCESS,
                payload: response.data
            });
            // console.log('a');
            // return <Redirect to='/login' />;
        }
        else {
            
            dispatch({
                type: GET_T_SENTIMENT_COUNT_FAIL
            });
        }

    } catch (err) {

        dispatch({
            type: GET_T_SENTIMENT_COUNT_FAIL
        });
    }
};

export const get_t_deceptive_count = () => async dispatch => {

    const config = {
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken':  Cookies.get('csrftoken')
        }
    };

    const body = JSON.stringify({'withCredentials':true});

    console.log(body);
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/accounts/t_deceptive_count`, body, config);
        console.log(response);
        // window.location.reload();
        if(response.data.success)
        {
            dispatch({
                type: GET_T_DECEPTIVE_COUNT_SUCCESS,
                payload: response.data
            });
            // console.log('a');
            // return <Redirect to='/login' />;
        }
        else {
            
            dispatch({
                type: GET_T_DECEPTIVE_COUNT_FAIL
            });
        }

    } catch (err) {

        dispatch({
            type: GET_T_DECEPTIVE_COUNT_FAIL
        });
    }
};


export const get_nbd_accuracy = () => async dispatch => {

    const config = {
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken':  Cookies.get('csrftoken')
        }
    };

    const body = JSON.stringify({'withCredentials':true});
    console.log(body);

    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/accounts/nbd_accuracy`, body, config);
        console.log(response);
        // window.location.reload();
        if(response.data.success)
        {
            dispatch({
                type: GET_NBD_ACCURACY_SUCCESS,
                payload: response.data
            });
        }
        else {
            
            dispatch({
                type: GET_NBD_ACCURACY_FAIL
            });
        }

    } catch (err) {

        dispatch({
            type: GET_NBD_ACCURACY_FAIL
        });
    }
};


export const get_rfd_accuracy = () => async dispatch => {

    const config = {
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken':  Cookies.get('csrftoken')
        }
    };

    const body = JSON.stringify({'withCredentials':true});
    console.log(body);

    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/accounts/rfd_accuracy`, body, config);
        console.log(response);
        // window.location.reload();
        if(response.data.success)
        {
            dispatch({
                type: GET_RFD_ACCURACY_SUCCESS,
                payload: response.data
            });
        }
        else {
            
            dispatch({
                type: GET_RFD_ACCURACY_FAIL
            });
        }

    } catch (err) {

        dispatch({
            type: GET_RFD_ACCURACY_FAIL
        });
    }
};

export const get_svmd_accuracy = () => async dispatch => {

    const config = {
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken':  Cookies.get('csrftoken')
        }
    };

    const body = JSON.stringify({'withCredentials':true});

    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/accounts/svmd_accuracy`, body, config);
        console.log(response);
        // window.location.reload();
        if(response.data.success)
        {
            dispatch({
                type: GET_SVMD_ACCURACY_SUCCESS,
                payload: response.data
            });
        }
        else {
            
            dispatch({
                type: GET_SVMD_ACCURACY_FAIL
            });
        }

    } catch (err) {

        dispatch({
            type: GET_SVMD_ACCURACY_FAIL
        });
    }
};

export const get_deceptive_accuracies = () => async dispatch => {

    const config = {
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken':  Cookies.get('csrftoken')
        }
    };

    const body = JSON.stringify({'withCredentials':true});
    
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/accounts/deceptive_accuracies`, body, config);
        console.log(response);

        if(response.data.success)
        {
            dispatch({
                type: GET_DECEPTIVE_ACCURACIES_SUCCESS,
                payload: response.data
            });
        }
        else
        {
            dispatch({
                type: GET_DECEPTIVE_ACCURACIES_FAIL
            })
        }
    }
    catch (err) {
        dispatch({
            type: GET_DECEPTIVE_ACCURACIES_FAIL
        })
    }
};

export const get_users = () => async dispatch => {

    const config = {
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken')
        }
    };

    const body = JSON.stringify({'withCredentials':true});

    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/accounts/users`, body, config);
        console.log(response);
        
        if(response.data.success)
        {
            dispatch({
                type: GET_USERS_SUCCESS,
                payload: response.data
            });
        }
        else {
            dispatch({
                type: GET_USERS_FAIL
            });
        }
    }
    catch (err)
    {
        dispatch({
            type: GET_USERS_FAIL
        })
    }
};


export const get_data_counts = () => async dispatch => {

    const config = {
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken')
        }
    };

    const body = JSON.stringify({'withCredentials':true});

    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/accounts/data_counts`, body, config);
        console.log(response);
        
        if(response.data.success)
        {
            dispatch({
                type: GET_DATA_COUNTS_SUCCESS,
                payload: response.data
            });
        }
        else {
            dispatch({
                type: GET_DATA_COUNTS_FAIL
            });
        }
    }
    catch (err)
    {
        dispatch({
            type: GET_DATA_COUNTS_FAIL
        })
    }
};