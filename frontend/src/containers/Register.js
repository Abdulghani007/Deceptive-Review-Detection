import React from 'react';
import { register } from '../actions/auth';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import CSRFToken from '../components/CSRFToken';

const Register = ({ isAuthenticated, is_admin, register }) => {

    const [formData, setformData] = useState({
        email:'',
        password:'',
        re_password:''
    });

    const [accountCreated, setaccountCreated] = useState(false);
    const { email, password, re_password } = formData;

    const onChange = e => setformData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();

        if(password === re_password)
        {
            register(email, password, re_password);
            setaccountCreated(true);
        }

    };

    if(isAuthenticated && is_admin)
        return <Redirect to = '/admindashboard' />
    else if(isAuthenticated && is_admin == false)
        return <Redirect to='/dashboard' />;
    else if(accountCreated)
        return <Redirect to='/login' />;

    return (
        <div className="container my-5">
            <div className="row align-items-center justify-content-center">
                <div className="col-md-7 col-lg-5">
                    <div className="register-box p-4 p-md-5">
                        <h1 className="text-center"> Sign Up</h1>
                        <form onSubmit = {e => onSubmit(e)}>
                            <CSRFToken />
                            <div className="form-group mb-3 email-div" >
                                <input type="email" value = {email} onChange = {e => onChange(e)} className="form-control email-field" name="email" id="email" placeholder="Email" required/>
                            </div>
                            
                            <div className="mb-3 password-div" >
                                <input type="password" value = {password} onChange = {e => onChange(e)} minLength = '6' className="form-control password-field" name="password" id="password" placeholder="Password" required/>
                            </div>
                            
                            <div className="mb-3 re-password-div" >
                                <input type="password" value = {re_password} onChange = {e => onChange(e)} minLength = '6' className="form-control re-password-field" name="re_password" id="re_password" placeholder="Confirm Password" required/>
                            </div>
                            
                            <div className="form-group mb-3 login-button-div" >
                                <button type="submit" className="form-control btn btn-primary rounded px-3 login-button-field">Register</button>
                            </div>
                        </form>
                        <p>
                            Account Exists? <Link className="login-link" to="/login">Login</Link>
                        </p>
                        
                    </div>
                </div>   
            </div>
        </div>  
    );
}
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    is_admin: state.auth.is_admin
});

export default connect(mapStateToProps, { register } )(Register);