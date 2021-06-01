import React, {useEffect, useState } from "react";
import axios from "axios";
import { connect } from 'react-redux';
import {get_user_data } from '../actions/auth';
import PlacesAutocomplete from "react-places-autocomplete";

const WORKER_TYPE =
        {'R': 'חשמלאי רגיל',
        'C': 'קבלן',
        'A': 'מהנדס'};

const WorkersManagement  = ({ get_user_data, isAuthenticated}) => {
    const [workers, setWorkers] = useState([]);
    const [addWorker, setAddWorker] = useState({showForm: false, showButton: true})
    const [newWorker, setNewWorker] = useState("");
    const [myBusiness, setMyBusiness] = useState({my_business: null});
    // const [dataRes, setDataRes]= useState([]);
    const[changed, setChanged]= useState(false);


    const get_workers = async () =>{
        const projects_Res = await axios.get('/api/workers/?my_business=' + myBusiness.my_business)
        setWorkers(projects_Res.data);
    }

    const get_user = async ()=>{
        const user_Res = await get_user_data()
        setMyBusiness({my_business: user_Res.id});
    }

    useEffect(()=>{
        get_user()
    },[])

    useEffect(()=>{
        get_workers();
        setChanged(false);
    },[myBusiness, changed])


    function getImgUrl(image, instance) {
        console.log(image, instance);
        if (image === null) {
            return process.env.REACT_APP_API_URL+'/media/defaultpictuers/default_'+instance+'_pic.png';
        }
        return image;
    }


    const newWorkerChange = e => setNewWorker({ ...newWorker, [e.target.name]: e.target.value });

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
        } catch(err){console.log("didn't change license.")}

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
        formData.append('rate_per_day', newWorker.rate_per_day);
        formData.append('permit_type', newWorker.permit_type);
        formData.append('permit_validity', newWorker.permit_validity);
        formData.append('is_active', newWorker.is_active);
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
            setAddWorker({showForm: false, showButton: true});
            setChanged(true);
        }).catch(err=>{ console.log("err", err.response)})

    }

    let addWorkerClickHandler = () => {
        setAddWorker({showForm: true, showButton:  false});
    };

    let dontAddWorkerClickHandler = () => {
        setAddWorker({showForm: false, showButton: true});
        setNewWorker("");
    };

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
             name='password'
             value={newWorker.password}
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
        <div className='form-group'>
            <PlacesAutocomplete
                value={newWorker.address}
                onChange={e => onChangeAddress(e)}
                onSelect={e => onChangeAddress(e)}
            >
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div>

                        <input className='form-control'
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
        העובד פעיל .
        <input
            type='checkbox'
            placeholder="העובד פעיל"
            name='is_active'
            value={newWorker.is_active}
            onChange={e => newWorkerChange(e)}
        />
        <br></br>
        <button className='btn btn-success' type='submit'>הוספה</button>
        <button className='btn btn-danger' onClick={dontAddWorkerClickHandler}>בטל הוספת עובד</button>


    </form>
    )
    }

    function loadWorkers(){
        try{
            return(
        workers.map(worker => (
            <div id={"accordion"+ worker.id}  className='col-2'>
                <div className="card">
                    <div className="card-header" id={"heading"+worker.id.toString()} >

                        <button className="btn btn-link " data-toggle="collapse" data-target={"#collapse"+worker.id}
                                aria-expanded="true" aria-controls={"collapse"+worker.id}>
                            <img src={getImgUrl(worker.photo, "worker")} height={150} width={150}></img>
                            <p className='lead'>{worker.first_name} {worker.last_name} - {WORKER_TYPE[worker.title]}</p>
                        </button>

                    </div>

                    <div id={"collapse"+worker.id} className="collapse " aria-labelledby={"heading"+worker.id} data-parent={"#accordion"+worker.id}>
                        <div className="card-body">
                            <p>{worker.email}</p>
                            <p>{worker.password}</p>
                            <p>{worker.phone_number}</p>
                            <p>{worker.address}</p>
                            <p>{worker.rate_per_day}</p>
                            <p><a href={worker.id_photo} >תעודת זהות</a></p>
                            <p> <a href={worker.license} >רשיון נהיגה</a></p>
                            <p><a href={worker.permit}>רשיון עבודה</a></p>
                            <p>{worker.is_active ? "פעיל" : "לא פעיל"}</p>

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
        <div class = "container-fluid row mt-5 mr-5">
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
