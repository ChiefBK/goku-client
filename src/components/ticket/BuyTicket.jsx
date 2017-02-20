import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../../action';
import {ListTicketsContainer} from '../ticket/ListTickets'

class BuyTicket extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            page: 1
        };
    }

    handleQuantityChange(e) {
        this.state.quantity = parseInt(e.target.value);
    }

    handleNextPage(e) {
        this.setState({page: this.state.page + 1});
    }

    handlePreviousPage(e) {
        this.setState({page: this.state.page - 1});
    }

    componentWillMount(){
        if (!this.props.event) {
            this.props.readItem(this.props.params.eventId, 0);
        }

        if (!this.props.ticket) {
            this.props.readItem(this.props.params.ticketId, 0);
        }

        if (!this.props.sellOrders) {
            this.props.readOrdersOfTicket(this.props.params.ticketId);
        }
    }

    render() {
        const firstPage = (
            <div>
                <div className="row">
                    <div className="col-sm-12 col-md-6 col-md-offset-3">
                        <h3 className="text-center">How many tickets would you like?</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12 col-md-3 col-md-offset-5">
                        <input type="text" onChange={this.handleQuantityChange.bind(this)}/>
                    </div>
                    <div className="sol-sm-12 col-md-2">
                        <button onClick={this.handleNextPage.bind(this)}>Next</button>
                    </div>
                </div>
            </div>
        );

        if (this.state.page == 1) {
            return firstPage;
        }
        else {
            return (
                <ListTicketsContainer quantity={this.state.quantity} ticket={this.props.ticket} event={this.props.event} sellOrders={this.props.sellOrders}/>
            );
        }
    }
}

function mapStateToProps(state, ownProps) {
    const ticket = state.getIn(['items', ownProps.params.ticketId]);
    const event = state.getIn(['items', ownProps.params.eventId]);
    let sellOrders;

    if(ticket){
        sellOrders = state.get('items').filter((item) => {
            return item.get('ticketId_') == ticket.get('id') && item.get('orderType') === 'sell';
        });
    }

    return {
        ticket,
        event,
        sellOrders
    };
}

export const BuyTicketContainer = connect(
    mapStateToProps,
    actionCreators
)(BuyTicket);