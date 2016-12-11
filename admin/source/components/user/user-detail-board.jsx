import React from 'react';
import { IndexLink, Link, withRouter } from 'react-router';


class UserDetailBoard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="card">
                <div className="card-header">
                    <ul className="nav nav-tabs card-header-tabs float-xs-left">
                        <li className="nav-item">
                            <IndexLink to={`/user/${this.props.params.id}`} className="nav-link" activeClassName="active">Detalhes</IndexLink>
                        </li>

                        <li className="nav-item">
                            <Link to={`/user/${this.props.params.id}/finance`} className="nav-link disabled" activeClassName="active">Financeiro</Link>
                        </li>

                        <li className="nav-item">
                            <Link to={`/user/${this.props.params.id}/history`} className="nav-link disabled" activeClassName="active">Histórico</Link>
                        </li>
                    </ul>
                </div>

                <div className="card-block">
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default withRouter(UserDetailBoard);
