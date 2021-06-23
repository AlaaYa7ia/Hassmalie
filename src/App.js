import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

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
import FileRepository from './containers/FileRepository';
import Bid from './containers/Bid';
import MapBid from './containers/MapBid';
import TableBid from './containers/TableBid';
import Project from "./containers/Project";


import { Provider } from 'react-redux';
import store from './store';

import Layout from './hocs/Layout';
import {login} from "./actions/auth";

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
                    <PrivateRoute exact path='/my-business-details' component={MyBusinessDetails} />
                    <PrivateRoute exact path='/my-business-details-update' component={MyBusinessDetailsUpdate} />
                    <PrivateRoute exact path='/workers-management' component={WorkersManagement} />
                    <PrivateRoute exact path='/work-schedule' component={WorkSchedule} />
                    <PrivateRoute exact path='/financial' component={Financial} />
                    <PrivateRoute exact path='/projects-management' component={ProjectsManagement} />
                    <PrivateRoute path='/project/:my_business/:id' component={Project} />
                    <PrivateRoute path='/file-repository/:my_business/:id' component={FileRepository} />
                    <PrivateRoute  path='/bid/:id/:my_business' component={Bid} />
                    <PrivateRoute exact path='/TableBid/:my_business/:version' component={TableBid} />
                    <PrivateRoute exact path='/MapBid/:id/:my_business' component={MapBid} />
                    <Redirect from='*' to='/login' />
                </Switch>
            </Layout>
        </Router>
    </Provider>
);

export default App;
