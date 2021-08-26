import React, { Fragment} from 'react';
import { useEffect } from 'react';
import { checkAuthenticated } from '../actions/auth';
import Navbar from '../components/Navbar';
import { connect } from 'react-redux';
import { get_deceptive_count, get_nbd_accuracy, get_rfd_accuracy, get_sentiment_count, get_svmd_accuracy, get_t_deceptive_count, get_t_sentiment_count, get_users, load_user } from '../actions/profile';

const Layout = ({ children, checkAuthenticated, load_user, get_sentiment_count, get_deceptive_count, get_t_sentiment_count, get_t_deceptive_count, get_nbd_accuracy, get_rfd_accuracy, get_svmd_accuracy, get_users }) => {

    useEffect(()  => {
        checkAuthenticated();
        load_user();
        // get_sentiment_count();
        // get_deceptive_count();
        // get_t_sentiment_count();
        // get_t_deceptive_count();
        // get_nbd_accuracy();
        // get_rfd_accuracy();
        // get_svmd_accuracy();
    }, []);

    return (
        <Fragment>
            <Navbar />
            { children }
        </Fragment>
    );
}

export default connect(null, { checkAuthenticated, load_user, get_sentiment_count, get_deceptive_count, get_t_sentiment_count, get_t_deceptive_count, get_nbd_accuracy, get_rfd_accuracy, get_svmd_accuracy, get_users })(Layout);

