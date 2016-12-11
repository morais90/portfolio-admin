import React from 'react';
import { Link, withRouter } from 'react-router';

import UserEndpoint from '../../services/user.js';


class UserDetail extends React.Component {
    constructor(props) {
        super(props);
        this.api = new UserEndpoint();
        this.state = {
            user: null,
            showPassword: false
        };
        this.handleUserDetail = this.handleUserDetail.bind(this);
        this.handleUserDetailFail = this.handleUserDetailFail.bind(this);
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleShowPassword = this.handleShowPassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUserUpdate = this.handleUserUpdate.bind(this);
        this.handleUserUpdateFail = this.handleUserUpdateFail.bind(this);
    }

    handleFirstNameChange(e) {
        let user = this.state.user;
        user.first_name = e.target.value;

        this.setState({
            user: user
        });
    }

    handleLastNameChange(e) {
        let user = this.state.user;
        user.last_name = e.target.value;

        this.setState({
            user: user
        })
    }

    handleEmailChange(e) {
        let user = this.state.user;
        user.email = e.target.value;

        this.setState({
            user: user
        });
    }

    handlePasswordChange(e) {
        let user = this.state.user;
        user.password = e.target.value;

        this.setState({
            user: user
        });
    }

    handleShowPassword() {
        this.setState({
            showPassword: !this.state.showPassword
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        this.api.update(this.state.user.id, this.state.user)
        .done((data) => this.handleUserUpdate(data))
        .fail((data) => this.handleUserUpdateFail(data.responseJSON, data.statusText));
    }

    handleUserDetail(user) {
        this.setState({
            user: user
        });
    }

    handleUserDetailFail(error, status) {
        if (status == 'Unauthorized') {
            localStorage.removeItem('token');
            this.props.router.push('/login');
        } else {
            console.log(`Unkown error ${data} - ${status}`);
        }
    }

    handleUserUpdate(user) {
        console.log(user);
    }

    handleUserUpdateFail(error, status) {
        if (status == 'Unauthorized') {
            localStorage.removeItem('token');
            this.props.router.push('/login');
        } else {
            console.log(`Unkown error ${data} - ${status}`);
        }
    }

    componentDidMount() {
        this.api.retrieve(this.props.params.id)
        .done((data) => this.handleUserDetail(data))
        .fail((data) => this.handleUserDetailFail(data.responseJSON, data.statusText));
    }

    render() {
        return (
            <div className="container">
            {this.state.user ? (
                <form onSubmit={this.handleSubmit}>

                    <h2 className="text-xs-center">
                        <span className="tag tag-primary">#{this.state.user.id}</span> {this.state.user.full_name}
                    </h2>

                    <div className="form-group row">
                        <label className="col-xs-2 col-form-label">Nome</label>
                        <div className="col-xs-6">
                            <input className="form-control" type="text" maxLength="50" value={this.state.user.first_name} onChange={this.handleFirstNameChange} required/>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-xs-2 col-form-label">Sobrenome</label>
                        <div className="col-xs-6">
                            <input className="form-control" type="text" maxLength="50" value={this.state.user.last_name} onChange={this.handleLastNameChange} required/>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-xs-2 col-form-label">E-mail</label>
                        <div className="col-xs-6">
                            <input className="form-control" type="email" value={this.state.user.email} onChange={this.handleEmailChange} required/>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-xs-2 col-form-label">Senha</label>
                        <div className="col-xs-6">
                            <input className="form-control" type={this.state.showPassword ? "text":"password"} value={this.state.user.password} onChange={this.handlePasswordChange} required/>
                        </div>

                        <div className="col-xs-2">
                            <button title="Mostrar senha" type="button" className="btn btn-secondary" data-toggle="button" aria-pressed="false" onClick={this.handleShowPassword}>
                                { this.state.showPassword ? (
                                    <span className="fa fa-eye-slash fa-lg"></span>
                                ):(
                                    <span className="fa fa-eye fa-lg"></span>
                                )}
                            </button>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary">Atualizar</button>
                </form>
            ) : (
                <span className="fa fa-spinner fa-spin fa-3x fa-fw"></span>
            )}
            </div>
        )
    }
}


export default withRouter(UserDetail);
