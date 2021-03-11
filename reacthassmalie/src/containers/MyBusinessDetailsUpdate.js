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
    const [newCar, setNewCar] = useState("");



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

    let fileSelectedHandler = event =>{setBusiness({...business,logo: event.target.files[0] })}
    let carImageHandler  = event =>{setNewCar({...newCar,image: event.target.files[0] })}
    let directorImageHandler  = event =>{setDirector({...director, photo: event.target.files[0] })}
    let managerImageHandler  = event =>{setManager({...manager, photo: event.target.files[0] })}

    //console.log(business)
    const managerChange = e => setManager({ ...manager, [e.target.name]: e.target.value });
    const directorChange = e => setDirector({ ...director, [e.target.name]: e.target.value });
    const businessChange = e => setBusiness({ ...business, [e.target.name]: e.target.value });
    const newCarChange = e => setNewCar({ ...newCar, [e.target.name]: e.target.value });

    const mangerSubmit = e => {
        e.preventDefault();
        axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        axios.defaults.xsrfCookieName = "csrftoken";
        axios.defaults.withCredentials = true;
        const formData = new FormData();
        try{
        formData.append(
        'photo',
        manager.photo,
        manager.photo.name
        );
        } catch(err){
            console.log("didn't change image.")
        }
        formData.append('first_name', manager.first_name);
        formData.append('last_name', manager.last_name);
        formData.append('phone_number', manager.phone_number);
        formData.append('email', manager.email);
        formData.append('address', manager.address);
        formData.append('password', manager.password);
        formData.append('title', manager.title);
        formData.append('age', manager.age);

        axios
        .put("/api/users/"+manager.id+"/",
        formData
        )
        .then((dataRes) => {
            setManager(dataRes.data)
        }).catch(err=>{ console.log("err", err.response)})
        //if changed title or email?
    };


    const directorSubmit = e => {
        e.preventDefault();
        axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        axios.defaults.xsrfCookieName = "csrftoken";
        axios.defaults.withCredentials = true;
        const formData = new FormData();
        try{
        formData.append(
        'photo',
        director.photo,
        director.photo.name
        );
        } catch(err){
            console.log("didn't change image.")
        }
        formData.append('first_name', director.first_name);
        formData.append('last_name', director.last_name);
        formData.append('phone_number', director.phone_number);
        formData.append('email', director.email);
        formData.append('address', director.address);
        formData.append('password', director.password);
        formData.append('title', director.title);
        formData.append('age', director.age);
        axios
        .put("/api/users/"+director.id+"/",
        formData)
        .then((dataRes) => {
            setDirector(dataRes.data)
        }).catch(err=>{ console.log("err")})
        //if changed title or email?
    };
     const businessSubmit = e => {
        e.preventDefault();
        //console.log("bus befir submit: ", business)

        const formData = new FormData();
        try{
        formData.append(
        "logo",
        business.logo,
        business.logo.name
        );
        } catch(err){
            console.log("didn't change image.")
        }
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

     const newCarSubmit = e => {
        e.preventDefault();
        axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        axios.defaults.xsrfCookieName = "csrftoken";
        axios.defaults.withCredentials = true;
        const formData = new FormData();
        //console.log("business.logo", business.logo)
        try{
        formData.append(
        "image",
        newCar.image,
        newCar.image.name
        );
        } catch(err){
            console.log("didn't change image.")
        }

        formData.append('my_business', business.manager);
        formData.append('license_number', newCar.license_number)
        formData.append('license_validity', newCar.license_validity)
        formData.append('insurance_validity', newCar.insurance_validity)
        formData.append('insurance_up_to_age', newCar.insurance_up_to_age)

        console.log("new car", newCar)
        setNewCar({license_number: "",
        license_validity: "",
        insurance_validity: "",
        insurance_up_to_age: "",
        image: "",
        })
        axios({
            method: 'post',
            url: "/api/cars/"+business.manager+"/",
            data: formData,
        })
        .then((dataRes) => {
            setCars(dataRes.data)
            console.log("cars data", dataRes.data)
        }).catch(err=>{ console.log("err", err.response)})

     }

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
                תמונה אשית
                <div className='form-group'>
                <input className='form-group'
                type = 'file'
                onChange={e => managerImageHandler(e)}
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
                תמונת סגן מנהל
                <div className='form-group'>
                <input className='form-group'
                type = 'file'
                onChange={e => directorImageHandler(e)}
                />
                </div>

                <button className='btn btn-primary' type='submit'>עדכן פרטי הסגן מנהל</button>
            </form>

            <form dir='rtl' onSubmit={e => newCarSubmit(e)}>
            <p>תוסיף רכב חדש</p>
                <div className='form-group'>
                    <input
                        className='form-control'
                        type='number'
                        placeholder="מספר רישוי"
                        name='license_number'
                        value={newCar.license_number}
                        onChange={e => newCarChange(e)}
                        minLength='7'
                    />
                </div>
                <div className='form-group'>
                    תוקף רישוי
                    <input
                        className='form-control'
                        type='date'
                        placeholder="תוקף רישוי"
                        name='license_validity'
                        value={newCar.license_validity}
                        onChange={e => newCarChange(e)}
                    />
                </div>
                <div className='form-group'>
                    תוקף ביטוח
                    <input
                        className='form-control'
                        type='date'
                        placeholder="תוקף ביטוח"
                        name='insurance_validity'
                        value={newCar.insurance_validity}
                        onChange={e => newCarChange(e)}
                    />
                </div>
                <div className='form-group'>
                    <input
                        className='form-control'
                        type='number'
                        placeholder="ביטוח עד גיל"
                        name='insurance_up_to_age'
                        value={newCar.insurance_up_to_age}
                        onChange={e => newCarChange(e)}
                        minLength='2'
                    />
                </div>
                תמונת רכב
                <div className='form-group'>

                <input className='form-group'
                type = 'file'
                onChange={e => carImageHandler(e)}
                />
                </div>
                <button className='btn btn-primary' type='submit'>תוסיף רכב חדש</button>
            </form>
            </div>

            <p> <Link className='nav-link' to='/my-business-details'>סיימתי עדכון</Link></p>
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

