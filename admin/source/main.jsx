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
import HookerBoard from './components/hooker/hooker.jsx';
import HookerDetailBoard from './components/hooker/hooker-detail-board.jsx';
import HookerDetail from './components/hooker/hooker-detail.jsx';
import HookerCreateBoard from './components/hooker/hooker-create-board.jsx';
import { HookerCreateGeneral, HookerCreatePicture, HookerCreateContact } from './components/hooker/hooker-create.jsx';
import ServiceBoard from './components/service/service.jsx';

render((
    <Router history={browserHistory}>
        <Route path='login' component={Login} onEnter={authCheck} />
        <Route path='/' component={Admin} onEnter={authRequired}>
            <IndexRoute component={Dashboard} />
            <Route path='/dashboard' component={Dashboard} />
            <Route path='/essay' component={Essay} />
            <Route path='/account' component={Account} />
            <Route path='/hooker' component={HookerBoard} />
            <Route path='/hooker/create' component={HookerCreateBoard}>
                <IndexRoute component={HookerCreateGeneral} />
                <Route path='/hooker/create/general' component={HookerCreateGeneral} />
                <Route path='/hooker/create/picture' component={HookerCreatePicture} />
                <Route path='/hooker/create/contact' component={HookerCreateContact} />
            </Route>
            <Route path='/hooker/:id' component={HookerDetailBoard} />
            <Route path='/user' component={UserBoard} />
            <Route path='/user/:id' component={UserDetailBoard}>
                <IndexRoute component={UserDetail} />
                <Route path='/user/:id/detail' component={UserDetail} />
            </Route>
            <Route path='/service' component={ServiceBoard} />
        </Route>
    </Router>
), document.getElementById('admin'));