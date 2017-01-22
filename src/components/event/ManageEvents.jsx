import React from 'react';
import {connect} from 'react-redux';

import * as actionCreators from '../../action';

export class ManageEvents extends React.PureComponent {

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

export const ManageEventsContainer = connect(
    mapStateToProps,
    actionCreators
)(ManageEvents);