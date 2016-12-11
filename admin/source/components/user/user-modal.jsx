import React from 'react';
import { withRouter } from 'react-router';

import UserEndpoint from '../../services/user.js';


class UserModal extends React.Component {
    constructor(props) {
        super(props);
        this.api = new UserEndpoint();
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            showPassword: false
        }
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleShowPassword = this.handleShowPassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUserCreate = this.handleUserCreate.bind(this);
        this.handleUserCreateFail = this.handleUserCreateFail.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
    }

    handleFirstNameChange(e) {
        this.setState({
            firstName: e.target.value
        })
    }

    handleLastNameChange(e) {
        this.setState({
            lastName: e.target.value
        })
    }

    handleEmailChange(e) {
        this.setState({
            email: e.target.value
        })
    }

    handlePasswordChange(e) {
        this.setState({
            password: e.target.value
        })
    }

    handleShowPassword() {
        this.setState({
            showPassword: !this.state.showPassword
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        let data = {
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            email: this.state.email,
            password: this.state.password
        };
        this.api.create(data)
        .done((data) => this.handleUserCreate(data))
        .fail((data) => this.handleUserCreateFail(data.responseJSON, data.statusText));
    }

    handleUserCreate(data) {
        if (this.props.onSave) {
            this.props.onSave(data);
        }
    }

    handleUserCreateFail(data, status) {
        if (status == 'Unauthorized') {
            localStorage.removeItem('token');
            this.props.router.push('/login');
        } else {
            console.log(`Unkown error ${data} - ${status}`);
        }
    }

    handleModalClose() {
        if (this.props.onClose) {
            this.props.onClose();
        }
    }

    componentDidUpdate() {
        if (this.props.show) {
            $('#modalCreateUser').modal('show');
        } else {
            $('#modalCreateUser').modal('hide');
        }
    }

    render() {
        return (
            <div className="modal fade" id="modalCreateUser">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Fechar" onClick={this.handleModalClose}>
                                <span className="fa fa-remove"></span>
                            </button>
                            <h4 id="modal-title-user" className="modal-title">Criar usuário</h4>
                        </div>

                        <div className="modal-body">
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-group row">
                                    <label className="col-xs-2 col-form-label">Nome</label>
                                    <div className="col-xs-10">
                                        <input className="form-control" type="text" maxLength="50" value={this.state.firstName} onChange={this.handleFirstNameChange} required/>
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label className="col-xs-2 col-form-label">Sobrenome</label>
                                    <div className="col-xs-10">
                                        <input className="form-control" type="text" maxLength="50" value={this.state.lastName} onChange={this.handleLastNameChange} required/>
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label className="col-xs-2 col-form-label">E-mail</label>
                                    <div className="col-xs-10">
                                        <input className="form-control" type="email" value={this.state.email} onChange={this.handleEmailChange} required/>
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label className="col-xs-2 col-form-label">Senha</label>
                                    <div className="col-xs-8">
                                        <input className="form-control" type={this.state.showPassword ? "text":"password"} value={this.state.passord} onChange={this.handlePasswordChange} required/>
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

                                <div className="modal-footer">
                                    <button type="submit" className="btn btn-primary">Salvar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(UserModal);
