import React from 'react';


class User extends React.Component {
    render() {
        return (
            <div className="row">
                <div className="col-md-12">
                    <nav className="navbar navbar-light navbar-full bg-faded">
                        <form className="form-inline float-xs-right">
                            <button type="button" data-toggle="modal" data-target="#modalCreateUser" className="btn btn-primary">
                                <span className="fa fa-user-plus"></span>
                            </button>
                        </form>
                    </nav>
                </div>

                <div className="col-md-12">
                    <table className="table table-bordered text-xs-center">
                        <thead className="thead-inverse">
                            <tr>
                                <th className="text-xs-center">#</th>
                                <th className="text-xs-center">Nome</th>
                                <th className="text-xs-center">E-mail</th>
                                <th className="text-xs-center"></th>
                                <th className="text-xs-center"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>Willian de Morais</td>
                                <td>williandmorais@gmail.com</td>
                                <td>
                                    <button type="button" className="btn btn-success">
                                        <span className="fa fa-edit fa-lg"> </span>
                                    </button>
                                </td>
                                <td>
                                    <button type="button" className="btn btn-danger" data-toggle="modal" data-target="#modalDeleteUser">
                                        <span className="fa fa-trash fa-lg"></span>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="modal fade" id="modalCreateUser">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Fechar">
                                     <span className="fa fa-remove"></span>
                                </button>
                                <h4 className="modal-title">Criar usuário</h4>
                            </div>

                            <div className="modal-body">
                                <form>
                                    <div className="form-group row">
                                        <label className="col-md-2 col-form-label">Nome</label>
                                        <div className="col-md-10">
                                            <input className="form-control" type="text" maxLength="50" required />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label className="col-md-2 col-form-label">Sobrenome</label>
                                        <div className="col-md-10">
                                            <input className="form-control" type="text" maxLength="50" required />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label className="col-md-2 col-form-label">E-mail</label>
                                        <div className="col-md-10">
                                            <input className="form-control" type="email" required />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label className="col-md-2 col-form-label">Senha</label>
                                        <div className="col-md-10">
                                            <input className="form-control" type="password" required />
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

                <div className="modal fade" id="modalDeleteUser">
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
                                    <div className="row text-xs-center">
                                        <div className="col-md-4">
                                            <button className="btn btn-danger btn-block">Não</button>
                                        </div>

                                        <div className="col-md-4">
                                            <button className="btn btn-success btn-block">Sim</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default User;
