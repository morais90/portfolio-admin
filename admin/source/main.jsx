import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import { authRequired, authCheck } from './core/hooks.js';
import Admin from './components/admin/admin.jsx';
import Login from './components/login/login.jsx';
import Dashboard from './components/dashboard/dashboard.jsx';
import Essay from './components/essay/essay.jsx';
import Account from './components/account/account.jsx';
import UserBoard from './components/user/user.jsx';
import UserDetailBoard from './components/user/user-detail-board.jsx';
import UserDetail from './components/user/user-detail.jsx';


render((
    <Router history={browserHistory}>
        <Route path='login' component={Login} onEnter={authCheck} />
        <Route path='/' component={Admin} onEnter={authRequired}>
            <IndexRoute component={Dashboard} />
            <Route path='/dashboard' component={Dashboard} />
            <Route path='/essay' component={Essay} />
            <Route path='/account' component={Account} />
            <Route path='/user' component={UserBoard} />
            <Route path='/user/:id' component={UserDetailBoard}>
                <IndexRoute component={UserDetail} />
                <Route path='/user/:id/detail' component={UserDetail} />
            </Route>
        </Route>
    </Router>
), document.getElementById('admin'));