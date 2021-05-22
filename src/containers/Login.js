import React, { useState,  Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../actions/auth';

const Login = ({ login, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [alert, setAlert] = useState({showAlert: false, alert:""});

    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        let flag;
        await login(email, password).then(result => flag = result);
        if (!flag) {
            setAlert({showAlert: true, alert:"האיימיל או הסיסמה שהזנת שגויים, נסה שוב בבקשה."})
        }
    };


    if (isAuthenticated) {
        return <Redirect to='/homepage' />
    }

    return (
    <html  lang="he" dir="rtl" style={{ backgroundColor: 'rgba(184, 160, 191)' }} >
    <div  class='col-3 container-fluid right-text mb-5' lang="he"  style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '70vh'}}>
        <div className='container mt-5' dir= "rtl" >
            <h1 dir= "rtl">כניסה</h1>
            <p dir= "rtl">כניסה לחשבון שלך</p>
            <form onSubmit={e => onSubmit(e)}>
                <div className='form-group' dir= "rtl">
                    <input
                        className='form-control'
                        type='email'
                        placeholder='איימיל'
                        name='email'
                        value={email}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div className='form-group'>
                    <input
                        className='form-control'
                        type='password'
                        placeholder='סיסמה'
                        name='password'
                        value={password}
                        onChange={e => onChange(e)}
                        minLength='6'
                        required
                    />
                </div>
                {alert.showAlert && <div className="alert alert-danger" role="alert">
                    {alert.alert}
                </div>}
                <button className='btn btn-primary' dir= "rtl" type='submit'>כניסה</button>


            </form>
            <p className='mt-3' dir= "rtl">
                עדין לא עשית חשבון? <Link to='/signup'>תירשם</Link>
            </p>
            <p className='mt-3'>
                שכחת את הסיסמה? <Link to='/reset-password'>לאפס את הסיסמה</Link>
            </p>
        </div>
        </div>
    <div><br></br><br></br><br></br> <br></br> <br></br> <br></br> <br></br><br></br></div>
        </html>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);