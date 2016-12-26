import React from 'react';
import { Link, withRouter } from 'react-router';

import { ConfirmationModal } from '../commons/modal.jsx';
import ServiceEndpoint from '../../services/service.js';
import ServiceModal from './service-modal.jsx';


class ServiceBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            services: [],
            activeService: null,
            editService: null,
            deleteModalShow: false,
            createModalShow: false
        }
        this.api = new ServiceEndpoint();
        this.handleCreateClick = this.handleCreateClick.bind(this);
        this.handleServiceList = this.handleServiceList.bind(this);
        this.handleServiceListFail = this.handleServiceListFail.bind(this);
        this.handleCreateModalClose = this.handleCreateModalClose.bind(this);
        this.handleCreateModalSave = this.handleCreateModalSave.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.handleDeleteClickYes = this.handleDeleteClickYes.bind(this);
        this.handleDeleteClickNo = this.handleDeleteClickNo.bind(this);
        this.handleDeleteModalClose = this.handleDeleteModalClose.bind(this);
        this.handleServiceDelete = this.handleServiceDelete.bind(this);
        this.handleServiceDeleteFail = this.handleServiceDeleteFail.bind(this);
        this.handleOnNameChange = this.handleOnNameChange.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);
        this.handleSaveClick = this.handleSaveClick.bind(this);
        this.handleServiceUpdate = this.handleServiceUpdate.bind(this);
        this.handleServiceUpdateFail = this.handleServiceUpdateFail.bind(this);
    }

    handleCreateClick() {
        this.setState({
            createModalShow: true
        });
    }

    handleCreateModalClose() {
        this.setState({
            createModalShow: false
        });
    }

    handleCreateModalSave() {
        this.setState({
            createModalShow: false
        });

        this.api.list()
        .done((data) => this.handleServiceList(data))
        .fail((data) => this.handleServiceListFail(data.responseJSON, data.statusText));
    }

    handleServiceList(data) {
        this.setState({
           services: data.results
        });
    }

    handleServiceListFail(error, status) {
        if (status == 'Unauthorized') {
            localStorage.removeItem('token');
            this.props.router.push('/login');
        } else {
            console.log(`Unkown error ${error} - ${status}`);
        }
    }

    handleDeleteClick(service) {
        this.setState({
            activeService: service,
            deleteModalShow: true
        });
    }

    handleDeleteClickYes() {
        this.api.remove(this.state.activeService.id)
        .done((data) => this.handleServiceDelete(data))
        .fail((data) => this.handleServiceDeleteFail(data.responseJSON, data.statusText));

        this.setState({
            deleteModalShow: false
        });
    }

    handleDeleteClickNo() {
        this.setState({
            deleteModalShow: false
        });
    }

    handleDeleteModalClose() {
        this.setState({
            deleteModalShow: false
        });
    }

    handleServiceDelete(data) {
        this.api.list()
        .done((data) => this.handleServiceList(data))
        .fail((data) => this.handleServiceListFail(data.responseJSON, data.statusText));
    }

    handleServiceDeleteFail(error, status) {
        if (status == 'Unauthorized') {
            localStorage.removeItem('token');
            this.props.router.push('/login');
        } else {
            console.log(`Unkown error ${error} - ${status}`);
        }
    }

    handleEditClick(service) {
        this.setState({
            editService: service
        });
    }

    handleSaveClick() {
        let service = this.state.editService;
        let data = {
            name: service.name
        };

        this.api.update(service.id, data)
        .done((data) => this.handleServiceUpdate(data))
        .fail((data) => this.handleServiceUpdateFail(data.responseJSON, data.statusText))

        this.setState({
            editService: null
        });
    }

    handleServiceUpdate(data) {
        this.api.list()
        .done((data) => this.handleServiceList(data))
        .fail((data) => this.handleServiceListFail(data.responseJSON, data.statusText));
    }

    handleServiceUpdateFail(error, status) {
        if (status == 'Unauthorized') {
            localStorage.removeItem('token');
            this.props.router.push('/login');
        } else {
            console.log(`Unkown error ${error} - ${status}`);
        }
    }

    handleOnNameChange(e) {
        let service = this.state.editService;
        service.name = e.target.value;

        this.setState({
            editService: service
        });
    }

    componentDidMount() {
        this.api.list()
        .done((data) => this.handleServiceList(data))
        .fail((data) => this.handleServiceListFail(data.responseJSON, data.statusText));
    }

    render() {
        return (
            <div className="row">
                <div className="col-xs-12">
                    <nav className="navbar navbar-light navbar-full bg-faded">
                        <button title="Adicionar serviço" className="btn btn-primary float-xs-right" onClick={this.handleCreateClick}>
                            <span className="fa fa-plus"></span>
                        </button>
                    </nav>
                </div>

                <div className="col-xs-12">
                    <table className="table table-bordered text-xs-center">
                        <thead className="thead-inverse">
                            <tr>
                                <th className="text-xs-center" scope="row">#</th>
                                <th className="text-xs-center">Nome</th>
                                <th className="text-xs-center">Editar</th>
                                <th className="text-xs-center">Remover</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.services.map((service) =>
                                <tr key={service.id} className="table table-bordered table-hover">
                                    <td> {service.id} </td>
                                    <td>
                                        {this.state.editService == service ? (
                                            <input type="text" value={this.state.editService.name} className="form-control" onChange={this.handleOnNameChange}/>
                                        ) : (
                                            service.name
                                        )}
                                    </td>
                                    <td>
                                    {this.state.editService == service ? (
                                        <button title="Salvar" type="button" className="btn btn-success" onClick={this.handleSaveClick}>
                                            <span className="fa fa-check fa-lg"></span>
                                        </button>

                                    ) : (
                                        <button title="Editar serviço" type="button" className="btn btn-success" onClick={() => this.handleEditClick(service)}>
                                            <span className="fa fa-edit fa-lg"></span>
                                        </button>
                                    )}
                                    </td>
                                    <td>
                                        <button title="Remover serviço" type="button" className="btn btn-danger" onClick={() => this.handleDeleteClick(service)}>
                                            <span className="fa fa-trash fa-lg"></span>
                                        </button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <ServiceModal show={this.state.createModalShow} onClose={this.handleCreateModalClose} onSave={this.handleCreateModalSave}/>
                <ConfirmationModal show={this.state.deleteModalShow} onYes={this.handleDeleteClickYes} onNo={this.handleDeleteClickNo} onClose={this.handleDeleteModalClose}></ConfirmationModal>
            </div>
        )
    }
}

export default withRouter(ServiceBoard);
