import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

import * as actionCreators from '../../action';

export class Dashboard extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <p>You can either: </p>
                <div><Link to={`${this.props.location.pathname}/createEvent`}>Create a Event</Link></div>
                <div><Link to={`${this.props.location.pathname}/manageEvents`}>Manage your Events</Link></div>
                <div><Link to={`/event/abcdefg`}>Go to an event</Link></div>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {};
}

export const DashboardContainer = connect(
    mapStateToProps,
    actionCreators
)(Dashboard);