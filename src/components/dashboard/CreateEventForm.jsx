import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';

import * as actionCreators from '../../action';
import {AutomationContainer} from './Automation';
import {PatronAlertsContainer} from './PatronAlerts';
import {CreateTicketContainer} from './CreateTicket';
import {CreateEventContainer} from './CreateEvent';
import {CreateVenueContainer} from './CreateVenue';
import {generateId} from '../../../util';

class CreateEventForm extends React.PureComponent {
    constructor(props) {
        super(props);

        this.handleStateChange = this.handleStateChange.bind(this);
        this.handleCommaSeparatedValues = this.handleCommaSeparatedValues.bind(this);

        this.state = {};
    }

    handleCreateEvent(e) {
        const startDateTime = new Date(this.state.date);
        startDateTime.setHours(this.state.time.split(':')[0]);
        startDateTime.setMinutes(this.state.time.split(':')[1]);

        const venue = {};
        venue.id = generateId();
        venue.name = this.state.venue.name;
        venue.model = 'venue';
        venue.address = this.state.venue.address;
        venue.phoneNumber = this.state.venue.phoneNumber;
        this.props.createRemote(venue);

        const event = {};
        event.id = generateId();
        event.model = 'event';
        event.name = this.state.name;
        event.description = this.state.description;
        event.startDateTime = startDateTime;
        event.venueID = venue.id;
        this.props.createRemote(event);

        for(let i in this.state.ticketTypes){
            let ticketType = this.state.ticketTypes[i];
            const quantity = this.state.ticketDetails[ticketType]['quantity'];
            const price = this.state.ticketDetails[ticketType]['price'];

            const ticket = {};
            ticket.id = generateId();
            ticket.model = 'ticket';
            ticket.ticketType = ticketType;
            ticket.eventID = event.id;
            this.props.createRemote(ticket);

            for(let j = 0; j < quantity; j++){
                const order = {};
                order.id = generateId();
                order.model = 'order';
                order.orderType = 'sell';
                order.price = price;
                order.ticketID = ticket.id;
                this.props.createRemote(order);
            }
        }


    }

    handleStateChange(key, val) {
        _.set(this.state, key, val);
    };

    handleCommaSeparatedValues(key, val) {
        let split = val.split(',');
        split = split.map((item) => item.trim());

        _.set(this.state, key, split);
        return split;
    }

    render() {
        if (this.props.hasPending){
            return (
                <div>
                    LOADING.... MOTHER FUCKERRRR
                </div>
            );
        }
        else{
            return (
                <div>
                    <div className="row">
                        <div className="col-md-6">
                            <CreateEventContainer handleInputChange={this.handleStateChange} handleCommaSeparatedInputChange={this.handleCommaSeparatedValues}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-10">
                            <CreateVenueContainer handleInputChange={this.handleStateChange} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-10">
                            <CreateTicketContainer handleInputChange={this.handleStateChange} handleCommaSeparatedInputChange={this.handleCommaSeparatedValues}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <PatronAlertsContainer/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <AutomationContainer/>
                        </div>
                    </div>
                    <div className="row">
                        <button onClick={this.handleCreateEvent.bind(this)}>Create</button>
                    </div>
                </div>
            )
        }


    }
}

function mapStateToProps(state, ownProps) {
    return {
        hasPending: state.get('pending').size > 0
    };
}

export const CreateEventFormContainer = connect(
    mapStateToProps,
    actionCreators
)(CreateEventForm);

