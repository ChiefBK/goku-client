import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

import * as actionCreators from '../action';

export class Wrapper extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="container">
                <Link to={`/user/difdofdod/dashboard`}>Dashboard</Link>
                <br/><br/>
                {this.props.children}
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {};
}

export const WrapperContainer = connect(
    mapStateToProps,
    actionCreators
)(Wrapper);