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
    const [projectsIds, setProjectIds] = useState([]);
    const [alert, setAlert] = useState({showAlert: false, alert:""});

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
            let projects = new Set();
        if(reports.reports.length !== 0 && workers.length !== 0){
            let workerData;
            //console.log("reports",reports.reports, reports.reports.length)
            reports.reports.forEach(report => (
                projects.add(report.project_id),
                    workerData = workers.find((worker)=>worker.id === report.worker_id),
                    report.worker_name=workerData.first_name +" "+ workerData.last_name
                ))
            setProjectIds(projects)
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

    function checkDate(d,s,e){
        let report_date = new Date(d);
        let now = new Date();
        if(report_date > now){
            setAlert({showAlert: true, alert:"לא ניתן לבחור תאריך עתידי."})
            return false;
        }
        let start = new Date('December 17, 1995 '+ s);
        let end = new Date('December 17, 1995 '+ e);
        if(report_date.getFullYear() === now.getFullYear() && report_date.getMonth() === now.getMonth()
            && report_date.getDate() === now.getDate()){
            if(start.getHours() > now.getHours() || end.getHours() > now.getHours()){
                setAlert({showAlert: true, alert:"לא ניתן לבחור זמן עתידי או שווה לזמן הנוכחי."})
                return false;
            }
            if( start.getHours() === now.getHours() || end.getHours() === now.getHours()){
                if(start.getMinutes() >= now.getMinutes() || end.getMinutes() >= now.getMinutes()){
                    setAlert({showAlert: true, alert:"לא ניתן לבחור זמן עתידי או שווה לזמן הנוכחי."})
                    return false;
                }
            }
        }

        if(start.getTime() >= end.getTime()){
            setAlert({showAlert: true, alert:"שעת סיום צריכה להיות אחרי שעת התחלה."})
            return false;
        }
        return true;
    }

    const editReportSubmit = e =>{
        e.preventDefault();
        setAlert({showAlert: false, alert:""})
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
        let des = "אין תיאור";
        formData.append('description', editReport.description?editReport.description: des);
        try{formData.append("photo", editReport.photo,editReport.photo.name);
        } catch(err){console.log("didn't change photo.")}

        if(checkDate(editReport.reporting_date, editReport.start_time, editReport.end_time)) {
            setEditReport({
                worker_name: "",
                project_id: "",
                reporting_date: "",
                start_time: "",
                end_time: "",
                description: "",
                photo: "",
            });

            axios({
                method: 'put',
                url: "/api/reports/" + editReport.id + "/",
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
                }).catch(err => {
                console.log("err", err, err.response)
            })
        }
    }

    const newReportChange = e => setNewReport({ ...newReport, [e.target.name]: e.target.value });
    let fileSelectedHandler  = e =>{setNewReport({...newReport, [e.target.name]: e.target.files[0] })}

    const newReportWorkerIdChange = e =>{
        let first_last_name = e.target.value.split("*");
        let w = workers.find((worker)=>worker.first_name === first_last_name[0] &&
         worker.last_name === first_last_name[1]);
         if(w !== undefined){
        setNewReport({ ...newReport, worker_id: w.id });
        }
    }

    function getWorkersNames(){
        try {
            return(
                workers.map(worker => (
                    <option value={worker.first_name+"*"+ worker.last_name}>{worker.first_name+" "+ worker.last_name}</option>
                ))
            )
        } catch(err){}
    }

    function getProjectsIds(){
        try {
            const myArr = Array.from(projectsIds)
            return (
                myArr.map(value =>(

                    <option value={value}>{value}</option>
                ))
        )


        } catch(err){}
    }
    const newReportSubmit = e => {
        e.preventDefault();
        setAlert({showAlert: false, alert:""})
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
        let des = "אין תיאור";
        formData.append('description', newReport.description?newReport.description: des);
        try{formData.append("photo", newReport.photo,newReport.photo.name);
        } catch(err){console.log("didn't change photo.")}

        if(checkDate(newReport.reporting_date, newReport.start_time, newReport.end_time)) {
            setNewReport({worker_name:"",
                project_id:"",
                reporting_date:"",
                start_time:"",
                end_time:"",
                description:"",
                photo:"",
            });
            axios({
                method: 'post',
                url: "/api/reports/",
                data: formData,
            })
                .then((Res) => {
                    setFixed(false);
                    setReports({reports: [...reports.reports, Res.data]});
                }).catch(err => {
                console.log("err", err.response)
            })
        }

    }

    function scheduleForm(){
        return(

         <form className="right-text col-8 mt-5 center1" dir='rtl' onSubmit={e => newReportSubmit(e)}>
         <div className="row">
             <div className='form-group dropdown'>
                 <select
                     className='form-control right-text'
                     placeholder='שם עובד*'
                     name='worker_name'
                     value={newReport.worker_name}
                     onChange={e => newReportWorkerIdChange(e)}
                     required
                 >
                     <option value="">שם עובד*</option>
                     {getWorkersNames()}
                 </select>
             </div>

             <div className='form-group dropdown'>
                 <select
                     className='form-control right-text'
                     placeholder='מספר פרויקט*'
                     name='project_id'
                     value={newReport.project_id}
                     onChange={e => newReportChange(e)}
                     required
                 >
                     <option value="">מספר פרויקט*</option>
                     {getProjectsIds()}
                 </select>
             </div>
        <input
             className='form-control col-2'
             type='date'
             placeholder="תאריך דיוח"
             name='reporting_date'
             value={newReport.reporting_date}
             onChange={e => newReportChange(e)}
             required
        />
        <input
             className='form-control col-2'
             type='time'
             placeholder="כניסה"
             name='start_time'
             value={newReport.start_time}
             onChange={e => newReportChange(e)}
             required
        />
        <input
             className='form-control col-2'
             type='time'
             placeholder="יציאה"
             name='end_time'
             value={newReport.end_time}
             onChange={e => newReportChange(e)}
             required
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
        <button className='btn btn-outline-success' type='submit'>הוספת דוח</button>
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
        return(
         <form className="right-text col-8 center1" dir='rtl' onSubmit={e => editReportSubmit(e)}>
         <div className="row">
         <input
             className='form-control col-2'
             type='text'
             placeholder= {editReport.worker_name}
             name='worker_name'
             value={editReport.worker_name}
             onChange={e => editReportWorkerIdChange(e)}
             required
        />
             <div className='form-group dropdown'>
                 <select
                     className='form-control right-text'
                     placeholder={editReport.project_id}
                     name='project_id'
                     value={editReport.project_id}
                     onChange={e =>editReportChange(e)}
                     required
                 >
                     <option value={editReport.project_id}>{editReport.project_id}</option>
                     {getProjectsIds()}
                 </select>
             </div>
        <input
             className='form-control col-2'
             type='date'
             placeholder={editReport.reporting_date}
             name='reporting_date'
             value={editReport.reporting_date}
             onChange={e => editReportChange(e)}
             required
        />
        <input
             className='form-control col-2'
             type='time'
             placeholder={editReport.start_time}
             name='start_time'
             value={editReport.start_time}
             onChange={e => editReportChange(e)}
             required
        />
        <input
             className='form-control col-2'
             type='time'
             placeholder={editReport.end_time}
             name='end_time'
             value={editReport.end_time}
             onChange={e => editReportChange(e)}
             required
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
        <button className='btn btn-outline-success' type='submit'>עדכן דוח</button>
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
    <html lang="he" className="right-text" >

         <div class=' container-fluid mb-5 center1' lang="he"  style={{  justifyContent:'center' }}>
             <div className="right-text col-8 mt-5 center1" dir='rtl'>
             <h1>דיווחים של העובדים</h1>
                 <hr/>
             <button
                 className="btn btn-outline-warning mt-5"
                 onClick={() => generatePDF(dataf)}
             >
                    להפקת דוח חודשי (PDF)
             </button>
             </div>

          {showTable()}
                 <div className="right-text col-8 center1" dir='rtl'>
             {alert.showAlert && <div className="alert alert-danger" role="alert">
                 {alert.alert}
             </div>}
                 </div>
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