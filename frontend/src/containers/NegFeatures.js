import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import image from '../negative.jpg'
import Features from './Features';
import ForbiddenMessage from './ForbiddenMessage';

const NegFeatures = ({isAuthenticated, is_admin, email}) => {
    if(isAuthenticated && is_admin)
        return (
            // <div className="container">
            //     <div className="row">
            //         <div className="d-flex flex-column align-items-center justify-content-center">
            //             <div>
            //                 <h1>Negative Features</h1>
            //             </div>
            //             <div>
            //                 <img className="training_features" src={image + '?nocache=' + Date.now()}></img>
            //             </div>
            //         </div>
            //     </div>
            // </div>
            <Features imageSrc={image} headingText="Negative Features" />
        );
    else{
        return (
            // <div className = 'container'>
            //     <div className = 'mt-5 p-5 bg-white rounded-3'>
            //         <h1 className = 'display-4 fw-bold'>403 Forbidden</h1>
            //         <p>
            //             You do not have access to this page please login and try again.
            //         </p>
            //         <hr className = 'my-4' />
            //         <p>Click the button to login and get started.</p>
            //         <Link className = 'btn btn-primary fw-bold' exact to='/login'>Login</Link>
            //     </div>
            // </div>
            <ForbiddenMessage />
        );
    }
}
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    is_admin: state.auth.is_admin,
    email: state.profile.email
}); 

export default connect(mapStateToProps, {})(NegFeatures);