import React from 'react';
import { connect } from 'react-redux';
import { login } from '../actions/auth';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import CSRFToken from '../components/CSRFToken';
import { useState } from 'react';
import image from '../positive.jpg';

const Login = ({isAuthenticated, is_admin, login}) => {

    const [formData, setFormData] = useState({
        email:'',
        password:''
    })

    const { email, password } = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    const onSubmit = e => {
        e.preventDefault();

        login(email, password);
    }

    if(isAuthenticated && is_admin)
        return <Redirect to = '/admindashboard' />
    else if(isAuthenticated && is_admin == false)
        return <Redirect to = '/dashboard' />

        return (
            <div className="container my-5">
                <div className="row align-items-center justify-content-center">
                    <div className="col-md-7 col-lg-5">
                        <div className="login-box p-4 p-md-5">
                            <h1 className="text-center"> Sign In</h1>
                            <form onSubmit = {e => onSubmit(e)}>
                                <CSRFToken />
                                <div className="form-group mb-3 email-div" >
                                    <input type="email" value = {email} onChange = {e => onChange(e)} className="form-control email-field" name="email" id="email" placeholder="Email" required/>
                                </div>
                                
                                <div className="mb-3 password-div" >
                                    <input type="password" value = {password} onChange = {e => onChange(e)} minLength = '6' className="form-control password-field" name="password" id="password" placeholder="Password" required/>
                                </div>
                                
                                <div className="form-group mb-3 login-button-div" >
                                    <button type="submit" className="form-control btn btn-primary rounded px-3 login-button-field">Login</button>
                                </div>
                            </form>
                            <p>
                                Create Account? <Link to="/register">Register</Link>
                            </p>
                            
                        </div>
                    </div>   
                </div>
                {/* <div>
                    <img src={image}></img>
                </div> */}
            </div>  
        );
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    is_admin: state.auth.is_admin
}); 

export default connect(mapStateToProps, { login }) (Login);