import React, {useEffect, useState } from "react";
import axios from "axios";
import { connect } from 'react-redux';
import {get_user_data } from '../actions/auth';
import PlacesAutocomplete from "react-places-autocomplete";

const WORKER_TYPE =
        {'R': 'חשמלאי',
        'C': 'קבלן',
        'A': 'אדרכל'};

const WorkersManagement  = ({ get_user_data, isAuthenticated}) => {
    const [workers, setWorkers] = useState([]);
    const [addWorker, setAddWorker] = useState({showForm: false, showButton: true, edit: false})
    const [newWorker, setNewWorker] = useState("");
    const [myBusiness, setMyBusiness] = useState({my_business: null});
    // const [dataRes, setDataRes]= useState([]);
    const[changed, setChanged]= useState(false);
    const[showPermet, setShowPermet]= useState(false);
    const [errMsg, setErrMsg]= useState({show: false, msg: ""})
    const [editWorkerid, setEditWorkerid] = useState("");


    const get_workers = async () =>{
        const projects_Res = await axios.get('/api/workers/?my_business=' + myBusiness.my_business+'&is_active=true')
        setWorkers(projects_Res.data);
    }

    const get_user = async ()=>{
        const user_Res = await get_user_data()
        if(user_Res.title === 'M') {
            setMyBusiness({my_business: user_Res.id});
        }
        else {
            const Res = await axios.get(process.env.REACT_APP_API_URL+'/api/my-business/?deputy_director=' + user_Res.id);
            setMyBusiness({my_business: Res.data[0].manager})
        }
    }

    useEffect(()=>{
        get_user()
    },[])

    useEffect(()=>{
        get_workers();
        setChanged(false);
    },[myBusiness, changed])

    useEffect(()=>{
        console.log(editWorkerid)
        if(editWorkerid !== "") {
            let workerData = workers.find((worker) => worker.id === editWorkerid)
            setNewWorker(workerData)
            addWorkerClickHandler()
            console.log(editWorkerid, workerData)
        }
    },[editWorkerid])


    function getImgUrl(image, instance) {
        if (image === null) {
            return process.env.REACT_APP_API_URL+'/media/defaultpictuers/default_'+instance+'_pic.png';
        }
        return image;
    }


    const newWorkerChange = e => { console.log(e.target.value)
        setNewWorker({ ...newWorker, [e.target.name]: e.target.value })};

    const newWorkerCheckChange = e => setNewWorker({ ...newWorker, [e.target.name]: !newWorker.is_active });

    const newWorkerPhoneChange = e =>{
        let len = e.target.value.toString().length;
        if(len  !==0 && (len< 8 || len >10)){
            setErrMsg({show: true, msg: "נא להזין מספר טילפון חוקי בי 8 ל- 10 טווים."})
        }else{
            setErrMsg({show: false, msg: ""})

        }
        setNewWorker({ ...newWorker, [e.target.name]: e.target.value })
    };

    const onChangeAddress = e => setNewWorker({...newWorker,['address']: e});

    let fileSelectedHandler  = e =>{setNewWorker({...newWorker, [e.target.name]: e.target.files[0] })}


    const newWorkerSubmit = e => {
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
        } catch(err){console.log("didn't change license.", formData.license)}

        try{formData.append("permit", newWorker.permit,newWorker.permit.name);
        } catch(err){console.log("didn't change permit.")}

        formData.append('my_business', myBusiness.my_business);
        formData.append('manager', myBusiness.my_business);
        formData.append('email', newWorker.email);
        formData.append('password', newWorker.password);
        formData.append('first_name', newWorker.first_name);
        formData.append('last_name', newWorker.last_name);
        formData.append('phone_number', newWorker.phone_number);
        formData.append('address', newWorker.address);
        formData.append('age', newWorker.age);
        formData.append('title', newWorker.title);
        formData.append('rate_per_day', newWorker.rate_per_day || 0);
        formData.append('permit_type', newWorker.permit_type);
        formData.append('permit_validity', newWorker.permit_validity);
        let active;
        // if(newWorker.is_active === null ||newWorker.is_active === "" ||newWorker.is_active === undefined){
        //      active = true;
        // }
        // else{
        //     active = newWorker.is_active
        // }
        formData.append('is_active', newWorker.is_active);
        console.log("new worker:", newWorker);
        setNewWorker("");

        if(addWorker.edit){
            axios({
                method: 'put',
                url: "/api/workers/"+editWorkerid+"/",
                data: formData,
            })
                .then((dataRes) => {
                    setWorkers(dataRes.data)
                    console.log("workers data edit", dataRes.data)
                    setAddWorker({showForm: false, showButton: true, edit: false});
                    setChanged(true);
                }).catch(err=>{ console.log("err", err.response)})
        } else{
            axios({
                method: 'post',
                url: "/api/workers/",
                data: formData,
            })
                .then((dataRes) => {
                    setWorkers(dataRes.data)
                    console.log("workers data", dataRes.data)
                    setAddWorker({showForm: false, showButton: true, edit: false});
                    setChanged(true);
                }).catch(err=>{ console.log("err", err.response)})
        }
    }

    let addWorkerClickHandler = () => {
        let flag;
        flag = editWorkerid !== "";
        setAddWorker({showForm: true, showButton:  false, edit: flag});
    };

    let dontAddWorkerClickHandler = () => {
        setAddWorker({showForm: false, showButton: true, edit: false});
        setEditWorkerid("");
        setNewWorker("");
    };

    function showPermitFields(){
        return(
            <div>
        <input
            className='form-control'
            type='text'
            placeholder= "סוג רישוי"
            name='permit_type'
            value={newWorker.permit_type}
            onChange={e => newWorkerChange(e)}
        />
        תוקף רישוי:<br/>

        <input
            className='form-control'
            type='date'
            placeholder="תוקף רישוי"
            name='permit_validity'
            value={newWorker.permit_validity}
            onChange={e => newWorkerChange(e)}
        />
            </div>
    )
    }

    function workerForm(){
    return(
    <form className="right-text col-6" dir='rtl' onSubmit={e => newWorkerSubmit(e)}>
        <input
             className='form-control'
             type='text'
             placeholder= "שם פרטי"
             name='first_name'
             value={newWorker.first_name}
             onChange={e => newWorkerChange(e)}
             pattern="^[^0-9]*$"
             required
        />
        <input
             className='form-control'
             type='text'
             placeholder= "שם משפחה"
             name='last_name'
             value={newWorker.last_name}
             onChange={e => newWorkerChange(e)}
             pattern="^[^0-9]*$"
             required
        />
        <input
             className='form-control'
             type='email'
             placeholder= "אימייל"
             name='email'
             value={newWorker.email}
             onChange={e => newWorkerChange(e)}
             required
        />
        <input
             className='form-control'
             type='text'
             placeholder= "סיסמת אפליקציה"
             name='password'
             value={newWorker.password}
             onChange={e => newWorkerChange(e)}
             required
        />
        תמונת פרופיל:<br/>
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
             onChange={e => newWorkerPhoneChange(e)}
             required
        />
        {errMsg.show && <div className="alert alert-danger" role="alert">
            {errMsg.msg}
        </div>}
        <div className='form-group'>
            <PlacesAutocomplete
                value={newWorker.address}
                onChange={e => onChangeAddress(e)}
                onSelect={e => onChangeAddress(e)}
            >
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div>

                        <input className='form-control'
                               required
                               {...getInputProps({ placeholder: 'מקום מיגורים' })} />

                        <div>
                            {loading ? <div>...loading</div> : null}

                            {suggestions.map(suggestion => {
                                const style = {
                                    backgroundColor: suggestion.active ? "#41b6e6" : "#fff"
                                };

                                return (
                                    <div {...getSuggestionItemProps(suggestion, { style })}>
                                        {suggestion.description}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </PlacesAutocomplete>
        </div>
        <input
             className='form-control'
             type='number'
             placeholder="גיל"
             name='age'
             min ='18'
             max='100'
             value={newWorker.age}
             onChange={e => newWorkerChange(e)}

        />
        <div className='form-group dropdown'>
            <select
                className='form-control right-text'
                placeholder='סוג עובד*'
                name='title'
                value={newWorker.title}
                onChange={e => newWorkerChange(e)}
                required
            >
                <option>סוג עובד*</option>
                <option value="C">קבלן</option>
                <option value="A">אדרכל</option>
                <option value="R">חשמלאי</option>
            </select>
        </div>
        צילום של ת"ז:<br/>
        <input className='form-group'
                type = 'file'
                name='id_photo'
                onChange={e => fileSelectedHandler(e)}
        />
        <input
             className='form-control'
             type='number'
             step="any"
             min='0'
             placeholder="תעריף ליום"
             name='rate_per_day'
             value={newWorker.rate_per_day}
             defaultValue={0}
             onChange={e => newWorkerChange(e)}
        />
        צילום רשיון נהיגה:<br/>
        <input className='form-group'
                type = 'file'
                name='license'
                onChange={e => fileSelectedHandler(e)}
        />
        <br/>
        תמונת רשיון עבודה (אם העובד אזרח קבוע נא לא להעלות דבר):<br/>
        <input className='form-group'
                type = 'file'
                name='permit'
                onChange={e => {setShowPermet(true); fileSelectedHandler(e)}}
        />
        {showPermet ? showPermitFields(): ""}
        <br/>
        <div className='text-danger'>העובד פעיל? (שים לב: סימון של עובד כלא פעיל מוריד אותו מהמערכת)</div>
        <input
            type='checkbox'
            placeholder="העובד פעיל"
            name='is_active'
            value={newWorker.is_active}
            checked={newWorker.is_active}
            onChange={e => newWorkerCheckChange(e)}
        />
        <br/>
        <br/>
        {! addWorker.edit && <button className='btn btn-success' type='submit'>הוספה</button>}
        {addWorker.edit && <button className='btn btn-success' type='submit'>עריכה</button>}
        {! addWorker.edit && <button className='btn btn-danger' onClick={dontAddWorkerClickHandler}>בטל הוספת עובד</button>}
        {addWorker.edit && <button className='btn btn-danger' onClick={dontAddWorkerClickHandler}>בטל עריכת עובד</button>}


    </form>
    )
    }

    function loadWorkers(){
        try{
            return(
        workers.map(worker => (
            <div id={"accordion"+ worker.id}  className='col-2' >
                <div className="card polaroid ">
                    <div className="card-header" id={"heading"+worker.id.toString()} >

                        <button className="btn btn-link " data-toggle="collapse" data-target={"#collapse"+worker.id}
                                aria-expanded="true" aria-controls={"collapse"+worker.id}>
                            <img src={getImgUrl(worker.photo, "worker")} height={150} width={150}></img>
                            <p className='lead'>{worker.first_name} {worker.last_name} - {WORKER_TYPE[worker.title]}</p>
                        </button>

                    </div>

                    <div id={"collapse"+worker.id} className="collapse " aria-labelledby={"heading"+worker.id} data-parent={"#accordion"+worker.id}>
                        <div className="card-body">
                            <p>אימייל: {worker.email}</p>
                            <p>סיסמת האפליקציה: {worker.password}</p>
                            <p>מספר טילפון: {worker.phone_number}</p>
                            <p>כתובת מיגורים: {worker.address}</p>
                            <p>תעריף לשעה: {worker.rate_per_day? worker.rate_per_day : "לא נקבע"}</p>
                            <p><a href={worker.id_photo} >{worker.id_photo? "לינק לתעודת זהות": ""}</a></p>
                            <p><a href={worker.license} >{worker.license? "לינק לרשיון נהיגה": ""}</a></p>
                            <p><a href={worker.permit} >{worker.permit? "לינק לרשיון עבודה": ""}</a></p>
                            <div className='row'>
                            <p className='col-5'><a onClick={() => setEditWorkerid(worker.id)}><img src={process.env.REACT_APP_API_URL+"/media/defaultpictuers/edit.png"} height={20} width={20}/></a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )))
        } catch(err){
        }
    }

   //<p>Workers: {JSON.stringify(workers)}</p>
    return(
    <div>
     <html lang="he" >
        <head>
        <meta charSet="utf-8"></meta>
        </head>
        <body dir="rtl">

        <div class = "container-fluid row mt-5 ml-3 right-text">
             {loadWorkers()}
        </div>

            <div  class=' container-fluid  mt-5'  style={{  justifyContent:'right'}} >
                 {addWorker.showButton && <button  className='btn btn-primary mr-5' onClick={addWorkerClickHandler} style={{ display: 'flex', alignItems:'right'}} >תוסיף עובד חדש</button>}

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
