import React from 'react';
import { Link, withRouter } from 'react-router';

import ServiceEndpoint from '../../services/service.js';
import ServiceModal from './service-modal.jsx';


class ServiceBoard extends React.Component {
    constructor(props) {
        super(props);
        this.api = new ServiceEndpoint();
        this.state = {
            services: [],
            createModalShow: false
        }
        this.handleCreateClick = this.handleCreateClick.bind(this);
        this.handleServiceList = this.handleServiceList.bind(this);
        this.handleServiceListFail = this.handleServiceListFail.bind(this);
        this.handleCreateModalClose = this.handleCreateModalClose.bind(this);
        this.handleCreateModalSave = this.handleCreateModalSave.bind(this);
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
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.services.map((service) =>
                                <tr key={service.id} className="table table-bordered table-hover">
                                    <td> {service.id} </td>
                                    <td> {service.name} </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <ServiceModal show={this.state.createModalShow} onClose={this.handleCreateModalClose} onSave={this.handleCreateModalSave}/>
            </div>
        )
    }
}

export default withRouter(ServiceBoard);
