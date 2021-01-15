import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';

const Navbar = ({ logout, isAuthenticated }) => {
//
//    const logout_user = () => {
//        logout();
//        setRedirect(true);
//    };
    console.log("params",logout, isAuthenticated)
    const guestLinks = () => (
        <Fragment>
            <li className='nav-item'>
                <Link className='nav-link' to='/login'>לכניסה</Link>
            </li>
            <li className='nav-item'>
                <Link className='nav-link' to='/signup'>להרשמה</Link>
            </li>
        </Fragment>
    );

    const authLinks = () => (
    <Fragment>
        <li className='nav-item'>
            <a className='nav-link' href='#!' onClick={logout}>ליציאה</a>
        </li>
        <li className='nav-item'>
                <Link className='nav-link' to='/homepage'>העסק שלי</Link>
        </li>
    </Fragment>
    );

    return (
            <nav className='navbar navbar-expand-lg navbar-light bg-light'>
                <Link className='navbar-brand' to='/'>החשמלאי</Link>
                <button
                    className='navbar-toggler'
                    type='button'
                    data-toggle='collapse'
                    data-target='#navbarNav'
                    aria-controls='navbarNav'
                    aria-expanded='false'
                    aria-label='Toggle navigation'
                >
                    <span className='navbar-toggler-icon'></span>
                </button>
                <div className='collapse navbar-collapse' id='navbarNav'>
                    <ul className='navbar-nav'>
                        <li className='nav-item active'>
                            <Link className='nav-link' to='/'>עמוד הבית <span className='sr-only'>(current)</span></Link>
                        </li>
                        {isAuthenticated ? authLinks() : guestLinks()}
                    </ul>
                </div>
            </nav>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { logout })(Navbar);