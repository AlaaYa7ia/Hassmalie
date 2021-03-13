import React, { Component, useEffect, setState, useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { connect } from 'react-redux';
import {get_user_data } from '../actions/auth';
import { Link, Redirect } from 'react-router-dom';

const WORKER_TYPE =
        {'R': 'Regular Worker',
        'C': 'contractor',
        'A': 'Architect'};

const TOGGLE_MSG ={true: "תציג כל הפרטים", false: "צמצם פרטים"}

const WorkersManagement  = ({ get_user_data, isAuthenticated}) => {
    const [workers, setWorkers] = useState([]);
    const [state, setState] = useState({showMessage: false, msg: "תציג כל הפרטים"});
    let onButtonClickHandler = () => {
        let showOrHide = state.showMessage;
        setState({showMessage: !showOrHide, msg: TOGGLE_MSG[showOrHide]});
    };


    useEffect(() => {
    (async () => {
        await get_user_data().then((dataRes) => {
             axios
          .get("/api/workers/" +dataRes.id +"/")
          .then((dataRes) => {
            setWorkers(dataRes.data);
            })

        })})();
    }, []);

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
                <img src={worker.photo} height={150} width={150}></img>
           </div>
           <div class='col-12'>
                 <p class='lead'>{worker.first_name} {worker.last_name} - {WORKER_TYPE[worker.title]}</p>
                 <p>{state.showMessage && loadWorker(worker)}</p>

                  <Link onClick={onButtonClickHandler} >{state.msg}</Link>
           </div>


           </div>
          ))}
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
