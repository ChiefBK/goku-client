import React from 'react';
import {connect} from 'react-redux';
import diff from 'immutablediff';
import {List} from 'immutable';

import * as actionCreators from '../action';
import {getOrdersByUser} from '../core';

export class Exchange extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {}
    }

    componentWillMount() {
        // console.log("url args");
        // console.log(this.props.params);
        // console.log(this.props.ticket);
        // console.log(this.props.event);
        // console.log(this.props.orders);

        if (!this.props.event) {
            this.props.fetchEvent(this.props.params.eventId);
        }

        if (!this.props.ticket) {
            this.props.fetchTicket(this.props.params.ticketId);
        }

        if (!this.props.orders) {
            this.props.fetchOrdersOfTicket(this.props.params.ticketId);
        }
    }

    componentWillReceiveProps(nextProps, nextState) {
        //TODO - When orders prop changes set buyOrders and sellOrders

        // let difference = diff(nextProps.orders, this.props.orders);
        // console.log("difference");
        // console.log(difference);


    }

    render() {
        let buyOrders = [];
        let sellOrders = [];

        if (!this.props.event || !this.props.ticket || !this.props.orders) {
            return (
                <div>Loading...</div>
            );
        }

        this.props.orders.forEach((order) => {
            console.log(order);
            if (order.get('orderType') == 'buy') {
                buyOrders.push(order);
            }
            else if (order.get('orderType') == 'sell') {
                sellOrders.push(order);
            }
        });

        return (
            <div>
                <div>
                    <h3>{this.props.event.name}</h3>
                </div>
                <div>
                    <h4>{this.props.ticket.ticketType}</h4>
                </div>
                <div>
                    <h2>Buy Orders</h2>
                    <table>
                        <tbody>
                        {
                            buyOrders.map((order) => {
                                return <tr>
                                    <td>{order.get('price')}</td>
                                </tr>
                            })
                        }
                        </tbody>
                    </table>
                </div>
                <div>
                    <h2>Sell Orders</h2>
                    <table>
                        <tbody>
                        {
                            sellOrders.map((order) => {
                                return <tr>
                                    <td>{order.get('price')}</td>
                                </tr>
                            })
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    const ticket = state.get('tickets').find((ticket) => {
        return ticket.get('id') == ownProps.params.ticketId;
    });

    const event = state.get('events').find((event) => {
        return event.get('id') == ownProps.params.eventId;
    });

    let orders;

    if (ticket !== undefined) {
        orders = state.get('orders').filter((order) => {
            return order.get('ticketID') == ticket.get('id');
        });
    }

    return {
        ticket,
        event,
        orders
    };
}

export const ExchangeContainer = connect(
    mapStateToProps,
    actionCreators
)(Exchange);