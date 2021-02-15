import React, { Component, useEffect, setState, useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { connect } from 'react-redux';
import {get_user_data } from '../actions/auth';
import { Link, Redirect } from 'react-router-dom';


//class MyBusinessDetailsIner extends React.Component {
//  constructor(props) {
//    super(props);
//      console.log("MyBusinessDetails"
//      );
//    this.state = {
//        user: "",
//
////        usersList: [],
//    };
//    console.log("this.state.userProp", this.state.userProp)
//
//    console.log("useeer", this.state.user)
//  }
//
//
//  componentDidMount() {
//  console.log("componentDidMount");
//    this.refreshList();
//  }
//
//
//  refreshList = () => {
//  console.log("refreshList");
//  this.setState({ user: this.props.user});
////    axios
////      .get("/api/users/"+ this.state.id+"/")
////      .then(res => {this.setState({ usersList: res.data})
////      })
////      .catch(err => console.log(err));
//  };
//  render(){
//  //console.log(this.state.usersList); //prints the data
//  // inside the Return : <p>{JSON.stringify(this.state.usersList)}</p>
//
//}

const MyBusinessDetails = ({ get_user_data, isAuthenticated}) => {
    const [manager, setManager] = useState("");
    const [director, setDirector] = useState("");
    const [cars, setCars] = useState("");
    const [business, setBusiness] = useState("");

     useEffect(() => {
        (async () => {
        await get_user_data().then((dataRes) => {
            axios
          .get("/api/users/"+ dataRes.id +"/")
          .then((dataRes) => {
            setManager(dataRes.data);

           })

           axios
          .get("/api/my-business/"+ dataRes.id +"/")
          .then((dataRes) => {
            setBusiness(dataRes.data);

           })
        })
        })();

    }, []);

        return(
      <div>

    <p>API: {JSON.stringify(manager)}</p>

    <html lang="he" >
        <head>
        <meta charset="utf-8"></meta>
        </head>
        <body dir="rtl">



        <div class = "container-fluid">
        <div className='container' >
           <div class = "row ">
           <div class='jumbotron mt-5 col-6'>
                <h1 class='display-4'>{business.name}</h1>
           </div>
           <div class='jumbotron mt-5 col-6'>
                <img src={require('./pic.png').default} height={250} width={250} alt="stam pic"></img>
           </div>
            </div>
        </div>
        </div>

        <div class = "container-fluid">
        <div class = "row ">
        <div className='container' class="col-6" >
           <div class = "row ">
           <div class='jumbotron mt-5 col-5'>
                <h1 class='display-4'>מנהל העסק</h1>
                <p class='lead'>שם פרטי: {manager.first_name }</p>
                <p class='lead'>שם משפחה: {manager.last_name}</p>
                <p class='lead'>מספר טילפון: {manager.phone_number}</p>
                <p class='lead'>איימיל: {manager.email}</p>
                <p class='lead'>כתובת מגורים: {manager.address}</p>
                <p class='lead'>גיל: {manager.age}</p>
           </div>
           <div class='jumbotron mt-5 col-5'>
                <img src="./public/logo512.png" alt="stam pic"></img>
           </div>
           </div>
        </div>
        <div className='container' class="col-6" >
           <div class = "row ">
           <div class='jumbotron mt-5 col-5'>
                <h1 class='display-4'>סגן מנהל</h1>
                <p class='lead'>שם פרטי: </p>
                <p class='lead'>שם משפחה: </p>
                <p class='lead'>מספר טילפון: </p>
                <p class='lead'>איימיל: </p>
                <p class='lead'>כתובת מגורים: </p>
                <p class='lead'>גיל: </p>
           </div>
           <div class='jumbotron mt-5 col-5'>
                <img src="../public/logo512.png" alt="stam pic"></img>
           </div>
           </div>
        </div>
            </div>
        </div>
        </body>
    </html>
      </div>
      );
};
//<MyBusinessDetailsIner user={JSON.stringify(data)} />
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
    });
export default connect(mapStateToProps, { get_user_data })(MyBusinessDetails);