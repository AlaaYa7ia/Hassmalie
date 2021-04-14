import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { verify } from '../actions/auth';

const Activate = ({ verify, match }) => {
    const [verified, setVerified] = useState(false);

    const verify_account = e => {
        const uid = match.params.uid;
        const token = match.params.token;

        verify(uid, token);
        setVerified(true);
    };

    if (verified) {
        return <Redirect to='/' />
    }

    return (
        <div className='container right-text' >
            <div
                className='d-flex flex-column justify-content-right align-items-center'
                style={{ marginTop: '200px' }}
            >
                <h1 dir= "rtl">אמת את חשבונך: </h1>
                <button
                    onClick={verify_account}
                    style={{ marginTop: '50px' }}
                    type='button'
                    className='btn btn-primary'
                >
                <div dir= "rtl">
                    לאמת
                    </div>
                </button>
            </div>
        </div>
    );
};

export default connect(null, { verify })(Activate);