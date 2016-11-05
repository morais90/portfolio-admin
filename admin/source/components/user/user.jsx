import React from 'react';

var pagination = {
    NUM_PER_PAGE: 3,
    NUM_PAGES: 0,
    CURRENT_PAGE: 0
}

// Necessario para testes
window.list_users = []
//TODO pegar usuarios da API
function getUsers() {
    if (window.list_users.length > 0) {
        return window.list_users
    }
    window.list_users = [
        {
            id: '1',
            name: 'Football',
            lastname: 'Premier',
            email: 'foot@ball.com',
            password: 'wowo'
        }, {
            id: '2',
            name: 'Catarina',
            lastname: 'Catarinense',
            email: 'cata@rina.com',
            password: 'wowo'
        }, {
            id: '3',
            name: 'Inspirion',
            lastname: 'Dell',
            email: 'inspirion@dell.com',
            password: 'wowo'
        }, {
            id: '4',
            name: 'Marquito',
            lastname: 'Mosca',
            email: 'marquito@mosca.com',
            password: 'wowo'
        }, {
            id: '5',
            name: 'Hugo',
            lastname: 'Chaves',
            email: 'hugo@chaves.com',
            password: 'wowo'
        }, {
            id: '6',
            name: 'Hugo',
            lastname: 'Chaves',
            email: 'hugo@chaves.com',
            password: 'wowo'
        }, {
            id: '7',
            name: 'Hugo',
            lastname: 'Chaves',
            email: 'hugo@chaves.com',
            password: 'wowo'
        }, {
            id: '8',
            name: 'Hugo',
            lastname: 'Chaves',
            email: 'hugo@chaves.com',
            password: 'wowo'
        }, {
            id: '9',
            name: 'Hugo',
            lastname: 'Chaves',
            email: 'hugo@chaves.com',
            password: 'wowo'
        }, {
            id: '10',
            name: 'Hugo',
            lastname: 'Chaves',
            email: 'hugo@chaves.com',
            password: 'wowo'
        }, {
            id: '11',
            name: 'Hugo',
            lastname: 'Chaves',
            email: 'hugo@chaves.com',
            password: 'wowo'
        }, {
            id: '12',
            name: 'Hugo',
            lastname: 'Chaves',
            email: 'hugo@chaves.com',
            password: 'wowo'
        }
    ];

    return window.list_users
}

let control = {
    id: undefined,
    name: "",
    lastname: "",
    email: "",
    password: ""
}

function clearControl() {
    control = {
        id: undefined,
        name: "",
        lastname: "",
        email: "",
        password: ""
    }
}
function updateNumPages() {
    pagination.NUM_PAGES = Math.ceil(getUsers().length / pagination.NUM_PER_PAGE)
}
function changePage(e) {
    updateNumPages()
    if (e !== undefined) {
        if (e === -1) {
            pagination.CURRENT_PAGE = (pagination.CURRENT_PAGE - 1) < 0 ? 0 : pagination.CURRENT_PAGE - 1
        } else if (e === -99) {
            pagination.CURRENT_PAGE = (pagination.CURRENT_PAGE + 1) > pagination.NUM_PAGES - 1 ? pagination.NUM_PAGES - 1 : pagination.CURRENT_PAGE + 1
        } else {
            pagination.CURRENT_PAGE = e
        }
    }
    if (pagination.CURRENT_PAGE === pagination.NUM_PAGES) {
        pagination.CURRENT_PAGE = pagination.NUM_PAGES - 1
    }

    $(".page-item").removeClass("active")
    $("#page-" + pagination.CURRENT_PAGE).addClass("active")

    $("#tabela").find('tbody tr').hide()
    let first = pagination.CURRENT_PAGE * pagination.NUM_PER_PAGE
    let last  = (pagination.CURRENT_PAGE + 1) * pagination.NUM_PER_PAGE
    $("#tabela").find('tbody tr').slice(first, last).show()
}

function LinkPaginate() {
    updateNumPages()
    let lis = []
    for (let i = 0; i < pagination.NUM_PAGES; i++) {
        var id = "page-" + i
        lis.push(
            <li className="page-item" id={id} key={i} onClick={changePage.bind(null, i)}>
                <a className="page-link" href="#">{i + 1}</a>
            </li>
        )
    }
    return lis
}

class NavBarPagination extends React.Component {
    render() {
        return (
            <nav id="nav-pagination" aria-label="Page navigation">
                <ul className="pagination">
                    <li className="page-item" onClick={changePage.bind(null, -1)}>
                        <a className="page-link" href="#" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                            <span className="sr-only">Previous</span>
                        </a>
                    </li>
                    {LinkPaginate()}
                    <li className="page-item" onClick={changePage.bind(null, -99)}>
                        <a className="page-link" href="#" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                            <span className="sr-only">Next</span>
                        </a>
                    </li>
                </ul>
            </nav>
        )
    }
}

