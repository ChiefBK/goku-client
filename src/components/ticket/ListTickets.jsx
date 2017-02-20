import React from "react";
import {connect} from "react-redux";
import * as actionCreators from "../../action";
import {sortOrdersAscending} from "../../core";
import {Link} from 'react-router';

export class ListTickets extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount() {

    }

    render() {
        const sellOrdersSortedList = this.props.sellOrders.toList().sort(sortOrdersAscending);
        const ticketCart = [];
        let total = 0;

        for (let i = 0; i < this.props.quantity; i++) {
            const price = sellOrdersSortedList.get(i).get('price');
            total += price;

            ticketCart.push(
                <div className="row">
                    <div className="col-sm-6">
                        Ticket {i}
                    </div>
                    <div className="col-sm-6">
                        {price}
                    </div>
                </div>
            );
            if (i === this.props.quantity - 1) {
                ticketCart.push(
                    <hr className="style8"/>
                )
            }
            else {
                ticketCart.push(
                    <hr className="style4"/>
                )
            }

        }

        ticketCart.push(
            <div className="row">
                <div className="col-sm-6">
                    Sub Total
                </div>
                <div className="col-sm-6">
                    {total.toFixed(2)}
                </div>
            </div>
        );
        const fee = (total * 0.05);

        ticketCart.push(
            <div className="row">
                <div className="col-sm-6">
                    Fees (5 %)
                </div>
                <div className="col-sm-6">
                    {fee.toFixed(2)}
                </div>
            </div>
        );

        ticketCart.push(
            <div className="row">
                <div className="col-sm-6">
                    Grand Total
                </div>
                <div className="col-sm-6">
                    {(total + fee).toFixed(2)}
                </div>
            </div>
        );

        return (
            <div>
                <div className="ticket-list">
                    {ticketCart}
                    <br/>
                    <br/>
                    <div className="row">
                        <div className="col-sm-12">
                            Don't like the price? Place a bid on the <Link to={`/event/${this.props.event.get('id')}/ticket/${this.props.ticket.get('id')}/exchange`}>Exchange</Link> instead!
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {};
}

export const ListTicketsContainer = connect(
    mapStateToProps,
    actionCreators
)(ListTickets);