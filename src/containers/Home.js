import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import '../backgroundStyle.css'

const Home = () => (
    <html  lang="he" dir="rtl" >
        <head>
        <meta charset="utf-8"></meta>
        </head>
        <body dir="rtl" >
        <div className='background-style' style={{ backgroundImage: "url("+process.env.REACT_APP_API_URL+"/media/defaultpictuers/background.jpg)"}}>
            <br></br>
            <br></br>
            <div className='container right-text' lang="he" dir="rtl" style={{ display: 'flex',  justifyContent:'center', alignItems:'right', height: '70vh'}}>
            <div class='jumbotron mt-5 text-warning' style={{ backgroundColor: 'rgba(60, 60, 60, 0.9)'}}>
                <h1 class='display-4 text-warning' dir= "rtl">החשמלאי</h1>
                <p class='lead' >מערכת להנהלת עסק עבודות חשמל</p>
                <hr class='my-4' />
                <p>לחץ על הכפתור להתחברות</p>
                <Link class='btn btn-outline-warning btn-lg' to='/login' role='button' >לכניסה</Link>
            </div>
        </div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
        </div>
        </body>
    </html>
);

export default Home;