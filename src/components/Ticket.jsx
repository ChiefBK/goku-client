import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../action';

class Ticket extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            quantity: ''
        };
    }

    handleQuantityChange(e) {
        this.state.quantity = e.target.value;
    }

    handleNextPage(e) {
        this.setState({page: this.state.page + 1});
    }

    handlePreviousPage(e) {
        this.setState({page: this.state.page - 1});
    }

    render() {
        const firstPage = (
            <div className="container">
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

        const secondPage = (
            <div>
                This is the second page
            </div>
        );

        if (this.state.page == 1) {
            return firstPage;
        }
        else {
            return secondPage;
        }
    }
}

function mapStateToProps() {
    return {};
}

export const TicketContainer = connect(
    mapStateToProps,
    actionCreators
)(Ticket);