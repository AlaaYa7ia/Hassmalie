import React, { Component, useEffect, setState, useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { connect } from 'react-redux';
import {get_user_data, logout } from '../actions/auth';
import { Link, Redirect } from 'react-router-dom';

const MyBusinessDetailsUpdate = ({ get_user_data,logout, isAuthenticated}) => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        title: '',
        phone_number: '',
        age: '',
        address: '',
        password: '',
    });

    const options = [
    { value: 'M', label: 'מנהל' },
    { value: 'D', label: 'סגן מנהל' },
    { value: 'R', label: 'עובד חשמל' }];

    useEffect(() => {
        (async () => {
        await get_user_data().then((dataRes) => {
            axios
          .get("/api/users/"+ dataRes.id +"/")
          .then((dataRes) => {
            setFormData(dataRes.data);

           })
           })
        })();
    }, []);


    const { first_name, last_name, email,title, phone_number, age, address, password} = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        axios.defaults.xsrfCookieName = "csrftoken";
        axios.defaults.withCredentials = true;
           axios
          .put("/api/users/"+formData.id+"/",
          /*{first_name: first_name, last_name: last_name,email: email,title: title, phone_number: phone_number,age: age, address: address}*/
          {first_name: first_name, last_name: last_name, phone_number: phone_number , email: email, address: address, password: password, title: title, age: age })
          .then((dataRes) => {
                setFormData(dataRes.data)
            }).catch(err=>{ console.log("err")})
               //if changed title or email?
    };

    return (
    <div dir='rtl' class='col-6 container-fluid jumbotron mt-5' lang="he"  style={{  justifyContent:'right'}}>
                <h1 dir='rtl'>עדכון הפרטי העסק שלי</h1>
            <p>תעדכן את המשתמש שלך</p>
            <form dir='rtl' onSubmit={e => onSubmit(e)}>
                <div className='form-group'>
                    <input
                        className='form-control'
                        type='text'
                        placeholder={first_name}
                        name='first_name'
                        value={first_name}
                        onChange={e => onChange(e)}
                    />
                </div>
                <div className='form-group'>
                    <input
                        className='form-control'
                        type='text'
                        placeholder={last_name}
                        name='last_name'
                        value={last_name}
                        onChange={e => onChange(e)}
                    />
                </div>
                <div className='form-group'>
                    <input
                        className='form-control'
                        type='email'
                        placeholder={email}
                        name='email'
                        value={email}
                        onChange={e => onChange(e)}
                    />
                </div>

                <div className='form-group'>
                    <input
                        className='form-control'
                        type='text'
                        placeholder={title}
                        name='title'
                        value={title}
                        onChange={e => onChange(e)}
                    />
                </div>

                <div className='form-group'>
                    <input
                        className='form-control'
                        type='number'
                        placeholder={phone_number}
                        name='phone_number'
                        value={phone_number}
                        onChange={e => onChange(e)}
                        minLength='8'
                    />
                </div>
                <div className='form-group'>
                    <input
                        className='form-control'
                        type='number'
                        placeholder={age}
                        name='age'
                        value={age}
                        onChange={e => onChange(e)}
                        minLength='1'
                    />
                </div>
                <div className='form-group'>
                    <input
                        className='form-control'
                        type='text'
                        placeholder={address}
                        name='address'
                        value={address}
                        onChange={e => onChange(e)}
                    />
                </div>

                <button className='btn btn-primary' type='submit'>עדכן</button>
            </form>
        </div>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { get_user_data, logout })(MyBusinessDetailsUpdate);

