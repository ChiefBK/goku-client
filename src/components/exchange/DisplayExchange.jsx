import React from "react";
import {connect} from "react-redux";
import {CreateOrderContainer} from "../order/CreateOrder";
import {DisplayOrderContainer} from "../order/DisplayOrder";

export class DisplayExchange extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount() {
        if (!this.props.event) {
            this.props.readItem(this.props.params.eventId, 0);
        }

        if (!this.props.ticket) {
            this.props.readItem(this.props.params.ticketId, 0);
        }

        if (!this.props.orders) {
            this.props.readOrdersOfTicket(this.props.params.ticketId);
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
            if (order.get('status') === 'active') {
                if (order.get('orderType') == 'buy') {
                    buyOrders.push(order);
                }
                else if (order.get('orderType') == 'sell') {
                    sellOrders.push(order);
                }
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
                                return <DisplayOrderContainer order={order} user={this.props.user}/>
                            }, this)
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
                                return <DisplayOrderContainer order={order} user={this.props.user}/>
                            }, this)
                        }
                        </tbody>
                    </table>
                </div>
                <CreateOrderContainer ticket={this.props.ticket} orders={this.props.orders}/>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    const ticket = state.getIn(['items', ownProps.params.ticketId]);
    const event = state.getIn(['items', ownProps.params.eventId]);
    const user = state.getIn(['app', 'user']);

    let orders;

    if (ticket) {
        orders = state.get('items').filter((item) => {
            return item.get('model') == 'order' && item.get('ticketId_') == ticket.get('id');
        });
    }

    return {
        ticket,
        event,
        orders,
        user
    };
}

export const DisplayExchangeContainer = connect(
    mapStateToProps
)(DisplayExchange);