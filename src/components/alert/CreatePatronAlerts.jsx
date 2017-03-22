import React from 'react';
import {connect} from 'react-redux';

export class CreatePatronAlerts extends React.PureComponent {

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

export const CreatePatronAlertsContainer = connect(
    mapStateToProps
)(CreatePatronAlerts);