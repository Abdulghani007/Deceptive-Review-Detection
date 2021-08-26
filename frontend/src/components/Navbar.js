import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Fragment } from 'react';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';

const Navbar = ({isAuthenticated, is_admin, logout}) => {
    
    const adminAuthLinks = (
        <Fragment>
            <li className='nav-item'>
                <NavLink className='nav-link'  exact to='/admindashboard'><i class="fas fa-tachometer-alt"></i> Dashboard</NavLink>
            </li>
            <li className='nav-item'>
                <NavLink className='nav-link'  exact to='/accuracy_metrices'><i class="far fa-chart-line"></i> Accuracy</NavLink>
            </li>
            <li className='nav-item'>
                <NavLink className='nav-link'  exact to='/review_analysis'><i class="fas fa-table"></i> Review Analysis</NavLink>
            </li>
            <li className='nav-item'>
                <a className='nav-link'  onClick={logout} href='#!'><i class="fas fa-sign-out-alt"></i> Logout</a>
            </li>
        </Fragment>
    );

    const authLinks = (
        <Fragment>
            <li className='nav-item'>
                <NavLink className='nav-link'  exact to='/dashboard'><i class="fas fa-tachometer-alt"></i> Dashboard</NavLink>
            </li>
            <li className='nav-item'>
                <a className='nav-link'  onClick={logout} href='#!'><i class="fas fa-sign-out-alt"></i> Logout</a>
            </li>
        </Fragment>
    );

    const guestLinks = (
        <Fragment>
            <li className='nav-item'>
                <NavLink className='nav-link'  exact to='/login'><i class="fas fa-sign-in-alt"></i> Login</NavLink>
            </li>
            <li className='nav-item'>
                <NavLink className='nav-link'  exact to='/register'><i class="fas fa-user-plus"></i> Register</NavLink>
            </li>
        </Fragment>
    );

    return (
        <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
            <div className='container-fluid'>
                <Link className='navbar-brand fw-bold' exact to='/'><i class="fas fa-theater-masks"></i> Deceptive Review</Link>
                <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarNav' aria-controls='navbarNav' aria-expanded='false' aria-label='Toggle navigation'>
                <span className='navbar-toggler-icon'></span>
                </button>
                <div className='collapse navbar-collapse' id='navbarNav'>
                    <ul className='navbar-nav'>
                        <li className='nav-item'>
                            <NavLink className='nav-link'  exact to='/' ><i class="fas fa-home"></i> Home</NavLink>
                        </li>
                        { isAuthenticated && is_admin ? adminAuthLinks : isAuthenticated ? authLinks : guestLinks }
                    </ul>
                </div>
            </div>
        </nav>
    );
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    is_admin: state.auth.is_admin
});

export default connect(mapStateToProps, { logout })(Navbar);