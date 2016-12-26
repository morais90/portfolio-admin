import React from 'react';
import Dropzone from 'react-dropzone';
import { withRouter } from 'react-router';

import HookerEndpoint from '../../services/hooker.js';


class HookerModal extends React.Component {
    constructor(props) {
        super(props);
        this.api = new HookerEndpoint();
        this.state = {
            name: '',
            age: '',
            height: '',
            weight: '',
            picture: '',
        };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleAgeChange = this.handleAgeChange.bind(this);
        this.handleHeightChange = this.handleHeightChange.bind(this);
        this.handleWeightChange = this.handleWeightChange.bind(this);
        this.handlePictureUpload = this.handlePictureUpload.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleHookerCreate = this.handleHookerCreate.bind(this);
        this.handleHookerCreateFail = this.handleHookerCreateFail.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
    }

    handleNameChange(e) {
        this.setState({
            name: e.target.value
        });
    }

    handleAgeChange(e) {
        this.setState({
            age: e.target.value
        });
    }

    handleHeightChange(e) {
        this.setState({
            height: e.target.value
        });
    }

    handleWeightChange(e) {
        this.setState({
            weight: e.target.value
        });
    }

    handlePictureUpload(e) {
        console.log(e);
    }

    handleSubmit(e) {
        e.preventDefault();
        let data = {
            name: this.state.name,
            age: this.state.age,
            height: this.state.height,
            //            weight: this.state.weight
        };
        this.api.create(data)
        .done((data) => this.handleHookerCreate(data))
        .fail((data) => this.handleHookerCreateFail(data.responseJSON, data.statusText));
    }

    handleHookerCreate(data) {
        if (this.props.onSave) {
            this.props.onSave(data);
        }
    }

    handleHookerCreateFail(error, status) {
        if (status == 'Unauthorized') {
            localStorage.removeItem('token');
            this.props.router.push('/login');
        } else {
            console.log(`Unkown error ${error} - ${status}`);
        }
    }

    handleModalClose() {
        if (this.props.onClose) {
            this.props.onClose();
        }
    }

    componentDidUpdate() {
        if (this.props.show) {
            $('#modalHookerUser').modal('show');
        } else {
            $('#modalHookerUser').modal('hide');
        }
    }

    render() {
        return (
            <div className="modal fade" id="modalHookerUser">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Fechar" onClick={this.handleModalClose}>
                                <span className="fa fa-remove"></span>
                            </button>
                            <h4 id="modal-title-user" className="modal-title">Criar modelo</h4>
                        </div>

                        <div className="modal-body">
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-group row">
                                    <label className="col-xs-2 col-form-label">Nome</label>
                                    <div className="col-xs-10">
                                        <input className="form-control" type="text" maxLength="50" value={this.state.name} onChange={this.handleNameChange} required/>
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label className="col-xs-2 col-form-label">Idade</label>
                                    <div className="col-xs-10">
                                        <input className="form-control" type="number" value={this.state.age} onChange={this.handleAgeChange} required/>
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label className="col-xs-2 col-form-label">Altura</label>
                                    <div className="col-xs-10">
                                        <div className="input-group">
                                            <input className="form-control" type="number" value={this.state.height} onChange={this.handleHeightChange} required/>
                                            <span className="input-group-addon">m</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label className="col-xs-2 col-form-label">Peso</label>
                                    <div className="col-xs-10">
                                        <div className="input-group">
                                            <input className="form-control" type="number" value={this.state.weight} onChange={this.handleWeightChange} required/>
                                            <span className="input-group-addon">kg</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label className="col-xs-3 col-form-label"> Foto de perfil </label>
                                    <div className="col-xs-9">
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

export default withRouter(HookerModal);
