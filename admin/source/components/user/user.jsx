import React from 'react';
import UserEndpoint from '../../services/user.jsx';


class UserBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        };
        this.api = new UserEndpoint();
    }

    handleUserList(data) {
        console.log(data);
    }

    handleUserListFail(data) {
        console.log(data);
    }

    componentDidMount() {
        this.api.list()
        .done(
            (data) => this.handleUserList(data.responseJSON)
        )
        .fail(
            (data) => this.handleUserListFail(data.responseJSON)
        );
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
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>
                                    <div className="btn-group">
                                        <button title="Editar usuário" type="button" className="btn btn-sm btn-success">
                                            <span className="fa fa-edit fa-lg"></span>
                                        </button>
                                        <button title="Remover usuário" type="button" className="btn btn-sm btn-danger">
                                            <span className="fa fa-trash fa-lg"></span>
                                        </button>
                                    </div>
                                </td>
                            </tr>
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

                <div className="modal fade" id="modal-delete-user">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Fechar">
                                    <span className="fa fa-remove"></span>
                                </button>
                                <h4 className="modal-title">Você tem certeza que deseja realizar esta ação?</h4>
                            </div>

                            <div className="modal-body">
                                <div className="container-fluid">
                                    <div className="row col-xs-12">
                                        <div className="col-xs-6">
                                            <button className="btn btn-danger btn-block">Não</button>
                                        </div>
                                        <div className="col-xs-6">
                                            <button className="btn btn-success btn-block">Sim</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default UserBoard;
