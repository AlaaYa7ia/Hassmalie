import React, { Component,useMemo, useEffect, setState, useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { connect } from 'react-redux';
import {get_user_data } from '../actions/auth';
import { Link, Redirect } from 'react-router-dom';
import Table from "../components/Table";
import generatePDF from "../components/reportGenerator";


const WorkSchedule  = ({ get_user_data, isAuthenticated}) => {
    const [reports, setReports] = useState([]);
    const [workers, setWorkers] = useState([]);
    const [newReports, setNewReports] = useState([]);
    const [dataRes, setDataRes]= useState([]);
    let data = [];
    let dataf = new Set();

    const get_reports = async (dataRes) =>{
    const Report_Res = await axios.get('/api/reports/?my_business=' + dataRes)
    setReports(Report_Res.data);
    }

    const get_worker_data = async (dataRes)=>{
       const Worker_Res = await axios.get('/api/workers/?my_business=' + dataRes)
       setWorkers(Worker_Res.data);
    }
    const get_user = async (dataRes)=>{
       const user_Res = await get_user_data()
       setDataRes(user_Res);
    }

    useEffect(()=>{
      get_user()
    },[])

    useEffect(()=>{
      get_worker_data(dataRes)
      get_reports(dataRes)

    },[dataRes])

    useEffect(()=>{
      setNewReports(fix_data())
    },[reports, workers])


    function fix_data(){

        let w ={}
        let r = {}
        let rep = []

        reports.forEach(report => (
            w[report.worker_id]=workers.find((worker)=>worker.id === report.worker_id)
        ))
       reports.forEach(report => (
            r = report,
            r.worker_id=w[report.worker_id].first_name +" "+ w[report.worker_id].last_name,
            rep.push(r)
        ))
        return rep
    }

    const columns = useMemo(
    () => [

           {
            Header: "שם עובד",
            accessor: "worker_id",
            filterable: true
          },
          {
            Header: "מספר פרויקט",
            accessor: "project_id",
            disableSortBy: true,
            filterable: true
          },
          {
            Header: "תאריך דיווח",
            accessor: "reporting_date",
            filterable: true
          },
          {
            Header: "כניסה",
            accessor: "start_time",
            filterable: true
          },
          {
            Header: "יציאה",
            accessor: "end_time",
            filterable: true
          },
          {
            Header: "תיאור",
            accessor: "description",
            disableSortBy: true,
            filterable: true
          },
    ],
    []
  );

  function date_filter(){
        let format = new Date('2021-03-25')
        console.log(typeof(format))
        data = reports.filter(report => new Date(report.reporting_date)>format)
        console.log(data)


  };

  //date_filter();

//

    return(
    <html lang="he" >
            <p>Reports: {JSON.stringify(reports)}</p>
        <p>Workerss: {JSON.stringify(workers)}</p>
        <p>newReports: {JSON.stringify(newReports)}</p>
         <div dir='rtl' class=' container-fluid jumbotron mt-5' lang="he"  style={{  justifyContent:'center'}}>
         <Table
          columns={columns}
          data={newReports}
          dataf={dataf}
          />
         </div>
         <button
              className="btn btn-primary"
              onClick={() => generatePDF(dataf)}
         >
            Generate monthly report
         </button>
    </html>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
    });
export default connect(mapStateToProps, { get_user_data })(WorkSchedule);