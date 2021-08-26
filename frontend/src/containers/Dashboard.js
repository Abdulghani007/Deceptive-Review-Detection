import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { send_data } from '../actions/profile';
import { useState } from 'react';
import ForbiddenMessage from './ForbiddenMessage';

const Dashboard = ({isAuthenticated, email, send_data}) => {
    const [formData, setformData] = useState({
        Email: email,
        review: ''
    });

    const { Email, review } = formData;
    const onChange = e => setformData({ ...formData, [e.target.name]: e.target.value });
    
    const onSubmit = e => {
        e.preventDefault();

        console.log(email);

        send_data(email, review);
    }

    if(isAuthenticated)
        return (
            <div className="container">
                <div className='row align-items-center justify-content-center'>
                    <div className = 'col-md-7 col-lg-5'>
                    <div className = 'mt-5 p-5 bg-white rounded-3'>
                        <form onSubmit={e => onSubmit(e)}>
                        <input type='email' className='w-75' value={email} name="email" disabled />
                        <div className="mb-3">
                            <label for="review" class="form-label">Enter Review</label>
                            <textarea onChange = {e => onChange(e)} className="form-control review-field" name="review" id="review" rows="3"></textarea>
                        </div>
                        <button type='submit' className='btn btn-primary' name='review_submit'>Submit</button>
                        </form>  
                    </div>
                    </div>
                </div>
            </div>
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
    email: state.profile.email,
}); 

export default connect(mapStateToProps, { send_data })(Dashboard);