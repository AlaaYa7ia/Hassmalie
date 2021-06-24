import React from 'react';
import { Link } from 'react-router-dom';

const Homepage = () => {
    return(
    <html dir="rtl">
        <head>
        <meta charset="utf-8"></meta>
        </head>
        <body>

        <div class = "align-items-center container-fluid" >
            <br/> <br/> <br/> <br/> <br/>

            <div className='row'>
                <div className='col-2'></div>
                <div className="text-container col-2">
                    <Link to='/my-business-details'>
                        <img className='img-link polaroid'
                             src={process.env.REACT_APP_API_URL + '/media/defaultpictuers/10.png'} height={300}
                             width={300}/>
                        <p className="centered lead">פרטי העסק שלי</p>
                    </Link>
                </div>
                <div className="text-container col-2">
                    <Link to='/workers-management'>
                        <img className='img-link'
                             src={process.env.REACT_APP_API_URL + '/media/defaultpictuers/11.png'} height={300}
                             width={300}/>
                        <p className="centered lead">ניהול עובדים</p>
                    </Link>
                </div>
                <div className="text-container col-2">
                    <Link to='/work-schedule'>
                        <img className='img-link'
                             src={process.env.REACT_APP_API_URL + '/media/defaultpictuers/12.png'} height={300}
                             width={300}/>
                        <p className="centered lead">יומן עבודה</p>
                    </Link>
                </div>
                <div className="text-container col-2">
                    <Link to='/projects-management'>
                        <img className='img-link'
                             src={process.env.REACT_APP_API_URL + '/media/defaultpictuers/13.png'} height={300}
                             width={300}/>
                        <p className="centered lead">ניהול פרויקטים</p>
                    </Link>
                </div>
            </div>
        </div>
        </body>
    </html>
)};

export default Homepage;