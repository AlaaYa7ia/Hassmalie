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
    const [managerFlag, setManagerFlag] = useState(false);
    const [directorFlag, setDirectorFlag] = useState(false);

    const get_user = async ()=>{
        const user_Res = await get_user_data();
        if(user_Res.title === 'M'){
            axios.get("/api/users/"+user_Res.id +"/")
                .then((dataRes) => {
                    setManager(dataRes.data)
                    setManagerFlag(true);
                })


        }else{
            axios.get("/api/users/"+user_Res.id +"/")
                .then((dataRes) => {
                    setDirector(dataRes.data)
                    setDirectorFlag(true)
                })

        }
    }

    const get_business = async (title)=> {
        if(title === 'M'){
            const Res = await axios.get(process.env.REACT_APP_API_URL+'/api/my-business/' + manager.id+"/");
            setBusiness(Res.data)
        }else{
            const Res = await axios.get(process.env.REACT_APP_API_URL+'/api/my-business/?deputy_director=' + director.id);
            setBusiness(Res.data[0])
        }
    }

    const get_other_user= async (title)=> {
        if(title === 'M'){
            await axios
                .get(process.env.REACT_APP_API_URL+"/api/users/"+ business.deputy_director +"/")
                .then((dataRes) => {
                    setDirector(dataRes.data)
                })
        }
        else{
            await axios
                .get(process.env.REACT_APP_API_URL+"/api/users/"+ business.manager +"/")
                .then((dataRes) => {
                    setManager(dataRes.data)
                })
        }
    }

    const get_cars= async ()=> {
        await axios
            .get(process.env.REACT_APP_API_URL+"/api/cars/?my_business="+ business.manager )
            .then((dataRes) => {
                setCars(dataRes.data)
            })
    }
    useEffect(()=>{
        get_user()
    },[])

    useEffect(()=>{
        if(managerFlag) {
            get_business('M')
        }
    },[managerFlag, manager])

    useEffect(()=>{
        if(directorFlag){
            get_business('D')
        }
    },[directorFlag, director])

    useEffect(()=>{
        if(business !== ""){
            if(director !== ""){
                get_other_user('D')
            }else{
                get_other_user('M')
            }

        }
        get_cars()
    },[business])

    function getImgUrl(image, instance) {

        if (image === null) {
            return process.env.REACT_APP_API_URL+'/media/defaultpictuers/default_'+instance+'_pic.png';
        }
        return image;
    }

    function loadCars(){
        try{
        return(
        cars.map(car => (
            <div className="card">
                <div className="card-header" id={"heading"+car.id.toString()}>
                    <h5 className="mb-0">
                        <button className="btn btn-link" data-toggle="collapse" data-target={"#collapse"+car.id}
                                aria-expanded="true" aria-controls={"collapse"+car.id}>
                            רכב מספר {car.id}
                        </button>
                    </h5>
                </div>

                <div id={"collapse"+car.id} className="collapse" aria-labelledby={"heading"+car.id} data-parent="#accordion">
                    <div className="card-body">
                        <div className="row ">
                            <div className='col-5'>
                                <p className='lead'>מספר רישוי: {car.license_number}</p>
                                <p className='lead'>תוקף רישוי: {car.license_validity} </p>
                                <p className='lead'>תוקף ביטוח: {car.insurance_validity}</p>
                                <p className='lead'>ביטוח עד גיל: {car.insurance_up_to_age}</p>
                                <p className='lead'>תיאור הרכב: {car.description}</p>
                            </div>
                            <div className='col-5'>
                                <img src={getImgUrl(car.image, "car")} height={150} width={150}></img>
                            </div>
                        </div>
                    </div>
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
        <body dir="rtl">

        <div class = "container-fluid right-text row mt-5 mb-5">
            <div className='col-1'></div>
            <form className='col-3'>
            <Link class='btn btn-outline-warning btn-lg' to='/my-business-details-update' role='button' >עדכן את פרטי העסק שלי</Link>
            </form>
                <div className='col-3'></div>
                <h1 className='col-2'>{business.name}</h1>
               <img className='col-1' src={getImgUrl(business.logo, "business")} height={70} width={70} ></img>
            <div className='col-1'></div>
        </div>
        <div class = "container-fluid right-text align-items-center">
        <div class = "row ">
            <div className='col-1'></div>
        <div className='container col-5' >
           <div class = "row ">
           <div class=' mt-5 col-3'>
                <h1 class='display-4'>מנהל העסק</h1>
           </div>
               <div class='mt-5 col-3'>
                   <img src={getImgUrl(manager.photo, "user")} height={150} width={150} ></img>
               </div>
           </div>
                <p class='lead'>שם פרטי: {manager.first_name }</p>
                <p class='lead'>שם משפחה: {manager.last_name}</p>
                <p class='lead'>מספר טילפון: {manager.phone_number}</p>
                <p class='lead'>איימיל: {manager.email}</p>
                <p class='lead'>כתובת מגורים: {manager.address}</p>
                <p class='lead'>גיל: {manager.age}</p>


        </div>
        <div className='container col-5' >
           <div class = "row ">
           <div class='mt-5 col-3'>
                <h1 class='display-4'>סגן מנהל</h1>
           </div>
               <div class='mt-5 col-3'>
                   <img src={getImgUrl(director.photo, "user")} height={150} width={150} ></img>
               </div>
           </div>
                <p class='lead'>שם פרטי: {director.first_name}</p>
                <p class='lead'>שם משפחה: {director.last_name} </p>
                <p class='lead'>מספר טילפון: {director.phone_number}</p>
                <p class='lead'>איימיל: {director.email}</p>
                <p class='lead'>כתובת מגורים: {director.address}</p>
                <p class='lead'>גיל: {director.age}</p>

        </div>

        <div class = "container-fluid col-10" dir="rtl">
                <h1 class='display-4'>רכבים בעסק</h1>
               <div id="accordion">
                   {loadCars()}
               </div>
        </div>
        </div>
            <div className='col-1'></div>
        </div>
        </body>
    </html>
      </div>
      );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
    });
export default connect(mapStateToProps, { get_user_data })(MyBusinessDetails);
