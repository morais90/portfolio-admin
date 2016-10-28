import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router'

import Admin from './components/admin/admin.jsx';
import Dashboard from './components/dashboard/dashboard.jsx';
import Essay from './components/essay/essay.jsx';
import Account from './components/account/account.jsx';
import User from './components/user/user.jsx';


render((
    <Router history={browserHistory}>
        <Route path="/" component={Admin}>
            <Route path="dashboard" component={Dashboard} />
            <Route path="essay" component={Essay} />
            <Route path="account" component={Account} />
            <Route path="user" component={User} />
        </Route>
    </Router>
), document.getElementById('admin'));