import React, { Component, useEffect, setState, useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { connect } from 'react-redux';
import {get_user_data } from '../actions/auth';
import { Link, Redirect } from 'react-router-dom';

const MyBusinessDetails = ({ get_user_data, isAuthenticated}) => {
    const [manager, setManager] = useState("");
    const [director, setDirector] = useState("");
    const [cars, setCars] = useState([]);
    const [business, setBusiness] = useState("");
    const [newUser, setNewUser] = useState("");

     useEffect(() => {
        (async () => {
        await get_user_data().then((dataRes) => {
            let userData = dataRes;
            axios
          .get("/api/users/"+ dataRes.id +"/")
          .then((dataRes) => {
            setManager(dataRes.data);
            axios
          .get("/api/cars/?my_business="+userData.id)
          .then((dataRes) => {
            setCars(dataRes.data);})

            axios
          .get("/api/my-business/"+ userData.id +"/")
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

        })
        })();

    }, []);

    function getImgUrl(image, instance) {
        console.log(image, instance);
        if (image === null) {
            return process.env.REACT_APP_API_URL+'/media/defaultpictuers/default_'+instance+'_pic.png';
        }
        return image;
    }

    function loadCars(){
        try{
        return(
        cars.map(car => (
            <div class = "row ">
           <div class='col-6'>
                <h2 >רכב מספר {car.id}</h2>
                    <p class='lead'>מספר רישוי: {car.license_number}</p>
                <p class='lead'>תוקף רישוי: {car.license_validity} </p>
                <p class='lead'>תוקף ביטוח: {car.insurance_validity}</p>
                <p class='lead'>ביטוח עד גיל: {car.insurance_up_to_age}</p>
           </div>
           <div class='col-6'>
                <img src={getImgUrl(car.image, "car")} height={150} width={150}></img>
           </div>

           </div>
          )))
        } catch(err){
        }
    }

//    <p>API: {JSON.stringify(manager)}</p>
//    <p>Director: {JSON.stringify(director)}</p>
//    <p>Cars: {JSON.stringify(cars)}</p>
//    <p>NewUser: {JSON.stringify(newUser)}</p>
//    <p>business: {JSON.stringify(business)}</p>

        return(
    <div>
    <html lang="he" >
        <head>
        <meta charset="utf-8"></meta>
        </head>
        <body dir="rtl" className="right-text">



        <div class = "container-fluid right-text">
        <div className='container' >
           <div class = "row ">
           <div class='jumbotron mt-5 col-6'>
                <h1 class='display-4'>{business.name}</h1>
           </div>
           <div class='jumbotron mt-5 col-6'>
                <img src={getImgUrl(business.logo, "business")} height={250} width={250} ></img>
           </div>
            </div>
        </div>
        </div>

        <div class = "container-fluid right-text">
        <div class = "row ">
        <div className='container' class="col-6" >
           <div class = "row ">
           <div class='jumbotron mt-5 col-5'>
                <h1 class='display-4'>מנהל העסק</h1>
                <p class='lead'>שם פרטי: {manager.first_name }</p>
                <p class='lead'>שם משפחה: {manager.last_name}</p>
                <p class='lead'>מספר טילפון: {manager.phone_number}</p>
                <p class='lead'>איימיל: {manager.email}</p>
                <p class='lead'>כתובת מגורים: {manager.address}</p>
                <p class='lead'>גיל: {manager.age}</p>
           </div>
           <div class='jumbotron mt-5 col-5'>
                <img src={getImgUrl(manager.photo, "user")} height={150} width={150} ></img>
           </div>
           </div>
        </div>
        <div className='container' class="col-6" >
           <div class = "row ">
           <div class='jumbotron mt-5 col-5'>
                <h1 class='display-4'>סגן מנהל</h1>
                <p class='lead'>שם פרטי: {director.first_name}</p>
                <p class='lead'>שם משפחה: {director.last_name} </p>
                <p class='lead'>מספר טילפון: {director.phone_number}</p>
                <p class='lead'>איימיל: {director.email}</p>
                <p class='lead'>כתובת מגורים: {director.address}</p>
                <p class='lead'>גיל: {director.age}</p>
           </div>
           <div class='jumbotron mt-5'>
                <img src={getImgUrl(director.photo, "user")} height={150} width={150} ></img>
           </div>
           </div>
        </div>

        <div class = "container-fluid" dir="rtl">
           <div class='jumbotron mt-5'>
                <h1 class='display-4'>רכבים בעסק</h1>

             {loadCars()}
        </div>
        </div>
        </div>
        </div>
        <p class='lead'> <Link to='/my-business-details-update'>עדכן את פרטי העסק שלי</Link></p>
        </body>
    </html>
      </div>
      );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
    });
export default connect(mapStateToProps, { get_user_data })(MyBusinessDetails);
