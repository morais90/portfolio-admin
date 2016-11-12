import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import Admin from './components/admin/admin.jsx';
import Login from './components/login/login.jsx';
import Dashboard from './components/dashboard/dashboard.jsx';
import Essay from './components/essay/essay.jsx';
import Account from './components/account/account.jsx';
import UserBoard from './components/user/user.jsx';


const authRequired = (nextstate, replace) => {
    let credentials =  localStorage.getItem('credentials');

    if (!credentials) {
        replace('/login');
    }
}

const authCheck = (nextstate, replace) => {
    let credentials = localStorage.getItem('credentials');

    if (credentials) {
        replace('/');
    }
}

render((
    <Router history={browserHistory}>
        <Route path="login" component={Login} onEnter={authCheck} />
        <Route path="/" component={Admin} onEnter={authRequired}>
            <Route path="dashboard" component={Dashboard} />
            <Route path="essay" component={Essay} />
            <Route path="account" component={Account} />
            <Route path="user" component={UserBoard} />
        </Route>
    </Router>
), document.getElementById('admin'));