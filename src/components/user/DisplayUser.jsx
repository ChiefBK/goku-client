import React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as userActions from "../../actions/user";

export class DisplayUser extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount() {
        if (!this.props.user) {
            this.props.sendReadUser(this.props.params.userId);
        }
    }

    render() {
        if (this.props.pendingEvents.size > 0 || !this.props.user) {
            return (
                <div>
                    Loading........
                </div>
            )
        }

        const yourEvents = this.props.user.get('host').map((event) => {
            const venue = event.get('venue');
            return (
                <div className="row">
                    <div className="col-sm-4">{event.get('name')}</div>
                    <div className="col-sm-4">{venue.get('name')}</div>
                </div>
            );
        });

        const yourTickets = [];
        this.props.user.get('patron').entrySeq().forEach(([eventId, event]) => {
            const e = this.props.events.get(eventId);
            event.entrySeq().forEach(([ticketId, ticket]) => {
                const t = e.getIn(['tickets', ticketId]);
                ticket.forEach((order) => {
                    yourTickets.push(
                        <div className="row">
                            <div className="col-sm-2">{order.get('status')}</div>
                            <div className="col-sm-2">{t.get('name')}</div>
                            <div className="col-sm-3">{e.get('name')}</div>
                            <div className="col-sm-2">{order.get('price')}</div>
                        </div>
                    );
                });
            });
        });

        return (
            <div>
                <div className="row">
                    <div className="col-sm-6">
                        {this.props.user.get('firstName')}
                    </div>
                    <div className="col-sm-6">
                        {this.props.user.get('lastName')}
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        {this.props.user.get('email')}
                    </div>
                </div>
                <div className="row">
                    <h3>Your Events</h3>
                    {yourEvents}
                </div>
                <div className="row">
                    <h3>Your Tickets</h3>
                    {yourTickets}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    const user = state.getIn(['users', ownProps.params.userId]);
    const pendingEvents = state.get('pending');
    const events = state.get('events');

    return {
        user,
        pendingEvents,
        events
    };
}

function mapDispatchToProps(dispatch) {
    const allActions = Object.assign({}, userActions);

    return bindActionCreators(allActions, dispatch);
}

export const DisplayUserContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(DisplayUser);