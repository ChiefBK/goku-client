import React from 'react';
import {connect} from 'react-redux';

import * as actionCreators from '../../action';

export class PatronAlerts extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <h3>Patron Alerts</h3>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {};
}

export const PatronAlertsContainer = connect(
    mapStateToProps,
    actionCreators
)(PatronAlerts);