class UserRow extends React.Component {
    constructor(props) {
        super(props)
    }

    onDelEvent(props) {
        control = this.props.user
        $("#modal-delete-user").modal()
    }

    onEditEvent(props) {
        control = this.props.user
        $("#user-name").val(this.props.user.name)
        $("#user-lastname").val(this.props.user.lastname)
        $("#user-email").val(this.props.user.email)
        $("#user-password").val(this.props.user.password)
        $("#modal-create-user").modal()
        $("#modal-title-user").text('Editar usuário')
    }

    render() {
        return (
            <tr>
                <td>{this.props.user.id}</td>
                <td>{this.props.user.name}</td>
                <td>{this.props.user.email}</td>
                <td>
                    <div className="btn-group">
                        <button title="Editar usuário" type="button" className="btn btn-sm btn-success" onClick={this.onEditEvent.bind(this)}>
                            <span className="fa fa-edit fa-lg"></span>
                        </button>
                        <button title="Remover usuário" type="button" className="btn btn-sm btn-danger" onClick={this.onDelEvent.bind(this)}>
                            <span className="fa fa-trash fa-lg"></span>
                        </button>
                    </div>
                </td>
            </tr>
        )
    }
}

class UserTable extends React.Component {

    render() {
        let rows = []
        this.props.users.forEach(function(user) {
            rows.push(<UserRow user={user} key={user.id}/>)
        })
        return (
            <div className="col-xs-12">
                <table id="tabela" className="table table-bordered text-xs-center">
                    <thead className="thead-inverse">
                        <tr>
                            <th className="text-xs-center" scope="row">#</th>
                            <th className="text-xs-center">Nome</th>
                            <th className="text-xs-center">E-mail</th>
                            <th className="text-xs-center" width="100px">Operações</th>
                        </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </table>
            </div>
        )
    }
}

class User extends React.Component {
    constructor(props) {
        super(props)
        this.handleClickAdd = this.handleClickAdd.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleReset = this.handleReset.bind(this)
        this.state = {
            users: getUsers()
        }
    }

    componentDidUpdate(props) {
        changePage()
    }

    // organiza tabela apos ser renderizada
    componentDidMount() {
        changePage()
    }

    clearModalCreateUsuer() {
        clearControl()
        $("#user-name").val("")
        $("#user-lastname").val("")
        $("#user-email").val("")
        $("#user-password").val("")
    }

    //TODO salvar Usuario na API
    handleSubmit(event) {
        control.name = $("#user-name").val()
        control.lastname = $("#user-lastname").val()
        control.email = $("#user-email").val()
        control.password = $("#user-password").val()
        var index = this.state.users.indexOf(control);
        if (index === -1) {
            //adicionando id fake
            control.id = window.list_users.length + 1
            this.state.users.push(control)
        }
        this.setState(this.state.users);
        this.clearModalCreateUsuer()
        $("#modal-create-user").modal("hide")
    }

    handleReset(e) {
        this.clearModalCreateUsuer()
    }

    //TODO remover usuario da API
    handleConfirmRemove(e) {
        var index = this.state.users.indexOf(control);
        this.state.users.splice(index, true);
        this.setState(this.state.users);
        $("#modal-delete-user").modal("hide")
        this.clearModalCreateUsuer()
    }

    handleNonRemove(e) {
        $("#modal-delete-user").modal("hide")
        clearControl()
    }

    handleClickAdd(event) {
        $("#modal-create-user").modal()
        $("#modal-title-user").text('Adicionar usuário')
    }

    render() {
        return (
            <div id="teste" className="form-control row">
                <div className="col-md-12">
                    <nav className="navbar navbar-light navbar-full bg-faded">
                        <button title="Adicionar usuário" id="button-add-user" className="btn btn-primary float-xs-right" onClick={this.handleClickAdd}>
                            <span className="fa fa-user-plus"></span>
                        </button>
                    </nav>
                </div>
                <UserTable users={this.state.users}/>
                <NavBarPagination className=" text-xs-center"/>

                <div className="modal fade" id="modal-create-user">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Fechar" onClick={this.handleReset}>
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
                                    <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>Salvar</button>
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
                                            <button className="btn btn-danger btn-block" onClick={this.handleNonRemove.bind(this)}>Não</button>
                                        </div>
                                        <div className="col-xs-6">
                                            <button className="btn btn-success btn-block" onClick={this.handleConfirmRemove.bind(this)}>Sim</button>
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

export default User;
