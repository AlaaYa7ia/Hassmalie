import React from 'react';
import { Link } from 'react-router-dom';

const Homepage = () => {
    return(
    <html dir="rtl">
        <head>
        <meta charset="utf-8"></meta>
        </head>
        <body>
        <div class = "row align-center container-fluid right-text " lang='he'>
            <div className='container col-1 align-center'></div>
        <div className='container col-4 align-center' >
           <div class='mt-5'>
                <h1 class='display-4 bg-dark text-secondary rounded'>העסק שלי</h1>
                <hr class='my-4' />
                <div className='row'>
                <div  class="text-container" >
                 <Link to='/my-business-details'>
                    <img className='img-link' src={process.env.REACT_APP_API_URL+'/media/defaultpictuers/icon1.png'}height={210}
                         width={210} />
                     <p className="centered lead">פרטי העסק שלי</p>
                 </Link>
                </div>
               <div className="text-container">
                   <Link to='/workers-management'>
                       <img className='img-link'
                            src={process.env.REACT_APP_API_URL + '/media/defaultpictuers/icon4.png'} height={210}
                            width={210}/>
                       <p className="centered lead">ניהול עובדים</p>
                   </Link>
               </div>
                </div>

               <div className='row'>
                   <div className="text-container">
                       <Link to='/work-schedule'>
                           <img className='img-link'
                                src={process.env.REACT_APP_API_URL + '/media/defaultpictuers/icon2.png'} height={210}
                                width={210}/>
                           <p className="centered lead">יומן עבודה</p>
                       </Link>
                   </div>
                   <div className="text-container">
                       <Link to='/financial'>
                           <img className='img-link'
                                src={process.env.REACT_APP_API_URL + '/media/defaultpictuers/icon3.png'} height={210}
                                width={210}/>
                           <p className="centered lead">פיננסי</p>
                       </Link>
                   </div>
               </div>
           </div>
        </div>
        <div className='container col-4 align-center'>
           <div class=' mt-5'>
                <h1 class='display-4 bg-warning rounded'>פרויקטים</h1>
                <hr class='my-4' />
               <div className='row'>
                   <div className="text-container">
                       <Link to='/projects-management'>
                           <img className='img-link'
                                src={process.env.REACT_APP_API_URL + '/media/defaultpictuers/icon1.png'} height={210}
                                width={210}/>
                           <p className="centered lead">ניהול פרויקטים</p>
                       </Link>
                   </div>
                   {/*<div className="text-container">*/}
                   {/*    <Link to='/file-repository'>*/}
                   {/*        <img className='img-link'*/}
                   {/*             src={process.env.REACT_APP_API_URL + '/media/defaultpictuers/icon1.png'} height={210}*/}
                   {/*             width={210}/>*/}
                   {/*        <p className="centered lead">מאגר הקבצים</p>*/}
                   {/*    </Link>*/}
                   {/*</div>*/}
               </div>
               {/*<div className='row'>*/}
               {/*<div className="text-container">*/}
               {/*    <Link to='/bid'>*/}
               {/*        <img className='img-link'*/}
               {/*             src={process.env.REACT_APP_API_URL + '/media/defaultpictuers/icon1.png'} height={210}*/}
               {/*             width={210}/>*/}
               {/*        <p className="centered lead ">הפקת הצעת מחיר</p>*/}
               {/*    </Link>*/}
               {/*</div>*/}
               {/*</div>*/}
           </div>
        </div>
            <div className='container col-1 align-center'></div>
            </div>
        <div><br></br></div>

        </body>
    </html>
)};

export default Homepage;