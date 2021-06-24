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
    const [editCar, setEditCar] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [workers, setWorkers] = useState([]);


    const get_workers = async () =>{
        const projects_Res = await axios.get('/api/workers/?my_business=' + business.manager +'&is_active=true')
        setWorkers(projects_Res.data);
    }



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
            .get(process.env.REACT_APP_API_URL+"/api/cars/?my_business="+ business.manager+"&is_working=true" )
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
            get_cars()
            get_workers()
        }
    },[business])

    const editCarChange = e => {setEditCar({ ...editCar, [e.target.name]: e.target.value })};

    let carImageHandler  = event =>{setEditCar({...editCar,image: event.target.files[0] })}

    const editCarCheckChange = e => {
        console.log(e.target.checked)
        setEditCar({ ...editCar, [e.target.name]: e.target.checked})};



    const editCarSubmit = e => {
        e.preventDefault();
        setShowForm(false)
        axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        axios.defaults.xsrfCookieName = "csrftoken";
        axios.defaults.withCredentials = true;
        const formData = new FormData();
        try{
            formData.append(
                "image",
                editCar.image,
                editCar.image.name
            );
        } catch(err){
            console.log("didn't change image.")
        }

        formData.append('my_business', business.manager);
        formData.append('company_name', editCar.company_name)
        formData.append('manufacture_year', editCar.manufacture_year)
        formData.append('driver_email', editCar.driver_email)
        formData.append('license_number', editCar.license_number)
        formData.append('license_validity', editCar.license_validity)
        formData.append('insurance_validity', editCar.insurance_validity)
        formData.append('insurance_up_to_age', editCar.insurance_up_to_age)
        formData.append('description', editCar.description)
        formData.append('is_working', editCar.is_working)
        setEditCar({company_name:"",
            manufacture_year:"",
            license_number: "",
            license_validity: "",
            insurance_validity: "",
            insurance_up_to_age: "",
            description: "",
            image: "",
            is_working:""
        })
        axios({
            method: 'put',
            url: "/api/cars/"+editCar.id+"/",
            data: formData,
        })
            .then((dataRes) => {
                console.log(dataRes.data)
                setCars(...cars,dataRes.data)
            }).catch(err=>{ console.log("err", err.response)})

    }

    function getWorkersNames(arr){
        try {
            return(
                arr.map(worker => (
                    <option value={worker.email}>{worker.first_name+" "+ worker.last_name}</option>
                ))
            )
        } catch(err){}
    }

    function carForm(){
        return(
        <form dir='rtl' onSubmit={e => editCarSubmit(e)}>
            <div className='form-group'>
                <input
                    className='form-control'
                    type='text'
                    placeholder="חברת ייצור:"
                    name='company_name'
                    value={editCar.company_name}
                    onChange={e => editCarChange(e)}
                    required
                />
            </div>
            <div className='form-group'>
                <input
                    className='form-control'
                    type='number'
                    placeholder="שנת ייצור:"
                    name='manufacture_year'
                    value={editCar.manufacture_year}
                    onChange={e => editCarChange(e)}
                    required
                />
            </div>
            <div className='form-group dropdown'>
                <select
                    className='form-control right-text'
                    placeholder='שם נהג*'
                    name='driver_email'
                    value={editCar.driver_email}
                    onChange={e => editCarChange(e)}
                    required
                >
                    <option>שם נהג*</option>
                    <option value={manager.email}>{manager.first_name+" "+ manager.last_name+"-המנהל"}</option>
                    <option value={director.email}>{director.first_name+" "+ director.last_name+"-הסגן מנהל"}</option>
                    {getWorkersNames(workers)}
                </select>
            </div>
            <div className='form-group'>
                <input
                    className='form-control'
                    type='number'
                    placeholder="מספר רישוי"
                    name='license_number'
                    value={editCar.license_number}
                    onChange={e => editCarChange(e)}
                    required
                />
            </div>
            <div className='form-group'>
                תוקף רישוי
                <input
                    className='form-control'
                    type='date'
                    placeholder="תוקף רישוי"
                    name='license_validity'
                    value={editCar.license_validity}
                    onChange={e => editCarChange(e)}
                    required
                />
            </div>
            <div className='form-group'>
                תוקף ביטוח
                <input
                    className='form-control'
                    type='date'
                    placeholder="תוקף ביטוח"
                    name='insurance_validity'
                    value={editCar.insurance_validity}
                    onChange={e => editCarChange(e)}
                    required
                />
            </div>
            <div className='form-group'>
                <input
                    className='form-control'
                    type='number'
                    placeholder="ביטוח עד גיל"
                    name='insurance_up_to_age'
                    value={editCar.insurance_up_to_age}
                    min='18'
                    max='100'
                    onChange={e => editCarChange(e)}
                />
            </div>
            <div className='form-group'>
                <input
                    className='form-control'
                    type='text'
                    placeholder="תיאור הרכב/ הערות"
                    name='description'
                    value={editCar.description}
                    onChange={e => editCarChange(e)}
                />
            </div>
            תמונת רכב
            <div className='form-group'>

                <input className='form-group'
                       type = 'file'
                       onChange={e => carImageHandler(e)}
                />
            </div>
            <div className='text-danger'>הרכב פעיל? (שים לב: סימון של רכב כלא פעיל מוריד אותו מהמערכת)</div>
            <input
                type='checkbox'
                placeholder="הרכב פעיל"
                name='is_working'
                value={editCar.is_working}
                defaultChecked
                onChange={e => editCarCheckChange(e)}
            />
            <br/>
            <button className='btn btn-primary' type='submit'>עדכן את פרטי הרכב</button>
        </form>
        )
    }

    function getImgUrl(image, instance) {

        if (image === null) {
            return process.env.REACT_APP_API_URL+'/media/defaultpictuers/default_'+instance+'_pic.png';
        }
        return image;
    }

    function showCar(car){
        let driver="";
        workers.forEach(w =>
        {if(w.email === car.driver_email){
            driver =w;
        }});
        if (driver ===""){
            if(manager.email === car.driver_email){
                driver = manager;
            }
            else if(director.email === car.driver_email){
                driver = director;
            }
        }
        return(
            <div className="row ">
                <div className='col-5'>
                    <p className='lead'>נהג הרכב: {driver.first_name + " "+ driver.last_name}</p>
                    <p className='lead'>מספר רישוי: {car.license_number}</p>
                    <p className='lead'>תוקף רישוי: {car.license_validity} </p>
                    <p className='lead'>תוקף ביטוח: {car.insurance_validity}</p>
                    <p className='lead'>ביטוח עד גיל: {car.insurance_up_to_age}</p>
                    <p className='lead'>תיאור הרכב: {car.description}</p>
                    <img src={process.env.REACT_APP_API_URL+"/media/defaultpictuers/edit.png"} height={20} width={20} style={{cursor: "pointer"}}
                         onClick={() => {setEditCar(car); setShowForm(true)}}/>

                </div>
                <div className='col-5'>
                    <img src={getImgUrl(car.image, "car")} height={200} width={300}></img>
                </div>
            </div>
        )
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
                            {car.company_name} - {car.manufacture_year}
                        </button>
                    </h5>
                </div>

                <div id={"collapse"+car.id} className="collapse" aria-labelledby={"heading"+car.id} data-parent="#accordion">
                    <div className="card-body">
                        {showForm && car.id === editCar.id? carForm() : showCar(car)}
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
        <div class = "container-fluid right-text row mt-5 mb-5 ">
            <div className='col-1'></div>
            <form className='col-3'>
            <Link class='btn btn-outline-warning btn-lg' to='/my-business-details-update' role='button' >עדכן את פרטי העסק שלי</Link>
            </form>
                <div className='col-2'></div>
                <h1 className='col-3'>{business.name}</h1>
               <img className='col-1' src={getImgUrl(business.logo, "business")} height={70} width={70} ></img>
            <div className='col-1'></div>

        </div>
        <hr className='col-10'/>
        <div class = "container-fluid right-text align-items-center">
        <div class = "row ">

            <div className='col-1'></div>
        <div className='container col-4' >
           <div class = "row ">
           <div class=' mt-5 col-6'>
                <h1 class='display-4'>מנהל העסק</h1>
           </div>
               <div class='mt-5 col-6'>
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
           <div class='mt-5 col-6'>
                <h1 class='display-4'>סגן מנהל</h1>
           </div>
               <div class='mt-5 col-6'>
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
            <hr/>
            <br/>
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
