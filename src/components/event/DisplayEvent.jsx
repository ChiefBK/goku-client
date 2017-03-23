import React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as eventActions from "../../actions/event";
import {DisplayDatetimeContainer} from "../datetime/DisplayDatetime";

export class DisplayEvent extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log("fetching event " + this.props.params.eventId);
        this.props.sendReadEvent(this.props.params.eventId);
    }

    render() {
        // console.log(this.store.getState());
        if (this.props.pendingEvents.size == 0 && this.props.event) {
            const ticketsAndOrders = [];

            const tickets = this.props.event.get('tickets');

            tickets.forEach((ticket) => {
                ticketsAndOrders.push(
                    <div className="row">
                        <div className="col-sm-3">
                            <h4>{ticket.get('name')}</h4>
                        </div>
                    </div>
                );

                const orders = ticket.get('orders');
                orders.forEach((order) => {
                    ticketsAndOrders.push(
                        <div className="row">
                            <div className="col-sm-3">{order.get('price')}</div>
                            <div className="col-sm-3">{order.get('orderType')}</div>
                            <div className="col-sm-3">{order.get('status')}</div>
                        </div>
                    );
                });
            });

            return (
                <div>
                    <div id="event-header" className="row">
                        <div className="col-sm-12">
                            <h2>{this.props.event.get('name')}</h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <h4>Description</h4>
                            {this.props.event.get('description')}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12 col-md-6">
                            <h4>When</h4>
                            <DisplayDatetimeContainer dateTimeMillis={this.props.event.get('startDateTime')} label="Doors Open"/>
                            <DisplayDatetimeContainer dateTimeMillis={this.props.event.get('endDateTime')} label="Event Ends"/>
                        </div>
                        <div className="col-sm-12 col-md-6">
                            <h4>Where</h4>
                            <div>{this.props.event.get('venue').first().get('name')}</div>
                            <div>{this.props.event.get('venue').first().get('address')}</div>
                            <div>{this.props.event.get('venue').first().get('phoneNumber')}</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <h4>Performers</h4>
                            performer description goes here
                        </div>
                    </div>
                    <div className="row">
                        <h3>Tickets</h3>
                        {ticketsAndOrders}
                    </div>
                </div>
            );
        }
        else {
            return (
                <div>
                    Loading...
                </div>
            );
        }
    }
}

function mapStateToProps(state, ownProps) {
    const event = state.getIn(['events', ownProps.params.eventId]);
    const pendingEvents = state.get('pending');

    return {
        event,
        pendingEvents
    };
}

function mapDispatchToProps(dispatch) {
    const allActions = Object.assign({}, eventActions);

    return bindActionCreators(allActions, dispatch);
}

export const DisplayEventContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(DisplayEvent);