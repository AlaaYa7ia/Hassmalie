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
    const [newReport, setNewReport] = useState("");
    const [myBusiness, setMyBusiness] = useState({my_business: null});
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
       setMyBusiness({my_business: user_Res.id})
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
        try{
        let rep = []
        if(reports.length !== 0 && workers.length !== 0){
            let w ={}
            let r = {}
            reports.forEach(report => (
                w[report.worker_id]=workers.find((worker)=>worker.id === report.worker_id)
            ))
            if(w.length !== 0){
               reports.forEach(report => (
                    r = report,
                    r.worker_id={worker_id: report.worker_id, worker_name: w[report.worker_id].first_name +" "+ w[report.worker_id].last_name},
                    rep.push(r)
                ))

            }

        }
        return rep
        }
        catch(err){
            console.log(err.response)
        }
    }

    const newReportChange = e => setNewReport({ ...newReport, [e.target.name]: e.target.value });

    const newReportWorkerIdChange = e =>{
        let first_last_name = e.target.value.split(" ");
        let w = workers.find((worker)=>worker.first_name === first_last_name[0] && worker.last_name === first_last_name[1])
        console.log(w.id);
        setNewReport({ ...newReport, worker_id: w.id })
    }

    const newReportSubmit = e => {
        e.preventDefault();
        axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        axios.defaults.xsrfCookieName = "csrftoken";
        axios.defaults.withCredentials = true;
        const formData = new FormData();
        formData.append('my_business', myBusiness.my_business);
        formData.append('worker_id', newReport.worker_id);
        formData.append('project_id', newReport.project_id);
        formData.append('reporting_date', newReport.reporting_date);
        formData.append('start_time', newReport.start_time);
        formData.append('end_time', newReport.end_time);
        formData.append('description', newReport.description);
        setNewReport("");

        axios({
            method: 'post',
            url: "/api/reports/",
            data: formData,
        })
        .then((dataRes) => {
            setReports(dataRes.data)
        }).catch(err=>{ console.log("err", err.response)})
    }

    function scheduleForm(){
        return(
         <form className="right-text" dir='rtl' onSubmit={e => newReportSubmit(e)}>
         <div className="row">
         <input
             className='form-control col-2'
             type='text'
             placeholder= "שם עובד"
             name='worker_id.worker_name'
             value={newReport.worker_id}
             onChange={e => newReportWorkerIdChange(e)}
        />
        <input
             className='form-control col-2'
             type='number'
             placeholder="מספר פרויקט"
             name='project_id'
             value={newReport.project_id}
             onChange={e => newReportChange(e)}
             minLength='1'
        />
        <input
             className='form-control col-2'
             type='date'
             placeholder="תאריך דיוח"
             name='reporting_date'
             value={newReport.reporting_date}
             onChange={e => newReportChange(e)}
        />
        <input
             className='form-control col-2'
             type='time'
             placeholder="כניסה"
             name='start_time'
             value={newReport.start_time}
             onChange={e => newReportChange(e)}
        />
        <input
             className='form-control col-2'
             type='time'
             placeholder="יציאה"
             name='end_time'
             value={newReport.end_time}
             onChange={e => newReportChange(e)}
        />
        <input
             className='form-control col-10'
             type='text'
             placeholder="תיאור"
             name='description'
             value={newReport.description}
             onChange={e => newReportChange(e)}
        />
        </div>
        <button className='btn btn-success' type='submit'>הוספת דוח</button>
         </form>
        )
    }

    const columns = useMemo(
    () => [
           {
            Header: "שם עובד",
            accessor: "worker_id.worker_name",
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

    return(
    <html lang="he" className="right-text" >
            <p>Reports: {JSON.stringify(reports)}</p>
        <p>Workerss: {JSON.stringify(workers)}</p>
        <p>newReports: {JSON.stringify(newReports)}</p>
         <div dir='rtl' class=' container-fluid jumbotron mt-5' lang="he"  style={{  justifyContent:'center'}}>
         <Table
          columns={columns}
          data={newReports}
          dataf={dataf}
          />

          {scheduleForm()}
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