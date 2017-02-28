import React from 'react';
import {connect} from 'react-redux';
import {List} from 'immutable';

import * as actionCreators from '../../action';

export class CreateOrder extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            orderType: 'buy',
            orderPrice: ''
        };
    }

    handleOrderTypeChange(e) {
        this.setState({
            orderType: e.target.value
        });
    }

    handlePriceChange(e) {
        this.setState({
            orderPrice: parseFloat(e.target.value)
        });
    }

    handleOrderCreate(e) {
        if(this.props.user){
            const orderId = this.props.idleOrders.first().get('id');

            this.props.updateRemote(orderId, {
                status: 'active',
                price: this.state.orderPrice
            });

            this.priceInput.value = '';
        }
        else{
            //TODO - handle error (no user logged in)
        }
    }

    render() {
        if(!this.props.user){
            return (
                <div>
                    You must be logged in to create orders
                </div>
            );
        }

        return (
            <div>
                <div>
                    <h4>{this.props.idleOrders.size > 0 ? `You have ${this.props.idleOrders.size} tickets you may put on sale` : `You have no tickets or are not logged in`}</h4>
                </div>
                <input type="text" onChange={this.handlePriceChange.bind(this)} ref={(input) => {this.priceInput = input}}/>
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
                <button disabled={this.props.idleOrders.size === 0} onClick={this.handleOrderCreate.bind(this)}>Submit</button>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    const user = state.getIn(['app', 'user']);

    let idleOrders = List();

    if(user){
        idleOrders = this.props.orders.filter((order) => {
            return order.get('userId_') == user.get('id') && order.get('status') == 'idle'
        }, this);
    }

    return {
        user,
        idleOrders
    };
}

export const CreateOrderContainer = connect(
    mapStateToProps,
    actionCreators
)(CreateOrder);