import React from 'react';
import { Link } from 'react-router-dom';

const Homepage = () => (
    <html lang="he" dir="rtl">
        <head>
        <meta charset="utf-8"></meta>
        </head>
        <body lang="he" dir="rtl">
        <div class = "container-fluid right-text" lang="he" dir="rtl">
        <div class = "row " lang="he" dir="rtl">
        <div className='container' lang="he" dir="rtl"class="col-6" >
           <div class='jumbotron mt-5'>
                <h1 class='display-4'>העסק שלי</h1>
                <hr class='my-4' />
                <p class='lead'><li> <Link to='/my-business-details'>פרטי העסק שלי</Link></li></p>
                <p class='lead'><li> <Link to='/workers-management'>ניהול עובדים</Link></li></p>
                <p class='lead'><li> <Link to='/work-schedule'>יומן עבודה</Link></li></p>
                <p class='lead'><li> <Link to='/financial'>פיננסי</Link></li></p>

           </div>
        </div>
        <div className='container' class="col-6">
           <div class='jumbotron mt-5'>
                <h1 class='display-4'>פרויקטים</h1>
                <hr class='my-4' />
                <p class='lead'><li> <Link to='/projects-management'>ניהול פרויקטים</Link></li></p>
                <p class='lead'><li> <Link to='/file-repository'>מאגר הקבצים</Link></li></p>
                <p class='lead'><li> <Link to='/bid'>הפקת הצעת מחיר</Link></li></p>
           </div>
           </div>
            </div>
        </div>
        </body>
    </html>
);

export default Homepage;