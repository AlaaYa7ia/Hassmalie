import React from 'react';
import { Link } from 'react-router-dom';

const MyBusinessDetails = () => (
    <html lang="he" >
        <head>
        <meta charset="utf-8"></meta>
        </head>
        <body dir="rtl">
        <div class = "container-fluid">
        <div class = "row ">
        <div className='container' class="col-6" >
           <div class = "row ">
           <div class='jumbotron mt-5 col-5'>
                <h1 class='display-4'>מנהל העסק</h1>
                <p class='lead'>שם פרטי:</p>
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
);


export default MyBusinessDetails;