import React from 'react';


class ConfirmationModal extends React.Component {

    constructor(props) {
        super(props);
        this.handleClickYes = this.handleClickYes.bind(this);
        this.handleClickNo = this.handleClickNo.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleClose() {
        if (this.props.onClose) {
            this.props.onClose();
        }
    }

    handleClickYes() {
        if (this.props.onYes) {
            this.props.onYes();
        }
    }

    handleClickNo() {
        if (this.props.onNo) {
            this.props.onNo();
        }
    }

    handleClose() {
        if (this.props.onClose) {
            this.props.onClose();
        }
    }

    componentDidUpdate() {
        if (this.props.show) {
            $('#ConfirmationModal').modal('show');
        }
    }

    render() {
        return (
            <div className="modal fade" id="ConfirmationModal">
                <div className="modal-dialog modal-sm" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Fechar" onClick={this.handleClose}>
                                <span className="fa fa-remove"></span>
                            </button>
                            <h5 className="modal-title">Você tem certeza que deseja realizar esta ação?</h5>
                        </div>

                        <div className="modal-body">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-xs-6">
                                        <button className="btn btn-danger btn-block" data-dismiss="modal" onClick={this.handleClickNo}>Não</button>
                                    </div>
                                    <div className="col-xs-6">
                                        <button className="btn btn-success btn-block" data-dismiss="modal" onClick={this.handleClickYes}>Sim</button>
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

export { ConfirmationModal };
