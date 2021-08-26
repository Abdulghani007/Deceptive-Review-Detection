import { REGISTER_SUCCESS, REGISTER_FAIL,
         LOGIN_SUCCESS, LOGIN_FAIL,
         LOGOUT_SUCCESS, LOGOUT_FAIL,
         AUTHENTICATED_SUCCESS, AUTHENTICATED_FAIL
} from "../actions/types";

const initialState = {
    isAuthenticated: null,
    // email: '',
    is_admin: false
};

export default function(state = initialState, action){
    const { type, payload } = action;

    switch(type){
        case AUTHENTICATED_SUCCESS:
            return {
                ...state,
                isAuthenticated: payload[0],
                is_admin: payload[1]
            } 
        case AUTHENTICATED_FAIL:
            return {
                ...state,
                isAuthenticated: payload
            }
        case REGISTER_SUCCESS:
            return {
                ...state,
                isAuthenticated: false
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                // email: payload[0],
                is_admin: payload[1]
            }
        case LOGOUT_SUCCESS:
            return {
                ...state,
                isAuthenticated: false,
                // email: '',
                is_admin: false
            }
        case REGISTER_FAIL:
        case LOGIN_FAIL:
        case LOGOUT_FAIL:
            return state
        default: 
            return state
    }
}