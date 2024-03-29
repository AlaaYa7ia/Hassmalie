import React, { Component, useEffect, setState, useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { connect } from 'react-redux';
import {get_user_data, logout } from '../actions/auth';
import { Link, useHistory, Redirect } from 'react-router-dom';

import MyBusinessDetails from '../containers/MyBusinessDetails';
import PlacesAutocomplete from "react-places-autocomplete";


const MyBusinessDetailsUpdate = ({ get_user_data,logout, isAuthenticated}) => {
    const [manager, setManager] = useState("");
    const [director, setDirector] = useState("");
    // const [cars, setCars] = useState([]);
    const [business, setBusiness] = useState("");
    const [newUser, setNewUser] = useState("");
    const [newCar, setNewCar] = useState("");
    const [errMsg, setErrMsg]= useState({show: false, msg: ""})
    const [errMsg1, setErrMsg1]= useState({show: false, msg: ""})

    const [managerFlag, setManagerFlag] = useState(false);
    const [directorFlag, setDirectorFlag] = useState(false);
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

    // const get_cars= async ()=> {
    //     await axios
    //         .get(process.env.REACT_APP_API_URL+"/api/cars/?my_business="+ business.manager )
    //         .then((dataRes) => {
    //             setCars(dataRes.data)
    //         })
    // }
    useEffect(()=>{
        get_user()
    },[])

    useEffect(()=>{
        if(managerFlag) {
            get_business('M')
        }
    },[managerFlag])

    useEffect(()=>{
        if(directorFlag){
            get_business('D')
        }
    },[directorFlag])

    useEffect(()=>{
        if(business !== ""){
            if(director !== ""){
                get_other_user('D')
            }else{
                get_other_user('M')
            }
            get_workers();

        }
    },[business])

    const newMangerPhoneChange = e =>{
        let len = e.target.value.toString().length;
        if(len  !==0 && (len< 8 || len >10)){
            setErrMsg({show: true, msg: "נא להזין מספר טילפון חוקי בי 8 ל- 10 טווים."})
        }else{
            setErrMsg({show: false, msg: ""})

        }
        setManager({ ...manager, [e.target.name]: e.target.value });
    };

    const newDirectorPhoneChange = e =>{
        let len = e.target.value.toString().length;
        if(len  !==0 && (len< 8 || len >10)){
            setErrMsg1({show: true, msg: "נא להזין מספר טילפון חוקי בי 8 ל- 10 טווים."})
        }else{
            setErrMsg1({show: false, msg: ""})

        }
        setDirector({ ...director, [e.target.name]: e.target.value });
    };

    let fileSelectedHandler = event =>{setBusiness({...business,logo: event.target.files[0] })}
    let carImageHandler  = event =>{setNewCar({...newCar,image: event.target.files[0] })}
    let directorImageHandler  = event =>{setDirector({...director, photo: event.target.files[0] })}
    let managerImageHandler  = event =>{setManager({...manager, photo: event.target.files[0] })}

    const managerChange = e => setManager({ ...manager, [e.target.name]: e.target.value });
    const managerChangeAddress = e => setManager({...manager,['address']: e});
    const directorChange = e => setDirector({ ...director, [e.target.name]: e.target.value });
    const directorChangeAddress = e => setDirector({...director,['address']: e});
    const businessChange = e => setBusiness({ ...business, [e.target.name]: e.target.value });
    const newCarChange = e => {setNewCar({ ...newCar, [e.target.name]: e.target.value })};

    const mangerSubmit = e => {
        e.preventDefault();
        axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        axios.defaults.xsrfCookieName = "csrftoken";
        axios.defaults.withCredentials = true;
        const formData = new FormData();
        try{
        formData.append(
        'photo',
        manager.photo,
        manager.photo.name
        );
        } catch(err){
            console.log("didn't change image.")
        }
        formData.append('first_name', manager.first_name);
        formData.append('last_name', manager.last_name);
        formData.append('phone_number', manager.phone_number);
        formData.append('email', manager.email);
        formData.append('address', manager.address);
        formData.append('password', manager.password);
        formData.append('title', manager.title);
        formData.append('age', manager.age);

        axios
        .put("/api/users/"+manager.id+"/",
        formData
        )
        .then((dataRes) => {
            setManager(dataRes.data)
        }).catch(err=>{ console.log("err", err.response)})
        //if changed title or email?
    };

    const newCarCheckChange = e => {
        setNewCar({ ...newCar, [e.target.name]: e.target.checked})};


    const directorSubmit = e => {
        e.preventDefault();
        axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        axios.defaults.xsrfCookieName = "csrftoken";
        axios.defaults.withCredentials = true;
        const formData = new FormData();
        try{
        formData.append(
        'photo',
        director.photo,
        director.photo.name
        );
        } catch(err){
            console.log("didn't change image.")
        }
        formData.append('first_name', director.first_name);
        formData.append('last_name', director.last_name);
        formData.append('phone_number', director.phone_number);
        formData.append('email', director.email);
        formData.append('address', director.address);
        formData.append('password', director.password);
        formData.append('title', director.title);
        formData.append('age', director.age);
        axios
        .put("/api/users/"+director.id+"/",
        formData)
        .then((dataRes) => {
            setDirector(dataRes.data)
        }).catch(err=>{ console.log("err")})
        //if changed title or email?
    };
     const businessSubmit = e => {
        e.preventDefault();

        const formData = new FormData();
        try{
        formData.append(
        "logo",
        business.logo,
        business.logo.name
        );
        } catch(err){
            console.log("didn't change image.")
        }
        formData.append('manager', business.manager);
        formData.append('deputy_director', business.deputy_director);
        formData.append('name', business.name);


        axios({
            method: 'put',
            url: "/api/my-business/"+business.manager+"/",
            data: formData,
            header: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            },
        })
        .then((dataRes) => {
            setBusiness(dataRes.data)
        }).catch(err=>{ console.log("err", err.response)})
     };

     const newCarSubmit = e => {
        e.preventDefault();
        axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        axios.defaults.xsrfCookieName = "csrftoken";
        axios.defaults.withCredentials = true;
        const formData = new FormData();
        try{
        formData.append(
        "image",
        newCar.image,
        newCar.image.name
        );
        } catch(err){
            console.log("didn't change image.")
        }

        formData.append('my_business', business.manager);
         formData.append('company_name', newCar.company_name)
         formData.append('manufacture_year', newCar.manufacture_year)
         formData.append('driver_email', newCar.driver_email)
         formData.append('license_number', newCar.license_number)
        formData.append('license_validity', newCar.license_validity)
        formData.append('insurance_validity', newCar.insurance_validity)
        formData.append('insurance_up_to_age', newCar.insurance_up_to_age)
         formData.append('description', newCar.description)
        setNewCar({company_name:"",
            manufacture_year:"",
            license_number: "",
        license_validity: "",
        insurance_validity: "",
        insurance_up_to_age: "",
        description: "",
        image: "",
        })
        axios({
            method: 'post',
            url: "/api/cars/",
            data: formData,
        })
        .then((dataRes) => {
            // setCars(dataRes.data)
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

    return (


    <div>
        <html lang="he">
        <head>
            <meta charSet="utf-8"></meta>
        </head>
        <body className="counter container-fluid center2 text-black-70 right-text" dir="rtl"
              style={{backgroundColor: 'rgba(60, 60, 60, 0.2)'}}>

        <h1 className='right-text m-3'>עדכון פרטי העסק</h1>
        <hr/>

            <form dir='rtl' onSubmit={e => businessSubmit(e)}>
                <p>תעדכן את פרטי העסק</p>
                <div className='form-group col-6'>
                    <input
                        className='form-control'
                        type='text'
                        placeholder={business.name}
                        name='name'
                        value={business.name}
                        onChange={e => businessChange(e)}
                        required
                    />
                </div>
                <div className='form-group'>
                <input className='form-group'
                type = 'file'
                onChange={e => fileSelectedHandler(e)}
                />
                </div>

                <button className='btn btn-dark' type='submit'>עדכן פרטים העסק</button>
            </form>

            <div class = "container-fluid row">

            <form className='col-6'  onSubmit={e => mangerSubmit(e)}>
                <p>תעדכן את פרטי המנהל</p>
                <div className='form-group'>
                    <input
                        className='form-control'
                        type='text'
                        placeholder={manager.first_name}
                        name='first_name'
                        value={manager.first_name}
                        onChange={e => managerChange(e)}
                        pattern="^[^0-9]*$"
                        required

                    />
                </div>
                <div className='form-group'>
                    <input
                        className='form-control'
                        type='text'
                        placeholder={manager.last_name}
                        name='last_name'
                        value={manager.last_name}
                        onChange={e => managerChange(e)}
                        pattern="^[^0-9]*$"
                        required
                    />
                </div>

                <div className='form-group'>
                    <input
                        className='form-control'
                        type='number'
                        placeholder={manager.phone_number}
                        name='phone_number'
                        value={manager.phone_number}
                        onChange={e => newMangerPhoneChange(e)}
                        minLength='8'
                        required
                    />
                </div>
                {errMsg.show && <div className="alert alert-danger" role="alert">
                    {errMsg.msg}
                </div>}
                <div className='form-group'>
                    <input
                        className='form-control'
                        type='number'
                        placeholder={manager.age}
                        name='age'
                        value={manager.age}
                        onChange={e => managerChange(e)}
                        min ='18'
                        max='100'
                    />
                </div>
                <div className='form-group'>
                    <PlacesAutocomplete
                        value={manager.address}
                        onChange={e => managerChangeAddress(e)}
                        onSelect={e => managerChangeAddress(e)}
                    >
                        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                            <div>

                                <input className='form-control'
                                       required
                                       {...getInputProps({ placeholder: manager.address })} />

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
                תמונה אשית
                <div className='form-group'>
                <input className='form-group'
                type = 'file'
                onChange={e => managerImageHandler(e)}
                />
                </div>

                <button className='btn btn-dark' type='submit'>עדכן פרטים שלי</button>
            </form>


            <form  className='col-6' onSubmit={e => directorSubmit(e)}>
            <p>תעדכן את פרטי סגן המנהל</p>
                <div className='form-group'>
                    <input
                        className='form-control'
                        type='text'
                        placeholder={director.first_name}
                        name='first_name'
                        value={director.first_name}
                        onChange={e => directorChange(e)}
                        pattern="^[^0-9]*$"
                        required
                    />
                </div>
                <div className='form-group'>
                    <input
                        className='form-control'
                        type='text'
                        placeholder={director.last_name}
                        name='last_name'
                        value={director.last_name}
                        onChange={e => directorChange(e)}
                        pattern="^[^0-9]*$"
                        required
                    />
                </div>

                <div className='form-group'>
                    <input
                        className='form-control'
                        type='number'
                        placeholder={director.phone_number}
                        name='phone_number'
                        value={director.phone_number}
                        onChange={e => newDirectorPhoneChange(e)}
                        required
                    />
                </div>
                {errMsg1.show && <div className="alert alert-danger" role="alert">
                    {errMsg1.msg}
                </div>}
                <div className='form-group'>
                    <input
                        className='form-control'
                        type='number'
                        placeholder={director.age}
                        name='age'
                        value={director.age}
                        onChange={e => directorChange(e)}
                        min ='18'
                        max='100'
                    />
                </div>
                <div className='form-group'>
                    <PlacesAutocomplete
                        value={director.address}
                        onChange={e => directorChangeAddress(e)}
                        onSelect={e => directorChangeAddress(e)}
                    >
                        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                            <div>

                                <input className='form-control'
                                       required
                                       {...getInputProps({ placeholder: director.address})} />

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
                תמונת סגן מנהל
                <div className='form-group'>
                <input className='form-group'
                type = 'file'
                onChange={e => directorImageHandler(e)}
                />
                </div>

                <button className='btn btn-dark' type='submit' >עדכן פרטי הסגן מנהל</button>
            </form>
            </div>
            <form className='col-6'  dir='rtl' onSubmit={e => newCarSubmit(e)}>
            <p>תוסיף רכב חדש</p>
                <div className='form-group'>
                    <input
                        className='form-control'
                        type='text'
                        placeholder="חברת ייצור:"
                        name='company_name'
                        value={newCar.company_name}
                        onChange={e => newCarChange(e)}
                        required
                    />
                </div>
                <div className='form-group'>
                    <input
                        className='form-control'
                        type='number'
                        placeholder="שנת ייצור:"
                        name='manufacture_year'
                        value={newCar.manufacture_year}
                        onChange={e => newCarChange(e)}
                        required
                    />
                </div>
                <div className='form-group dropdown'>
                    <select
                        className='form-control right-text'
                        placeholder='שם נהג*'
                        name='driver_email'
                        value={newCar.driver_email}
                        onChange={e => newCarChange(e)}
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
                        value={newCar.license_number}
                        onChange={e => newCarChange(e)}
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
                        value={newCar.license_validity}
                        onChange={e => newCarChange(e)}
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
                        value={newCar.insurance_validity}
                        onChange={e => newCarChange(e)}
                        required
                    />
                </div>
                <div className='form-group'>
                    <input
                        className='form-control'
                        type='number'
                        placeholder="ביטוח עד גיל"
                        name='insurance_up_to_age'
                        value={newCar.insurance_up_to_age}
                        min='18'
                        max='100'
                        onChange={e => newCarChange(e)}
                    />
                </div>
                <div className='form-group'>
                    <input
                        className='form-control'
                        type='text'
                        placeholder="תיאור הרכב/ הערות"
                        name='description'
                        value={newCar.description}
                        onChange={e => newCarChange(e)}
                    />
                </div>
                <div className='text-danger'>הרכב פעיל? (שים לב: סימון של רכב כלא פעיל מוריד אותו מהמערכת)</div>
                <input
                    type='checkbox'
                    placeholder="הרכב פעיל"
                    name='is_working'
                    value={newCar.is_working}
                    defaultChecked
                    onChange={e => newCarCheckChange(e)}
                />
                <br/>
                תמונת רכב
                <div className='form-group'>

                <input className='form-group'
                type = 'file'
                onChange={e => carImageHandler(e)}
                />
                </div>
                <button className='btn btn-dark' type='submit'>תוסיף רכב חדש</button>
            </form>

            <p> <Link className='nav-link btn btn-warning mt-5 col-2' to='/my-business-details'>סיימתי עדכון</Link></p>
        </body></html>
        </div>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { get_user_data, logout })(MyBusinessDetailsUpdate);
