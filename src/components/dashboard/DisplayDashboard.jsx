import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router";

export class DisplayDashboard extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let dashboard;

        if (!this.props.user) {
            return (
                <div>
                    You must login to view this page
                </div>
            );
        }
        else {
            if (this.props.user.get('classification') === 'client') {
                dashboard = (
                    <div>
                        <p>You can either: </p>
                        <div><Link to={`${this.props.location.pathname}/createEvent`}>Create a Event</Link></div>
                        <div><Link to={`${this.props.location.pathname}/manageEvents`}>Manage your Events</Link></div>
                        <div><Link to={`/event/abcdefg`}>Go to an event</Link></div>
                        <div><Link to={`/event/abcdefg/ticket/hijklmn/exchange`}>Go to an exchange</Link></div>
                        <div><Link to={`/event/abcdefg/ticket/hijklmn/buy`}>Buy a ticket</Link></div>
                    </div>
                );
            }
            else{
                dashboard = (
                    <div>
                        <p>You can either: </p>
                        <div><Link to={`/event/abcdefg`}>Go to an event</Link></div>
                        <div><Link to={`/event/abcdefg/ticket/hijklmn/exchange`}>Go to an exchange</Link></div>
                        <div><Link to={`/event/abcdefg/ticket/hijklmn/buy`}>Buy a ticket</Link></div>
                    </div>
                );

            }
        }

        return dashboard;
    }
}

function mapStateToProps(state, ownProps) {
    const user = state.getIn(['app', 'user']);

    return {
        user
    };
}

export const DisplayDashboardContainer = connect(
    mapStateToProps
)(DisplayDashboard);