import React from 'react';
import {connect} from 'react-redux';

import * as actionCreators from '../action';

export class Welcome extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                Welcome to EN3!
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {};
}

export const WelcomeContainer = connect(
    mapStateToProps,
    actionCreators
)(Welcome);