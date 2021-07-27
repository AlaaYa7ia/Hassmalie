import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout, get_user_data } from '../actions/auth';


const Navbar = ({ get_user_data,logout, isAuthenticated}) => {
    const [data, setData] = useState({
     first_name:"",
     last_name:""});

    const get_user = async (data)=>{
       const user_Res = await get_user_data()
       if(user_Res.first_name !== undefined){
        setData(user_Res);
       }

    }
    useEffect(()=>{
      get_user()
    },[])


    const guestLinks = () => (
        <Fragment>
            <li className='nav-item'>
                <Link className='nav-link text-warning' to='/login'>לכניסה</Link>
            </li>
            <li className='nav-item'>
                <Link className='nav-link text-warning' to='/signup'>להרשמה</Link>
            </li>
        </Fragment>
    );

    const authLinks = () => (

    <Fragment>
        <li className='nav-item'>
                <Link className='nav-link text-warning' to='/homepage'>העסק שלי </Link>
        </li>
        {<li className='nav-item'>
            <Link className='nav-link text-warning disabled'>ברוך הבא {data.first_name+ " " + data.last_name}</Link>
        </li>}
        <li className='nav-item'>
            <a className='nav-link text-danger' href='#!' onClick={logout}>ליציאה</a>
        </li>


    </Fragment>
    );

    return (

            <nav className='navbar navbar-expand-lg nav-tabs' lang="he" dir="rtl" style={{ backgroundColor: 'rgba(60, 60, 60, 0.9)'}}>
                <Link className='navbar-brand text-warning' to='/'>החשמלאי</Link>
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
                            <Link className='nav-link text-warning' to='/'>עמוד הבית <span className='sr-only'>(current)</span></Link>
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

export default connect(mapStateToProps, { logout, get_user_data })(Navbar);
