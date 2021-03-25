import React, { Component, useEffect, setState, useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { connect } from 'react-redux';
import {get_user_data } from '../actions/auth';
import { Link, Redirect } from 'react-router-dom';

const WORKER_TYPE =
        {'R': 'Regular Worker',
        'C': 'Contractor',
        'A': 'Architect'};

const TOGGLE_MSG ={true: "תציג כל הפרטים", false: "צמצם פרטים"}

const WorkersManagement  = ({ get_user_data, isAuthenticated}) => {
    const [workers, setWorkers] = useState([]);
    const [state, setState] = useState({showMessage: false, msg: "תציג כל הפרטים"});
    const [addWorker, setAddWorker] = useState({showForm: false, showButton: true})
    const [newWorker, setNewWorker] = useState("");
    const [myBusiness, setMyBusiness] = useState({my_business: null});

    useEffect(() => {
    (async () => {
        await get_user_data().then((dataRes) => {
            setMyBusiness({my_business: dataRes.id})
             axios
          .get("/api/workers/?my_business=" +dataRes.id )
          .then((dataRes) => {
            setWorkers(dataRes.data);
            })

        })})();
    }, []);

   function getImgUrl(image, instance) {
    if (image === null) {
        return '/default_'+instance+'_pic.png';
    }
     return image;
    }


    const newWorkerChange = e => setNewWorker({ ...newWorker, [e.target.name]: e.target.value });

    let fileSelectedHandler  = e =>{setNewWorker({...newWorker, [e.target.name]: e.target.files[0] })}


    const newWorkerSubmit = e => {
        e.preventDefault();
        e.preventDefault();
        axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        axios.defaults.xsrfCookieName = "csrftoken";
        axios.defaults.withCredentials = true;
        const formData = new FormData();
        try{formData.append("photo", newWorker.photo,newWorker.photo.name);
        } catch(err){console.log("didn't change photo.")}

        try{formData.append("id_photo", newWorker.id_photo,newWorker.id_photo.name);
        } catch(err){console.log("didn't change id_photo.")}

        try{formData.append("license", newWorker.license,newWorker.license.name);
        } catch(err){console.log("didn't change license.")}

        try{formData.append("permit", newWorker.permit,newWorker.permit.name);
        } catch(err){console.log("didn't change permit.")}

        formData.append('my_business', myBusiness.my_business);
        formData.append('email', newWorker.email);
        formData.append('app_password', newWorker.app_password);
        formData.append('first_name', newWorker.first_name);
        formData.append('last_name', newWorker.last_name);
        formData.append('phone_number', newWorker.phone_number);
        formData.append('address', newWorker.address);
        formData.append('age', newWorker.age);
        formData.append('title', newWorker.title);
        formData.append('rate_per_day', newWorker.rate_per_day);
        formData.append('permit_type', newWorker.permit_type);
        formData.append('permit_validity', newWorker.permit_validity);
        console.log("new worker:", newWorker);
        setNewWorker("");

        axios({
            method: 'post',
            url: "/api/workers/",
            data: formData,
        })
        .then((dataRes) => {
            setWorkers(dataRes.data)
            console.log("workers data", dataRes.data)
        }).catch(err=>{ console.log("err", err.response)})

        setAddWorker({showForm: false, showButton: true});
    }

    let onLinkClickHandler = () => {
        let showOrHide = state.showMessage;
        setState({showMessage: !showOrHide, msg: TOGGLE_MSG[showOrHide]});
    };

    let addWorkerClickHandler = () => {
        setAddWorker({showForm: true, showButton:  false});
    };

    let dontAddWorkerClickHandler = () => {
        setAddWorker({showForm: false, showButton: true});
        setNewWorker("");
    };

    function workerForm(){
    return(
    <form dir='rtl' onSubmit={e => newWorkerSubmit(e)}>
        <input
             className='form-control'
             type='text'
             placeholder= "שם פרטי"
             name='first_name'
             value={newWorker.first_name}
             onChange={e => newWorkerChange(e)}
        />
        <input
             className='form-control'
             type='text'
             placeholder= "שם משפחה"
             name='last_name'
             value={newWorker.last_name}
             onChange={e => newWorkerChange(e)}
        />
        <input
             className='form-control'
             type='email'
             placeholder= "אימייל"
             name='email'
             value={newWorker.email}
             onChange={e => newWorkerChange(e)}
        />
        <input
             className='form-control'
             type='text'
             placeholder= "סיסמת אפליקציה"
             name='app_password'
             value={newWorker.app_password}
             onChange={e => newWorkerChange(e)}
        />
        <input className='form-group'
                type = 'file'
                name='photo'
                onChange={e => fileSelectedHandler(e)}
        />
        <input
             className='form-control'
             type='number'
             placeholder="מספר טילפון"
             name='phone_number'
             value={newWorker.phone_number}
             onChange={e => newWorkerChange(e)}
             minLength='8'
        />
        <input
             className='form-control'
             type='text'
             placeholder= "מקום מיגורים"
             name='address'
             value={newWorker.address}
             onChange={e => newWorkerChange(e)}
        />
        <input
             className='form-control'
             type='number'
             placeholder="גיל"
             name='age'
             value={newWorker.age}
             onChange={e => newWorkerChange(e)}
             minLength='2'
        />
        <input
             className='form-control'
             type='text'
             placeholder= "סוג עובד"
             name='title'
             value={newWorker.title}
             onChange={e => newWorkerChange(e)}
        />
        <input className='form-group'
                type = 'file'
                name='id_photo'
                onChange={e => fileSelectedHandler(e)}
        />
        <input
             className='form-control'
             type='float'
             placeholder="תעריף ליום"
             name='rate_per_day'
             value={newWorker.rate_per_day}
             onChange={e => newWorkerChange(e)}
        />
        <input className='form-group'
                type = 'file'
                name='license'
                onChange={e => fileSelectedHandler(e)}
        />
        <input className='form-group'
                type = 'file'
                name='permit'
                onChange={e => fileSelectedHandler(e)}
        />
        <input
             className='form-control'
             type='text'
             placeholder= "סוג רישוי"
             name='permit_type'
             value={newWorker.permit_type}
             onChange={e => newWorkerChange(e)}
        />
        <input
             className='form-control'
             type='date'
             placeholder="תוקף רישוי"
             name='permit_validity'
             value={newWorker.permit_validity}
             onChange={e => newWorkerChange(e)}
        />
        <button className='btn btn-success' type='submit'>הוספה</button>
        <button className='btn btn-danger' onClick={dontAddWorkerClickHandler}>בטל הוספת עובד</button>


    </form>
    )
    }

    function loadWorker(worker){
        try{
        return(
        <div>
        <p>{worker.email}</p>
        <p>{worker.app_password}</p>
        <p>{worker.phone_number}</p>
        <p>{worker.address}</p>
        <p>{worker.rate_per_day}</p>
        <p>{worker.id_photo}</p>
        <p>{worker.license}</p>
        <p>{worker.permit}</p>

        </div>
        )}
        catch(err){
           console.log(err)
        }
    }

    return(
    <div>
    <p>Workers: {JSON.stringify(workers)}</p>

    <html lang="he" >
        <head>
        <meta charset="utf-8"></meta>
        </head>
        <body dir="rtl">



        <div class = "container-fluid row">
             {
        workers.map(worker => (
            <div >
            <div class='col-12'>
                <img src={getImgUrl(worker.photo, "worker")} height={150} width={150}></img>
           </div>
           <div class='col-12'>
                 <p class='lead'>{worker.first_name} {worker.last_name} - {WORKER_TYPE[worker.title]}</p>
                 <p>{state.showMessage && loadWorker(worker)}</p>

                  <Link onClick={onLinkClickHandler} >{state.msg}</Link>
           </div>


           </div>
          ))}
        </div>

            <div dir='rtl' class=' container-fluid jumbotron mt-5' lang="he"  style={{  justifyContent:'right'}}>
                 {addWorker.showButton && <button  className='btn btn-primary' onClick={addWorkerClickHandler}  >תוסיף עובד חדש</button>}
                 {addWorker.showForm && workerForm()}

            </div>
        </body>
    </html>
    </div>
    );

};



const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
    });
export default connect(mapStateToProps, { get_user_data })(WorkersManagement);
