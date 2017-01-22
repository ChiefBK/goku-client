import React from 'react';
import {connect} from 'react-redux';
import diff from 'immutablediff';
import {List} from 'immutable';

import * as actionCreators from '../../action';
import {getOrdersByUser} from '../../core';

export class DisplayExchange extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            orderType: 'buy',
            orderPrice: ''
        };
    }

    componentWillMount() {
        if (!this.props.event) {
            this.props.syncItem(this.props.params.eventId);
        }

        if (!this.props.ticket) {
            this.props.syncItem(this.props.params.ticketId);
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

    handleOrderTypeChange(e) {
        this.setState({
            orderType: e.target.value
        });
    }

    handlePriceChange(e) {
        this.setState({
            orderPrice: e.target.value
        });
    }

    handleOrderCreate(e) {
        const user = 'ddddddddd';
        this.props.createOrder({
            model: 'order',
            orderType: this.state.orderType,
            price: parseFloat(this.state.orderPrice),
            userID: user,
            ticketID: this.props.params.ticketId
        });
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
            if (order.get('orderType') == 'buy') {
                buyOrders.push(order);
            }
            else if (order.get('orderType') == 'sell') {
                sellOrders.push(order);
            }
        });

        let sortAssending = (orderA, orderB) => {
            return orderA.get('price') - orderB.get('price');
        };

        let sortDecending = (orderA, orderB) => {
            return orderB.get('price') - orderA.get('price');
        };

        buyOrders = buyOrders.sort(sortAssending);
        sellOrders = sellOrders.sort(sortAssending);

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
                <div>
                    <input type="text" onChange={this.handlePriceChange.bind(this)}/>
                    <div>
                        <label>
                            <input type="radio" value="sell" checked={this.state.orderType == 'sell'} onChange={this.handleOrderTypeChange.bind(this)}/>
                            Sell Order
                        </label>
                    </div>
                    <div>
                        <label>
                            <input type="radio" value="buy" checked={this.state.orderType == 'buy'} onChange={this.handleOrderTypeChange.bind(this)}/>
                            Buy Order
                        </label>
                    </div>
                    <button onClick={this.handleOrderCreate.bind(this)}>Submit</button>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    const ticket = state.getIn(['items', ownProps.params.ticketId]);
    const event = state.getIn(['items', ownProps.params.eventId]);

    let orders;

    if (ticket) {
        orders = state.get('items').filter((item) => {
            return item.get('model') == 'order' && item.get('ticketID') == ticket.get('id');
        });
    }

    return {
        ticket,
        event,
        orders
    };
}

export const DisplayExchangeContainer = connect(
    mapStateToProps,
    actionCreators
)(DisplayExchange);