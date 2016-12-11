import React from 'react';
import { Link } from 'react-router';


class Admin extends React.Component {
    render() {
        return (
            <div className="container-fluid">
                <nav className="navbar navbar-dark navbar-full bg-inverse nav-fluid">
                    <a className="navbar-brand" href="#">Bellacia Admin</a>
                </nav>

                <div className="row">
                    <div className="sidebar col-md-2 bg-inverse no-padding">
                        <ul className="nav nav-pills nav-stacked">
                            <li className="nav-item sidebar-item">
                                <Link to={'/dashboard'} activeClassName="active" className="nav-link">
                                    <span className="fa fa-dashboard"></span> DASHBOARD
                                </Link>
                            </li>
                            <li className="nav-item sidebar-item">
                                <Link to={'/account'} activeClassName="active" className="nav-link">
                                    <span className="fa fa-money"></span> FINANCEIRO
                                </Link>
                            </li>
                            <li className="nav-item sidebar-item">
                                <Link to={'/essay'} activeClassName="active" className="nav-link">
                                    <span className="fa fa-photo"></span> ENSAIOS
                                </Link>
                            </li>
                            <li className="nav-item sidebar-item">
                                <Link to={'/user'} activeClassName="active" className="nav-link">
                                    <span className="fa fa-user"></span> USUÁRIOS
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="content col-md-10"> {this.props.children} </div>
                </div>
            </div>
        );
    }
}

export default Admin;