import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../action';

class Dashboard extends React.PureComponent{
    constructor(props){
        super(props);
        this.state = {

        };
    }

    handleCreateEvent(e){

    }

    render(){
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <h2>Create an Event</h2>
                        <div className="form-group">
                            <label htmlFor="event-name">Name</label>
                            <input type="text" id="event-name"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="event-description">Description</label>
                            <input type="text" id="event-description"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="event-date">Date</label>
                            <input type="text" id="event-date"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="event-time">Time</label>
                            <input type="text" id="event-time"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="event-performer">Performer(s)</label>
                            <input type="text" id="event-performer"/>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <h3>Tickets</h3>
                        <div className="form-group">
                            <label htmlFor="ticket-type">Ticket Type(s)</label>
                            <input type="text" id="ticket-type"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="ticket-quantity">Ticket Quantity</label>
                            <input type="text" id="ticket-quantity"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="ticket-price">Ticket Price</label>
                            <input type="text" id="ticket-price"/>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <h3>Patron Alerts</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <h3>Automations</h3>
                    </div>
                </div>
                <div className="row">
                    <button onClick={this.handleCreateEvent.bind(this)}>Create</button>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps){
    return {};
}

export const DashboardContainer = connect(
    mapStateToProps,
    actionCreators
)(Dashboard);

