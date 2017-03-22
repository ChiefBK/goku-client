import React from 'react';
import {connect} from 'react-redux';

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
    mapStateToProps
)(ManageEvents);