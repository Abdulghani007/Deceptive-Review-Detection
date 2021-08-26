import React from 'react';
import { Link } from 'react-router-dom';

const ForbiddenMessage = () => {
    return (
        <div className = 'container'>
            <div className = 'mt-5 p-5 bg-white rounded-3'>
                <h1 className = 'display-4 fw-bold'>403 Forbidden</h1>
                <p>
                    You do not have access to this page please login and try again.
                </p>
                <hr className = 'my-4' />
                <p>Click the button to login and get started.</p>
                <Link className = 'btn btn-primary fw-bold' exact to='/login'>Login</Link>
            </div>
        </div>
    );
};

export default ForbiddenMessage;