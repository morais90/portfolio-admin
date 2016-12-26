import React from 'react';
import { withRouter } from 'react-router';

import ServiceEndpoint from '../../services/service.js';


class ServiceModal extends React.Component {

    constructor(props) {
        super(props);
        this.api = new ServiceEndpoint();
        this.state = {
            name: ''
        };
        this.handleModalClose = this.handleModalClose.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleServiceCreate = this.handleServiceCreate.bind(this);
        this.handleServiceCreateFail = this.handleServiceCreateFail.bind(this);
    }

    handleModalClose() {
        if (this.props.onClose) {
            this.props.onClose();
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        let data = {
           name: this.state.name
        };

        this.api.create(data)
        .done((data) => this.handleServiceCreate(data))
        .fail((data) => this.handleServiceCreateFail(data.responseJSON, data.statusText));
    }

    handleServiceCreate(data) {
        if (this.props.onSave) {
            this.props.onSave(data);
        }

        this.setState({
            name: ''
        });
    }

    handleServiceCreateFail(error, status) {
        if (status == 'Unauthorized') {
            localStorage.removeItem('token');
            this.props.router.push('/login');
        } else {
            console.log(`Unkown error ${error} - ${status}`);
        }
    }

    handleNameChange(e) {
        this.setState({
            name: e.target.value
        });
    }

    componentDidUpdate() {
        if (this.props.show) {
            $('#modalCreateService').modal('show');
        } else {
            $('#modalCreateService').modal('hide');
        }
    }

    render() {
        return (
            <div className="modal fade" id="modalCreateService">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Fechar" onClick={this.handleModalClose}>
                                <span className="fa fa-remove"></span>
                            </button>
                            <h4 id="modal-title-user" className="modal-title">Criar serviço</h4>
                        </div>

                        <div className="modal-body">
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-group row">
                                    <label className="col-xs-2 col-form-label">Nome</label>
                                    <div className="col-xs-10">
                                        <input className="form-control" type="text" maxLength="50" value={this.state.name} onChange={this.handleNameChange} required/>
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

export default ServiceModal;
