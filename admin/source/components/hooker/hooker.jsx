import React from 'react';
import { Link, withRouter } from 'react-router';

import { ConfirmationModal } from '../commons/modal.jsx';
import HookerModal from './hooker-modal.jsx';
import HookerEndpoint from '../../services/hooker.js';


class HookerBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hookers: [],
            createModalShow: false,
            deleteModalShow: false
        };
        this.api = new HookerEndpoint();
        this.handleCreateClick = this.handleCreateClick.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.handleDeleteClickYes = this.handleDeleteClickYes.bind(this);
        this.handleDeleteClickNo = this.handleDeleteClickNo.bind(this);
        this.handleDeleteModalClose = this.handleDeleteModalClose.bind(this);
        this.handleHookerModalSave = this.handleHookerModalSave.bind(this);
        this.handleHookerModalClose = this.handleHookerModalClose.bind(this);
    }

    handleCreateClick() {
        this.setState({
            createModalShow: true
        });
    }

    handleDeleteClick() {
    }

    handleDeleteClickYes() {
    }

    handleDeleteClickNo() {
    }

    handleDeleteModalClose() {
    }

    handleHookerModalSave(hooker) {
        this.api.list()
        .done((data) => this.handleHookerList(data))
        .fail((data) => this.handleHookerListFail(data.responseJSON, data.statusText));

        this.setState({
            createModalShow: false,
        });
    }

    handleHookerModalClose() {
        this.setState({
            createModalShow: false
        });
    }

    handleHookerList(data) {
        this.setState({
            hookers: data.results
        });
    }

    handleHookerListFail(data) {
        if (status == 'Unauthorized') {
            localStorage.removeItem('token');
            this.props.router.push('/login');
        } else {
            console.log(`Unkown error ${data} - ${status}`);
        }
    }

    componentDidMount() {
        this.api.list()
        .done((data) => this.handleHookerList(data))
        .fail((data) => this.handleHookerListFail(data.responseJSON, data.statusText));
    }

    render() {
        return (
            <div className="row">
                <div className="col-xs-12">
                    <nav className="navbar navbar-light navbar-full bg-faded">
                        <Link to={'/hooker/create'} className="btn btn-primary float-xs-right">
                            <span className="fa fa-user-plus"></span>
                        </Link>
                    </nav>
                </div>

                <div className="col-xs-12">
                    <div className="card-deck">
                        {this.state.hookers.map((hooker) =>
                            <div className="card" key={hooker.id}>
                                <img className="card-img-top" src={hooker.picture} />
                                <div className="card-block">
                                    <h4 className="card-title text-xs-center"> {hooker.name} </h4>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <HookerModal show={this.state.createModalShow} onSave={this.handleHookerModalSave} onClose={this.handleHookerModalClose} />
                <ConfirmationModal show={this.state.deleteModalShow} onYes={this.handleDeleteClickYes} onNo={this.handleDeleteClickNo} onClose={this.handleDeleteModalClose}></ConfirmationModal>
            </div>
        );
    }
}

export default withRouter(HookerBoard);
