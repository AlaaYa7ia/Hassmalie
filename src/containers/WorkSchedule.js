import React, { Component,useMemo, useEffect, setState, useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { connect } from 'react-redux';
import {get_user_data } from '../actions/auth';
import { Link, Redirect } from 'react-router-dom';
import Table from "../components/Table";
import generatePDF from "../components/reportGenerator";

const WorkSchedule  = ({ get_user_data, isAuthenticated}) => {
    const [reports, setReports] = useState({reports:[]});
    const [workers, setWorkers] = useState([]);
    const [fixed, setFixed] = useState(false);
    const [dataRes, setDataRes]= useState([]);
    const [newReport, setNewReport] = useState("");
    const [myBusiness, setMyBusiness] = useState({my_business: null});
    const [showEditReport, setShowEditReport] = useState(false)
    const [rowToEdit, setRowToEdit]=useState("");
    const [editReport, setEditReport] = useState("");
    let data = [];
    let dataf = new Set();

    const get_reports = async (dataRes) =>{
    const Report_Res = await axios.get('/api/reports/?my_business=' + dataRes)
    //console.log("Report_Res.data", Report_Res.data)
    setReports({reports: Report_Res.data});
    setFixed(false);
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
      //console.log(workers);
      get_reports(dataRes)

    },[dataRes])

    useEffect(()=>{
      fix_data()
    },[reports, workers])


    function fix_data(){
        try{
        if(reports.reports.length !== 0 && workers.length !== 0){
            let workerData;
            //console.log("reports",reports.reports, reports.reports.length)
            reports.reports.forEach(report => (
                    workerData = workers.find((worker)=>worker.id === report.worker_id),
                    report.worker_name=workerData.first_name +" "+ workerData.last_name
                ))
            setFixed(true);
        }
        //console.log("reports after",reports.reports, reports.reports.length)
        }
        catch(err){
            console.log(err)
        }
    }

    const editReportChange = e => setEditReport({ ...editReport, [e.target.name]: e.target.value });
    let fileSelectedHandlerEdit  = e =>{setEditReport({...editReport, [e.target.name]: e.target.files[0] })}

    const editReportWorkerIdChange = e =>{
        let first_last_name = e.target.value.split(" ");
        setEditReport({ ...editReport, first_name: first_last_name[0],
        last_name: first_last_name[1]})

    }

    const editReportSubmit = e =>{
        e.preventDefault();
        axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        axios.defaults.xsrfCookieName = "csrftoken";
        axios.defaults.withCredentials = true;
        const formData = new FormData();
        formData.append('my_business', myBusiness.my_business);
        formData.append('id', editReport.id);
        formData.append('worker_id', editReport.worker_id);
        formData.append('project_id', editReport.project_id);
        formData.append('reporting_date', editReport.reporting_date);
        formData.append('start_time', editReport.start_time);
        formData.append('end_time', editReport.end_time);
        formData.append('description', editReport.description);
        try{formData.append("photo", editReport.photo,editReport.photo.name);
        } catch(err){console.log("didn't change photo.")}
        setEditReport("");

        axios({
            method: 'put',
            url: "/api/reports/"+editReport.id+"/",
            data: formData,
        })
        .then((Res) => {
            setFixed(false);
            setShowEditReport(false);
            const dataCopy = [...reports.reports];
            dataCopy[rowToEdit] = Res.data
            //console.log("dataCopy", dataCopy);
            setReports({reports: dataCopy});
            setRowToEdit("");
            //setReports({reports:[...reports.reports, Res.data]});
        }).catch(err=>{ console.log("err",err, err.response)})
    }

    const newReportChange = e => setNewReport({ ...newReport, [e.target.name]: e.target.value });
    let fileSelectedHandler  = e =>{setNewReport({...newReport, [e.target.name]: e.target.files[0] })}

    const newReportWorkerIdChange = e =>{
        let first_last_name = e.target.value.split(" ");
        let w = workers.find((worker)=>worker.first_name === first_last_name[0] &&
         worker.last_name === first_last_name[1]);
         if(w !== undefined){
        setNewReport({ ...newReport, worker_id: w.id });
        }
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
        try{formData.append("photo", newReport.photo,newReport.photo.name);
        } catch(err){console.log("didn't change photo.")}
        setNewReport("");

        axios({
            method: 'post',
            url: "/api/reports/",
            data: formData,
        })
        .then((Res) => {
            setFixed(false);
            setReports({reports:[...reports.reports, Res.data]});
        }).catch(err=>{ console.log("err", err.response)})
    }

    function scheduleForm(){
        return(
         <form className="right-text col-8 mt-5 center1" dir='rtl' onSubmit={e => newReportSubmit(e)}>
         <div className="row">
         <input
             className='form-control col-2'
             type='text'
             placeholder= "שם עובד"
             name='worker_name'
             value={newReport.worker_name}
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
        <input className='form-group'
               type = 'file'
               name='photo'
               onChange={e => fileSelectedHandler(e)}
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
            accessor: "worker_name",
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
        {
            Header: "קובץ מצורף",
            accessor: "photo",
            disableSortBy: true,
            filterable: false
        },
          {
        Header: "",
        id: "delete",
        accessor: (str) => "delete",

        Cell: (tableProps) => (
          <span
            style={{cursor: "pointer"}}
            onClick={() => {
              // ES6 Syntax use the rvalue if your data is an array.
              const dataCopy = [...reports.reports];
              // It should not matter what you name tableProps. It made the most sense to me.
              dataCopy.splice(tableProps.row.index, 1);
              setReports({reports: dataCopy});
            }}
          >
           <img src={process.env.REACT_APP_API_URL+"/media/defaultpictuers/x.png"} height={20} width={20}/>
          </span>
        )
      },
      {
        Header: "",
        id: "edit",
        accessor: (str) => "edit",

        Cell: (tableProps) => (
          <span
            style={{cursor: "pointer"}}
            onClick={() => {
              setRowToEdit(tableProps.row.index);
              setEditReport(tableProps.row.original)
              setShowEditReport(true);
            }}
          >
           <img src={process.env.REACT_APP_API_URL+"/media/defaultpictuers/edit.png"} height={20} width={20}/>
          </span>
        )
      }
    ],
    [reports]
  );

    function editMyReport(){
        console.log(rowToEdit)
        return(
         <form className="right-text col-8 mt-5 center1" dir='rtl' onSubmit={e => editReportSubmit(e)}>
         <div className="row">
         <input
             className='form-control col-2'
             type='text'
             placeholder= {editReport.worker_name}
             name='worker_name'
             value={editReport.worker_name}
             onChange={e => editReportWorkerIdChange(e)}
        />
        <input
             className='form-control col-2'
             type='number'
             placeholder={editReport.project_id}
             name='project_id'
             value={editReport.project_id}
             onChange={e => editReportChange(e)}
             minLength='1'
        />
        <input
             className='form-control col-2'
             type='date'
             placeholder={editReport.reporting_date}
             name='reporting_date'
             value={editReport.reporting_date}
             onChange={e => editReportChange(e)}
        />
        <input
             className='form-control col-2'
             type='time'
             placeholder={editReport.start_time}
             name='start_time'
             value={editReport.start_time}
             onChange={e => editReportChange(e)}
        />
        <input
             className='form-control col-2'
             type='time'
             placeholder={editReport.end_time}
             name='end_time'
             value={editReport.end_time}
             onChange={e => editReportChange(e)}
        />
        <input
             className='form-control col-10'
             type='text'
             placeholder={editReport.description}
             name='description'
             value={editReport.description}
             onChange={e => editReportChange(e)}
        />
             <input className='form-group'
                    type = 'file'
                    name='photo'
                    onChange={e => fileSelectedHandlerEdit(e)}
             />
        </div>
        <button className='btn btn-success' type='submit'>עדכן דוח</button>
         </form>
        )
    }

    function showTable(){
    if (fixed === true){
    return(
          <Table
          columns={columns}
          data={reports.reports}
          dataf={dataf}
          />
          )
    }
    }
    return(
    <html lang="he" className="right-text" style={{backgroundColor: 'rgba(145, 255, 0, 0.1)'}}>

         <div class=' container-fluid mb-5 center1' lang="he"  style={{  justifyContent:'center' }}>
             <div className="right-text col-8 mt-5 center1" dir='rtl'>
             <h1>דיווחים של העובדים</h1>
             <button
                 className="btn btn-primary mt-5"
                 onClick={() => generatePDF(dataf)}
             >
                 Generate monthly report
             </button>
             </div>
          {showTable()}

          {showEditReport ? editMyReport(): ""}
          {scheduleForm()}
             <div><br></br><br></br><br></br></div>
         </div>

    </html>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
    });
export default connect(mapStateToProps, { get_user_data })(WorkSchedule);