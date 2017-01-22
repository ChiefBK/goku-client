import React from 'react';
import {connect} from 'react-redux';

import * as actionCreators from '../../action';

export class CreateAutomation extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <h4>Automate</h4>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {};
}

export const CreateAutomationContainer = connect(
    mapStateToProps,
    actionCreators
)(CreateAutomation);