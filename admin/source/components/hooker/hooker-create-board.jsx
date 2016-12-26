import React from 'react';
import { withRouter } from 'react-router';

import HookerEndpoint from '../../services/hooker.js';


class HookerCreateBoard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container">{this.props.children}</div>
        )
    }
}

export default HookerCreateBoard;
