import { LOAD_USER_PROFILE_SUCCESS, LOAD_USER_PROFILE_FAIL,
         GET_FEATURES_SUCCESS, GET_FEATURES_FAIL,
         GET_FEATURES_COUNT_SUCCESS, GET_FEATURES_COUNT_FAIL,
         GET_DECEPTIVE_COUNT_SUCCESS, GET_DECEPTIVE_COUNT_FAIL, 
         GET_T_SENTIMENT_COUNT_SUCCESS, GET_T_SENTIMENT_COUNT_FAIL,
         GET_T_DECEPTIVE_COUNT_SUCCESS, GET_T_DECEPTIVE_COUNT_FAIL,
         GET_NBD_ACCURACY_SUCCESS, GET_NBD_ACCURACY_FAIL,
         GET_RFD_ACCURACY_SUCCESS, GET_RFD_ACCURACY_FAIL,
         GET_SVMD_ACCURACY_SUCCESS, GET_SVMD_ACCURACY_FAIL, GET_DECEPTIVE_ACCURACIES_SUCCESS, GET_USERS_SUCCESS, GET_DATA_COUNTS_SUCCESS   
} from "../actions/types";

const initialState = {
    email: '',
    is_admin: false,
    positive: 0,
    neutral: 0,
    negative: 0,
    fake: 0,
    genuine: 0,
    t_positive: 0,
    t_neutral: 0,
    t_negative: 0,
    t_fake: 0,
    t_genuine: 0,
    nbd_training_accuracy: 0,
    nbd_testing_accuracy: 0,
    rfd_training_accuracy: 0,
    rfd_testing_accuracy: 0,
    svmd_training_accuracy: 0,
    svmd_testing_accuracy: 0,
    users: [],
    training_positive_count:0,
    training_neutral_count:0,
    training_negative_count:0,
    training_fake_count:0, 
    training_genuine_count:0,
    training_count:0, 
    testing_count:0,
    users_positive_count:0, 
    users_neutral_count:0, 
    users_negative_count:0,
    users_fake_count:0, 
    users_genuine_count: 0
};

export default function(state = initialState, action) {
    const { type, payload } = action;
    
    switch(type) {
        case LOAD_USER_PROFILE_SUCCESS:
            return {
                ...state,
                email: payload.email,
                is_admin: payload.is_admin
            }
        case LOAD_USER_PROFILE_FAIL:
            return {
                ...state,
                email: '',
                is_admin: false
            }
        case GET_FEATURES_COUNT_SUCCESS:
            return {
                ...state,
                positive: payload.positive,
                neutral: payload.neutral,
                negative: payload.negative
            }
        case GET_DECEPTIVE_COUNT_SUCCESS:
            return {
                ...state,
                fake: payload.fake,
                genuine: payload.genuine
            }
        case GET_T_SENTIMENT_COUNT_SUCCESS:
            return {
                ...state,
                t_positive: payload.positive,
                t_neutral: payload.neutral,
                t_negative: payload.negative
            }
        case GET_T_DECEPTIVE_COUNT_SUCCESS:
            return {
                ...state,
                t_fake: payload.fake,
                t_genuine: payload.genuine
            }
        case GET_NBD_ACCURACY_SUCCESS:
            return {
                ...state,
                nbd_training_accuracy: payload.nbd_training_accuracy,
                nbd_testing_accuracy: payload.nbd_testing_accuracy,
                users: payload.users
            }
        case GET_RFD_ACCURACY_SUCCESS:
            return {
                ...state,
                rfd_training_accuracy: payload.rfd_training_accuracy,
                rfd_testing_accuracy: payload.rfd_testing_accuracy
            }
        case GET_SVMD_ACCURACY_SUCCESS:
            return {
                ...state,
                svmd_training_accuracy: payload.svmd_training_accuracy,
                svmd_testing_accuracy: payload.svmd_testing_accuracy
            }  
        case GET_DECEPTIVE_ACCURACIES_SUCCESS:
            return {
                ...state,
                nbd_training_accuracy: payload.accuracies.nbd.nbd_training_accuracy,
                nbd_testing_accuracy: payload.accuracies.nbd.nbd_testing_accuracy,
                rfd_training_accuracy: payload.accuracies.rfd.rfd_training_accuracy,
                rfd_testing_accuracy: payload.accuracies.rfd.rfd_testing_accuracy,
                svmd_training_accuracy: payload.accuracies.svmd.svmd_training_accuracy,
                svmd_testing_accuracy: payload.accuracies.svmd.svmd_testing_accuracy
            }
        case GET_USERS_SUCCESS:
            return {
                ...state,
                users: payload.users
            }
        case GET_DATA_COUNTS_SUCCESS:
            return {
                ...state,
                training_positive_count: payload.counts.training.training_positive_count,
                training_neutral_count: payload.counts.training.training_neutral_count,
                training_negative_count: payload.counts.training.training_negative_count,
                training_fake_count: payload.counts.training.training_fake_count,
                training_genuine_count: payload.counts.training.training_genuine_count,
                training_count: payload.counts.training.training_count,
                testing_count: payload.counts.training.testing_count,

                users_positive_count: payload.counts.users_data.users_positive_count,
                users_neutral_count: payload.counts.users_data.users_neutral_count,
                users_negative_count: payload.counts.users_data.users_negative_count,
                users_fake_count: payload.counts.users_data.users_fake_count,
                users_genuine_count: payload.counts.users_data.users_genuine_count,
            }
        default:
            return state
    }
}