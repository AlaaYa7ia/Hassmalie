import React, { Component, useEffect, setState, useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { connect } from 'react-redux';
import {get_user_data, logout } from '../actions/auth';
import { Link, useHistory } from 'react-router-dom';

import MyBusinessDetails from '../containers/MyBusinessDetails';


const MyBusinessDetailsUpdate = ({ get_user_data,logout, isAuthenticated}) => {
    const [manager, setManager] = useState("");
    const [director, setDirector] = useState("");
    const [cars, setCars] = useState([]);
    const [business, setBusiness] = useState("");
    const [newUser, setNewUser] = useState("");
    const [title,setTitle] = useState('dfv')
    const [body,setBody] = useState('vdfvdfd')



    useEffect(() => {
        (async () => {
        await get_user_data().then((dataRes) => {
            axios
          .get("/api/users/"+ dataRes.id +"/")
          .then((dataRes) => {
            setManager(dataRes.data);

           })

            axios
          .get("/api/cars/"+dataRes.id+"/")
          .then((dataRes) => {
            setCars(dataRes.data);})

           axios
          .get("/api/my-business/"+ dataRes.id +"/")
          .then((dataRes) => {
            setBusiness(dataRes.data);
             return dataRes.data.deputy_director

           }).then((dataRes) => {
            axios
          .get("/api/users/"+ dataRes +"/")
          .then((dataRes) => {
            setDirector(dataRes.data);
            })
           })
        })
        })();

    }, []);

    let fileSelectedHandler = event =>{
    console.log(event.target.files[0]);
    setBusiness({...business,logo: event.target.files[0] })

    }
    console.log(business)
    const managerChange = e => setManager({ ...manager, [e.target.name]: e.target.value });
    const directorChange = e => setDirector({ ...director, [e.target.name]: e.target.value });
    const businessChange = e => setBusiness({ ...business, [e.target.name]: e.target.value });

    const mangerSubmit = e => {
        e.preventDefault();
        axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        axios.defaults.xsrfCookieName = "csrftoken";
        axios.defaults.withCredentials = true;
        axios
        .put("/api/users/"+manager.id+"/",
        {first_name: manager.first_name, last_name: manager.last_name, phone_number: manager.phone_number ,
        email: manager.email, address: manager.address, password: manager.password, title: manager.title, age: manager.age })
        .then((dataRes) => {
            setManager(dataRes.data)
        }).catch(err=>{ console.log("err")})
        //if changed title or email?
    };

    const directorSubmit = e => {
        e.preventDefault();
        axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        axios.defaults.xsrfCookieName = "csrftoken";
        axios.defaults.withCredentials = true;
        axios
        .put("/api/users/"+director.id+"/",
        {first_name: director.first_name, last_name: director.last_name, phone_number: director.phone_number ,
        email: director.email, address: director.address, password: director.password, title: director.title, age: director.age })
        .then((dataRes) => {
            setDirector(dataRes.data)
        }).catch(err=>{ console.log("err")})
        //if changed title or email?
    };
     const businessSubmit = e => {
        e.preventDefault();
        console.log("bus befir submit: ", business)

        const formData = new FormData();
        console.log("business.logo", business.logo)
        formData.append(
        "logo",
        business.logo,
        business.logo.name
        );

        formData.append('manager', business.manager);
        formData.append('deputy_director', business.deputy_director);
        formData.append('name', business.name);


        axios({
  method: 'put',
  url: "/api/my-business/"+business.manager+"/",
  data: formData,
  header: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
          },
    })
        .then((dataRes) => {
            setBusiness(dataRes.data)
            console.log(dataRes.data)
        }).catch(err=>{ console.log("err", err.response)})
     };

    return (


    <div dir='rtl' class=' container-fluid jumbotron mt-5' lang="he"  style={{  justifyContent:'right'}}>
            <h1 dir='rtl'>עדכון הפרטים העסק שלי</h1>

            <form dir='rtl' onSubmit={e => businessSubmit(e)}>
                <p>תעדכן את פרטי העסק</p>
                <div className='form-group'>
                    <input
                        className='form-control'
                        type='text'
                        placeholder={business.name}
                        name='name'
                        value={business.name}
                        onChange={e => businessChange(e)}
                    />
                </div>
                <div className='form-group'>
                <input className='form-group'
                type = 'file'
                onChange={e => fileSelectedHandler(e)}
                />
                </div>

                <button className='btn btn-primary' type='submit'>עדכן פרטים העסק</button>
            </form>

            <div class = "container-fluid row">

            <form  onSubmit={e => mangerSubmit(e)}>
                <p>תעדכן את המשתמש שלך</p>
                <div className='form-group'>
                    <input
                        className='form-control'
                        type='text'
                        placeholder={manager.first_name}
                        name='first_name'
                        value={manager.first_name}
                        onChange={e => managerChange(e)}
                    />
                </div>
                <div className='form-group'>
                    <input
                        className='form-control'
                        type='text'
                        placeholder={manager.last_name}
                        name='last_name'
                        value={manager.last_name}
                        onChange={e => managerChange(e)}
                    />
                </div>

                <div className='form-group'>
                    <input
                        className='form-control'
                        type='number'
                        placeholder={manager.phone_number}
                        name='phone_number'
                        value={manager.phone_number}
                        onChange={e => managerChange(e)}
                        minLength='8'
                    />
                </div>
                <div className='form-group'>
                    <input
                        className='form-control'
                        type='number'
                        placeholder={manager.age}
                        name='age'
                        value={manager.age}
                        onChange={e => managerChange(e)}
                        minLength='1'
                    />
                </div>
                <div className='form-group'>
                    <input
                        className='form-control'
                        type='text'
                        placeholder={manager.address}
                        name='address'
                        value={manager.address}
                        onChange={e => managerChange(e)}
                    />
                </div>

                <button className='btn btn-primary' type='submit'>עדכן פרטים שלי</button>
            </form>


            <form  onSubmit={e => directorSubmit(e)}>
            <p>תעדכן את פרטי סגן המנהל</p>
                <div className='form-group'>
                    <input
                        className='form-control'
                        type='text'
                        placeholder={director.first_name}
                        name='first_name'
                        value={director.first_name}
                        onChange={e => directorChange(e)}
                    />
                </div>
                <div className='form-group'>
                    <input
                        className='form-control'
                        type='text'
                        placeholder={director.last_name}
                        name='last_name'
                        value={director.last_name}
                        onChange={e => directorChange(e)}
                    />
                </div>

                <div className='form-group'>
                    <input
                        className='form-control'
                        type='number'
                        placeholder={director.phone_number}
                        name='phone_number'
                        value={director.phone_number}
                        onChange={e => directorChange(e)}
                        minLength='8'
                    />
                </div>
                <div className='form-group'>
                    <input
                        className='form-control'
                        type='number'
                        placeholder={director.age}
                        name='age'
                        value={director.age}
                        onChange={e => directorChange(e)}
                        minLength='1'
                    />
                </div>
                <div className='form-group'>
                    <input
                        className='form-control'
                        type='text'
                        placeholder={director.address}
                        name='address'
                        value={director.address}
                        onChange={e => directorChange(e)}
                    />
                </div>

                <button className='btn btn-primary' type='submit'>עדכן פרטי הסגן מנהל</button>
            </form>
            </div>

            <p class='lead'> <Link to='/my-business-details'>סיימתי עדכון</Link></p>
        </div>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { get_user_data, logout })(MyBusinessDetailsUpdate);



//<div className='form-group'>
//                    <input
//                        className='form-control'
//                        type='text'
//                        placeholder={manager.title}
//                        name='title'
//                        value={manager.title}
//                        onChange={e => onChange(e)}
//                    />
//                </div>

//                <div className='form-group'>
//                    <input
//                        className='form-control'
//                        type='email'
//                        placeholder={manager.email}
//                        name='email'
//                        value={manager.email}
//                        onChange={e => onChange(e)}
//                    />
//                </div>

