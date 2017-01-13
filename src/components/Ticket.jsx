import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../action';

class Ticket extends React.PureComponent{
    render(){
        return (
            <div></div>
        );
    }
}

function mapStateToProps() {
    return {};
}

export const TicketContainer = connect(
    mapStateToProps,
    actionCreators
)(Ticket);