import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
    <html  lang="he" >
        <head>
        <meta charset="utf-8"></meta>
        </head>
        <body dir="rtl">
        <div className='container' >
            <div class='jumbotron mt-5'>
                <h1 class='display-4'>החשמלאי</h1>
                <p class='lead'>מערכת להנהלת עסק עבודות חשמל</p>
                <hr class='my-4' />
                <p>לחץ על הכפתור להתחברות</p>
                <Link class='btn btn-primary btn-lg' to='/login' role='button'>לכניסה</Link>
            </div>
        </div>
        </body>
    </html>
);

export default Home;