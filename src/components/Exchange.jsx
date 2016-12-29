import React from 'react';
import {connect} from 'react-redux';
import diff from 'immutablediff';

import * as actionCreators from '../action';
import {getOrdersByUser} from '../core';

export class Exchange extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {}
    }

    componentWillMount() {
        console.log("url args");
        console.log(this.props.params);

        this.props.readOrdersOfTicket(this.props.params.ticketId);
    }

    componentWillReceiveProps(nextProps, nextState) {
        //TODO - When orders prop changes set buyOrders and sellOrders

        let difference = diff(nextProps.orders, this.props.orders);
        console.log("difference");
        console.log(difference);



    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     //TODO - if orders didn't change than don't update
    // }

    render() {
        let buyOrders = [];
        let sellOrders = [];

        this.props.orders.forEach((order) => {
            console.log(order);
            if(order.get('orderType') == 'buy'){
                buyOrders.push(order);
            }
            else if(order.get('orderType') == 'sell'){
                sellOrders.push(order);
            }
        });

        return (
            <div>
                <div>
                    <h2>Buy Orders</h2>
                    <table>
                        <tbody>
                            {
                                buyOrders.map((order) => {
                                    return <tr><td>{order.get('price')}</td><td>{order.get('user')}</td></tr>
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
                                    return <tr><td>{order.get('price')}</td><td>{order.get('user')}</td></tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    console.log("Order - mapStateToProps");
    return {
        orders: state.get('orders')
    };
}

export const ExchangeContainer = connect(
    mapStateToProps,
    actionCreators
)(Exchange);