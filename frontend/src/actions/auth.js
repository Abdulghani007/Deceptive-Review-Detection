import axios from 'axios';
import Cookies from 'js-cookie';
import { REGISTER_SUCCESS, REGISTER_FAIL,
         LOGIN_SUCCESS, LOGIN_FAIL,
         LOGOUT_SUCCESS, LOGOUT_FAIL,
         AUTHENTICATED_SUCCESS, AUTHENTICATED_FAIL
} from './types';
import { load_user } from './profile';
import { Redirect } from 'react-router';

export const checkAuthenticated = () => async dispatch => {

    const config = {
         headers: {
             'Accept':'application/json',
             'Content-Type': 'application/json'
         }
    };

    const response = await axios.get(`${process.env.REACT_APP_API_URL}/accounts/authenticated`, config);
    console.log(response);

    try {
        if(response.data.error || response.data.isAuthenticated === 'error')
        {
            dispatch({
                type: AUTHENTICATED_FAIL,
                payload: false
            });
        }
        else if(response.data.isAuthenticated === 'success')
        {
            dispatch({
                type: AUTHENTICATED_SUCCESS,
                payload: [true, response.data.is_admin]
            });
        }
        else
        {
            dispatch({
                type: AUTHENTICATED_FAIL,
                payload: false
            });
        }
    } catch (err) {
        dispatch({
            type: AUTHENTICATED_FAIL,
            payload: false
        });
    }
}

export const register = (email, password, re_password) => async dispatch => {

    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken':  Cookies.get('csrftoken')
        }
    };

    const body = JSON.stringify({email, password, re_password});

    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/accounts/register`, body, config);
        console.log(response);
        if(response.data.error)
        {
            dispatch({
                type: REGISTER_FAIL
            });
        }
        else{
            dispatch({
                type: REGISTER_SUCCESS
            });
        }
    } catch(err){
        dispatch({
            type: REGISTER_FAIL
        });
    }

};

export const login = (email, password) => async dispatch => {

    const config = {
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken':  Cookies.get('csrftoken')
        }
    };

    const body = JSON.stringify({ email, password });

    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/accounts/login`, body, config);
        console.log(response);
        if(response.data.success)
        {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: [ response.data.email, response.data.is_admin ]

            });
            
            dispatch(load_user());
        }
        else{
            dispatch({
                type: LOGIN_FAIL
            });
        }

    } catch(err){
        dispatch({
            type: LOGIN_FAIL
        });
    }

};

export const logout = () => async dispatch => {

    const config = {
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken':  Cookies.get('csrftoken')
        }
    };

    const body = JSON.stringify({ 
        'withCredentials': true
     });

    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/accounts/logout`, body, config);
        console.log(response);
        if(response.data.success)
        {
            dispatch({
                type: LOGOUT_SUCCESS
            });
            // console.log('a');
            // return <Redirect to='/login' />;
        }
        else{
            dispatch({
                type: LOGOUT_FAIL
            });
        }

    } catch(err){
        dispatch({
            type: LOGOUT_FAIL
        });
    }

};

