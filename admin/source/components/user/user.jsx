import React from 'react';
import { withRouter } from 'react-router';

import { ConfirmationModal } from '../commons/modal.jsx';
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
        console.log(data);
    }

    handleUserCreateFail(data, status) {
        if (status == 'Unauthorized') {
            localStorage.removeItem('token');
            this.props.router.push('/login');
        } else {
            console.log(`Unkown error ${data} - ${status}`);
        }
    }

    componentDidUpdate() {
        if (this.props.show) {
            $('#modalCreateUser').modal('show');
        }
    }

    render() {
        return (
            <div className="modal fade" id="modalCreateUser">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Fechar">
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


class UserBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            activeUser: null,
            deleteModalShow: false,
            createModalShow: false
        };
        this.api = new UserEndpoint();
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.handleDeleteClickYes = this.handleDeleteClickYes.bind(this);
        this.handleUserDelete = this.handleUserDelete.bind(this);
        this.handleUserDeleteFail = this.handleUserDeleteFail.bind(this);
        this.handleUndeleteClick = this.handleUndeleteClick.bind(this);
        this.handleUndeleteUser = this.handleUndeleteUser.bind(this);
        this.handleUndeleteUserFail = this.handleUndeleteUserFail.bind(this);
        this.handleCreateClick = this.handleCreateClick.bind(this);
    }

    handleUserList(data) {
        this.setState({
            users: data.results,
            activeUser: null,
            deleteModalShow: false
        });
    }

    handleUserListFail(data, status) {
        if (status == 'Unauthorized') {
            localStorage.removeItem('token');
            this.props.router.push('/login');
        } else {
            console.log(`Unkown error ${data} - ${status}`);
        }
    }

    handleDeleteClick(user) {
        this.setState({
            activeUser: user,
            deleteModalShow: true
        });
    }

    handleDeleteClickYes() {
        this.api.remove(this.state.activeUser.id)
        .done((data) => this.handleUserDelete(data))
        .fail((data) => this.handleUserDeleteFail(data.responseJSON, data.statusText));
    }

    handleUserDelete(data) {
        this.api.list()
        .done((data) => this.handleUserList(data))
        .fail((data) => this.handleUserListFail(data.responseJSON, data.statusText));
    }

    handleUserDeleteFail(data, status) {
        if (status == 'Unauthorized') {
            localStorage.removeItem('token');
            this.props.router.push('/login');
        } else {
            console.log(`Unkown error ${data} - ${status}`);
        }
    }

    handleUndeleteClick(user) {
        this.api.undelete(user.id)
        .done((data) => this.handleUndeleteUser(data))
        .fail((data) => this.handleUndeleteUserFail(data.responseJSON, data.statusText));
    }

    handleUndeleteUser(data) {
        this.api.list()
        .done((data) => this.handleUserList(data))
        .fail((data) => this.handleUserListFail(data.responseJSON, data.statusText));
    }

    handleUndeleteUserFail(data, status) {
        if (status == 'Unauthorized') {
            localStorage.removeItem('token');
            this.props.router.push('/login');
        } else {
            console.log(`Unkown error ${data} - ${status}`);
        }
    }

    handleCreateClick() {
        this.setState({
            createModalShow: true
        })
    }

    componentDidMount() {
        this.api.list()
        .done((data) => this.handleUserList(data))
        .fail((data) => this.handleUserListFail(data.responseJSON, data.statusText));
    }

    render() {
        return (
            <div className="row">
                <div className="col-xs-12">
                    <nav className="navbar navbar-light navbar-full bg-faded">
                        <button title="Adicionar usuário" className="btn btn-primary float-xs-right" onClick={this.handleCreateClick}>
                            <span className="fa fa-user-plus"></span>
                        </button>
                    </nav>
                </div>

                <div className="col-xs-12">
                    <table className="table table-bordered text-xs-center">
                        <thead className="thead-inverse">
                            <tr>
                                <th className="text-xs-center" scope="row">#</th>
                                <th className="text-xs-center">Nome</th>
                                <th className="text-xs-center">E-mail</th>
                                <th className="text-xs-center" width="100px">Operações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.users.map((user) =>
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.full_name}</td>
                                <td>{user.email}</td>
                                <td>
                                    <div className="btn-group">
                                        <button title="Editar usuário" type="button" className="btn btn-sm btn-success">
                                            <span className="fa fa-edit fa-lg"></span>
                                        </button>
                                        { user.is_active ? (
                                            <button title="Remover usuário" type="button" className="btn btn-sm btn-danger" onClick={() => this.handleDeleteClick(user)}>
                                                <span className="fa fa-trash fa-lg"></span>
                                            </button>
                                        ) : (
                                            <button title="Reativar usuário" type="button" className="btn btn-sm btn-warning" onClick={() => this.handleUndeleteClick(user)}>
                                                <span className="fa fa-undo fa-lg"></span>
                                            </button>
                                        )}
                                     </div>
                                </td>
                            </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <UserModal show={this.state.createModalShow}></UserModal>
                <ConfirmationModal show={this.state.deleteModalShow} onYes={this.handleDeleteClickYes}></ConfirmationModal>
            </div>
        )
    }
}

export default withRouter(UserBoard);
