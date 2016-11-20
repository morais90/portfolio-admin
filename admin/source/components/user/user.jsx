import React from 'react';
import { withRouter } from 'react-router';

import { DeleteModal } from '../commons/modal.jsx';
import UserEndpoint from '../../services/user.js';


class UserBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        };
        this.api = new UserEndpoint();
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.handleDeleteClickYes = this.handleDeleteClickYes.bind(this);
        this.handleUserDelete = this.handleUserDelete.bind(this);
        this.handleUserDeleteFail = this.handleUserDeleteFail.bind(this);
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
        console.log(data);
    }

    handleUserDeleteFail(data, status) {
        if (status == 'Unauthorized') {
            localStorage.removeItem('token');
            this.props.router.push('/login');
        } else {
            console.log(`Unkown error ${data} - ${status}`);
        }
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
                        <button title="Adicionar usuário" className="btn btn-primary float-xs-right">
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
                                            <button title="Reativar usuário" type="button" className="btn btn-sm btn-warning">
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

                <div className="modal fade" id="modal-create-user">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Fechar">
                                    <span className="fa fa-remove"></span>
                                </button>
                                <h4 id="modal-title-user" className="modal-title">Criar usuário</h4>
                            </div>

                            <div className="modal-body">
                                <div className="form-group row">
                                    <label className="col-md-2 col-form-label">Nome</label>
                                    <div className="col-md-10">
                                        <input id="user-name" className="form-control" type="text" maxLength="50" required autoFocus/>
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label className="col-md-2 col-form-label">Sobrenome</label>
                                    <div className="col-md-10">
                                        <input id="user-lastname" className="form-control" type="text" maxLength="50" required/>
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label className="col-md-2 col-form-label">E-mail</label>
                                    <div className="col-md-10">
                                        <input id="user-email" className="form-control" type="email" required/>
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label className="col-md-2 col-form-label">Senha</label>
                                    <div className="col-md-10">
                                        <input id="user-password" className="form-control" type="password" required/>
                                    </div>
                                </div>

                                <div className="modal-footer">
                                    <button type="submit" className="btn btn-primary">Salvar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <DeleteModal show={this.state.deleteModalShow} onYes={this.handleDeleteClickYes}></DeleteModal>
            </div>
        )
    }
}

export default withRouter(UserBoard);
