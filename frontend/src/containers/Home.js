import React from 'react';
import { Link } from 'react-router-dom';
const Home = () => {
    return (
        <div className = 'container'>
            <div className = 'mt-5 p-5 bg-white rounded-3'>
                <h1 className = 'display-4 fw-bold'>Welcome to Deceptive Review Detection System</h1>
                <p>
                    This is a wonderful application with Admin and User.
                </p>
                <hr className = 'my-4' />
                <p>Click the button to login and get started</p>
                <Link className = 'btn btn-primary fw-bold' exact to='/login'>Login</Link>
            </div>
        </div>
    );
}

export default Home;