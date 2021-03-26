import React, { Component,useMemo, useEffect, setState, useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { connect } from 'react-redux';
import {get_user_data } from '../actions/auth';
import { Link, Redirect } from 'react-router-dom';
import Table from "../components/Table";



const WorkSchedule  = ({ get_user_data, isAuthenticated}) => {
    const [reports, setReports] = useState([]);
    const [workers, setWorkers] = useState([]);
    const [newReports, setNewReports] = useState([])


    useEffect(() => {
    (async () => {
        await get_user_data().then((dataRes) => {
             axios
          .get("/api/reports/?my_business=" +dataRes.id )
          .then((dataRes) => {
            setReports(dataRes.data);

            }).then(
                  axios
          .get("/api/workers/?my_business=" +dataRes.id )
          .then((dataRes) => {
            setWorkers(dataRes.data);
            }).then(
                //set_reports()
            )


            )

         })})();

    }, []);

//    function set_reports(){
//        let helper = []
//        let h = {}
//        reports.map(report => (
//            helper.push(report.worker_id)
//            //setNewReports({ ...newReports, [report.worker_id]: workers.find((worker) => worker.id === report.worker_id) })
//        ))
//        for (var i = 0; i < helper.length; i++) {
//        h[helper[i]] = workers.find((worker.first_name) => worker.id === helper[i])
//        }
//        console.log(h)
//        //setNewReports({ ...newReports,[worker_name]: h[]})
//    }

    const columns = useMemo(
    () => [

           {
            Header: "שם עובד",
            accessor: "worker_id"
          },
          {
            Header: "מספר פרויקט",
            accessor: "project_id"
          },
          {
            Header: "תאריך דיווח",
            accessor: "reporting_date"
          },
          {
            Header: "כניסה",
            accessor: "start_time"
          },
          {
            Header: "יציאה",
            accessor: "end_time"
          },
          {
            Header: "תיאור",
            accessor: "description"
          },
    ],
    []
  );

    return(

    <html lang="he" >
        <p>Reports: {JSON.stringify(reports)}</p>
        <p>Workerss: {JSON.stringify(workers)}</p>
        <p>newReports: {JSON.stringify(newReports)}</p>
         <div dir='rtl' class=' container-fluid jumbotron mt-5' lang="he"  style={{  justifyContent:'center'}}>
         <Table columns={columns} data={reports} />
         </div>
    </html>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
    });
export default connect(mapStateToProps, { get_user_data })(WorkSchedule);