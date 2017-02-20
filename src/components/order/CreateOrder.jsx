import React from 'react';
import {connect} from 'react-redux';

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
            orderPrice: e.target.value
        });
    }

    handleOrderCreate(e) {
        if(this.props.user){
            this.props.createRemote({
                model: 'order',
                orderType: this.state.orderType,
                price: parseFloat(this.state.orderPrice),
                userId_: this.props.user.get('id'),
                ticketId_: this.props.ticket.get('id')
            });
        }
        else{
            //TODO - handle error (no user logged in)
        }
    }

    render() {
        return (
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
        );
    }
}

function mapStateToProps(state, ownProps) {
    const user = state.getIn(['app', 'user']);

    return {
        user
    };
}

export const CreateOrderContainer = connect(
    mapStateToProps,
    actionCreators
)(CreateOrder);