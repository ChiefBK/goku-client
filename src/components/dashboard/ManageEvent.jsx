import React from 'react';
import {connect} from 'react-redux';

import * as actionCreators from '../../action';

export class ManageEvent extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>

            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {};
}

export const ManageEventContainer = connect(
    mapStateToProps,
    actionCreators
)(ManageEvent);