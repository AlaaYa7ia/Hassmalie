import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './containers/Home';
import Login from './containers/Login';
import Signup from './containers/Signup';
import Activate from './containers/Activate';
import ResetPassword from './containers/ResetPassword';
import ResetPasswordConfirm from './containers/ResetPasswordConfirm';
import Homepage from './containers/Homepage';
import PrivateRoute from './hocs/PrivateRoute';
import MyBusinessDetails from './containers/MyBusinessDetails';
import WorkersManagement from './containers/WorkersManagement';
import WorkSchedule from './containers/WorkSchedule';
import ProjectsManagement from './containers/ProjectsManagement';
import Financial from './containers/Financial';
import MyBusinessDetailsUpdate from './containers/MyBusinessDetailsUpdate';
import Bid from './containers/Bid';


import { Provider } from 'react-redux';
import store from './store';

import Layout from './hocs/Layout';

const App = () => (
    <Provider store={store}>
        <Router>
            <Layout>
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/signup' component={Signup} />
                    <Route exact path='/reset-password' component={ResetPassword} />
                    <Route exact path='/password/reset/confirm/:uid/:token' component={ResetPasswordConfirm} />
                    <Route exact path='/activate/:uid/:token' component={Activate} />
                    <PrivateRoute exact path='/homepage' component={Homepage} />
                    <Route exact path='/my-business-details' component={MyBusinessDetails} />
                    <Route exact path='/my-business-details-update' component={MyBusinessDetailsUpdate} />
                    <Route exact path='/workers-management' component={WorkersManagement} />
                    <Route exact path='/work-schedule' component={WorkSchedule} />
                    <Route exact path='/financial' component={Financial} />
                    <Route exact path='/projects-management' component={ProjectsManagement} />
                    <Route exact path='/bid' component={Bid} />
                </Switch>
            </Layout>
        </Router>
    </Provider>
);

export default App;