import React from 'react';
import {connect} from 'react-redux';

import * as actionCreators from '../action';
import {getOrdersByUser} from '../core';

export class Order extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            type: 'buy',
            price: ''
        }
    }

    handleTypeChange(event) {
        this.setState({
            type: event.target.value
        })
    }

    handlePriceChange(event) {
        this.setState({
            price: event.target.value
        })
    }

    handleCreateOrder(event) {
        console.log("Component - create order - " + this.props.user + " - " + this.state.price + " - " + this.state.type);

        // this.props.createOrder(this.props.user, this.state.price, this.state.type);
        if (this.state.type == 'buy') {
            this.props.createBuyOrder(this.props.user.get('id'), this.state.price);
        }
        else if (this.state.type == 'sell') {
            this.props.createSellOrder(this.props.user.get('id'), this.state.price);
        }
    }

    render() {
        return (
            <div>
                <label>
                    <input type="text" onChange={this.handlePriceChange.bind(this)}/>
                    Order Price
                </label>
                <label>
                    <input type="radio" value="buy" checked={this.state.type === 'buy'} onChange={this.handleTypeChange.bind(this)}/>
                    Buy Order
                </label>
                <label>
                    <input type="radio" value="sell" checked={this.state.type === 'sell'} onChange={this.handleTypeChange.bind(this)}/>
                    Sell Order
                </label>
                <button onClick={this.handleCreateOrder.bind(this)}>Place Order</button>

                <div>
                    <table>
                        <tbody>
                            {
                                this.props.openOrders.map((order, index) => {
                                    return <tr><td>{index}</td><td>{order['id']}</td><td>{order['price']}</td><td>{order['orderType']}</td></tr>
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
        user: state.get('user'),
        openOrders: getOrdersByUser(state.get('orders'), state.getIn(['user', 'id']))
    };
}

export const OrderContainer = connect(
    mapStateToProps,
    actionCreators
)(Order);