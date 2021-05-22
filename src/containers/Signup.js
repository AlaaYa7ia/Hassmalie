import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { signup } from '../actions/auth';
//import Select from 'react-select'

const Signup = ({ signup, isAuthenticated }) => {
    const [accountCreated, setAccountCreated] = useState(false);
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        title: '',
        phone_number: '',
        address: '',
        password: '',
        re_password: ''
    });
    const { first_name, last_name, email,title, phone_number, address, password, re_password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();

        if (password === re_password) {
            signup(first_name, last_name, email,title, phone_number, address, password, re_password);
            setAccountCreated(true);
            console.log("form Data", formData)
            localStorage.setItem('user' , JSON.stringify(formData))//check if you added this or from the original
            console.log(localStorage.getItem('user'))

        }
    };

    if (isAuthenticated) {
        return <Redirect to='/' />
    }
    if (accountCreated) {
        return <Redirect to='/login' />
    }

    return (
    <div dir='rtl' class='col-6 container-fluid jumbotron mt-5 right-text' lang="he"  style={{  justifyContent:'right'}}>
                <h1 dir='rtl'>הרשמה</h1>
            <p>תיצור את המשתמש שלך</p>
            <form dir='rtl' onSubmit={e => onSubmit(e)}>
                <div className='form-group'>
                    <input
                        className='form-control'
                        type='text'
                        placeholder='שם פרטי*'
                        name='first_name'
                        value={first_name}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div className='form-group'>
                    <input
                        className='form-control'
                        type='text'
                        placeholder='שם משפחה*'
                        name='last_name'
                        value={last_name}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div className='form-group'>
                    <input
                        className='form-control'
                        type='email'
                        placeholder='איימיל*'
                        name='email'
                        value={email}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>

                <div className='form-group dropdown'>
                    <select
                        className='form-control right-text'
                        placeholder='סוג עובד*'
                        name='title'
                        value={title}
                        onChange={e => onChange(e)}
                        required
                    >
                        <option>סוג עובד*</option>
                        <option value="M">מנהל</option>
                        <option value="D">סגן מנהל</option>
                        {/*<option value="R">עובד אחר</option>*/}
                    </select>
                </div>

                <div className='form-group'>
                    <input
                        className='form-control'
                        type='number'
                        placeholder='מספר טילפון*'
                        name='phone_number'
                        value={phone_number}
                        onChange={e => onChange(e)}
                        minLength='8'
                        required
                    />
                </div>
                <div className='form-group'>
                    <input
                        className='form-control'
                        type='text'
                        placeholder='כתובת*'
                        name='address'
                        value={address}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div className='form-group'>
                    <input
                        className='form-control'
                        type='password'
                        placeholder='סיסמה*'
                        name='password'
                        value={password}
                        onChange={e => onChange(e)}
                        minLength='6'
                        required
                    />
                </div>
                <div className='form-group'>
                    <input
                        className='form-control'
                        type='password'
                        placeholder='אשר סיסמה*'
                        name='re_password'
                        value={re_password}
                        onChange={e => onChange(e)}
                        minLength='6'
                        required
                    />
                </div>
                <button className='btn btn-primary' type='submit'>הירשם</button>
            </form>
            <p className='mt-3'>
                כבר יש לך חשבון? <Link to='/login'>תתחבר</Link>
            </p>
        </div>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { signup })(Signup);