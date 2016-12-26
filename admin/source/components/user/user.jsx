import React from 'react';
import { Link, withRouter } from 'react-router';

import { ConfirmationModal } from '../commons/modal.jsx';
import UserModal from './user-modal.jsx';
import UserEndpoint from '../../services/user.js';


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
        this.handleDeleteClickNo = this.handleDeleteClickNo.bind(this);
        this.handleUserDelete = this.handleUserDelete.bind(this);
        this.handleUserDeleteFail = this.handleUserDeleteFail.bind(this);
        this.handleUndeleteClick = this.handleUndeleteClick.bind(this);
        this.handleUndeleteUser = this.handleUndeleteUser.bind(this);
        this.handleUndeleteUserFail = this.handleUndeleteUserFail.bind(this);
        this.handleCreateClick = this.handleCreateClick.bind(this);
        this.handleUserModalSave = this.handleUserModalSave.bind(this);
        this.handleUserModalClose = this.handleUserModalClose.bind(this);
        this.handleDeleteModalClose = this.handleDeleteModalClose.bind(this);
    }

    handleUserList(data) {
        this.setState({
            users: data.results,
            activeUser: null,
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
        this.setState({
            deleteModalShow: false
        });
    }

    handleDeleteClickNo() {
        this.setState({
            deleteModalShow: false
        })
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
        });
    }

    handleUserModalSave(user) {
        this.setState({
            createModalShow: false
        });
        this.api.list()
        .done((data) => this.handleUserList(data))
        .fail((data) => this.handleUserListFail(data.responseJSON, data.statusText));
    }

    handleUserModalClose() {
        this.setState({
            createModalShow: false
        });
    }

    handleDeleteModalClose() {
        this.setState({
            deleteModalShow: false
        });
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
                                <th className="text-xs-center" width="100px">Remover</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.users.map((user) =>
                                <tr key={user.id} className="table table-bordered table-hover">
                                    <td>
                                        <Link to={`/user/${user.id}`}>{user.id}</Link>
                                    </td>
                                    <td>{user.full_name}</td>
                                    <td>{user.email}</td>
                                    <td>
                                    { user.is_active ? (
                                        <button title="Remover usuário" type="button" className="btn btn-danger" onClick={() => this.handleDeleteClick(user)}>
                                            <span className="fa fa-trash fa-lg"></span>
                                        </button>
                                    ) : (
                                        <button title="Reativar usuário" type="button" className="btn btn-warning" onClick={() => this.handleUndeleteClick(user)}>
                                            <span className="fa fa-undo fa-lg"></span>
                                        </button>
                                    )}
                                     </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <UserModal show={this.state.createModalShow} onSave={this.handleUserModalSave} onClose={this.handleUserModalClose}></UserModal>
                <ConfirmationModal show={this.state.deleteModalShow} onYes={this.handleDeleteClickYes} onNo={this.handleDeleteClickNo} onClose={this.handleDeleteModalClose}></ConfirmationModal>
            </div>
        )
    }
}

export default withRouter(UserBoard);
