import React from 'react';
import Dropzone from 'react-dropzone';
import { withRouter } from 'react-router';

import HookerEndpoint from '../../services/hooker.js';


export class HookerCreateGeneral extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="row">
                <div className="col-xs-12">
                    <div className="card-deck">
                        <div className="card bg-primary text-white text-xs-center">
                            <h4 className="card-title">Informações gerais</h4>
                        </div>
                        <div className="card bg-faded text-xs-center">
                            <h4>Foto de perfil</h4>
                        </div>
                        <div className="card bg-faded text-xs-center">
                            <h4>Contatos</h4>
                        </div>
                    </div>
                </div>

                <div className="col-xs-12">

                </div>
            </div>
        )
    }
}


export class HookerCreatePicture extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>Create Picture</div>
        )
    }
}

export class HookerCreateContact extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>Create Contact</div>
        )
    }
}
