import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';

import * as actionCreators from '../../action';
import {CreateAutomationContainer} from '../automation/CreateAutomation';
import {CreatePatronAlertsContainer} from '../alert/CreatePatronAlerts';
import {CreateTicketContainer} from '../ticket/CreateTicket';
import {CreateEventContainer} from './CreateEvent';
import {CreateVenueContainer} from '../venue/CreateVenue';
import {generateId} from '../../../util';

class CreateEventForm extends React.PureComponent {
    constructor(props) {
        super(props);

        this.handleStateChange = this.handleStateChange.bind(this);
        this.handleCommaSeparatedValues = this.handleCommaSeparatedValues.bind(this);

        this.state = {};
    }

    handleCreateEvent(e) {
        const createPayload = [];

        this.state.ticketTypes = ['general', 'vip'];
        // const startDateTime = new Date(this.state.date);
        const startDateTime = new Date('2017-6-8');
        // startDateTime.setHours(this.state.time.split(':')[0]);
        startDateTime.setHours(21);
        startDateTime.setMinutes(0);
        // startDateTime.setMinutes(this.state.time.split(':')[1]);

        const venue = {};
        venue.id = generateId();
        // venue.name = this.state.venue.name;
        venue.name = 'the aragon';
        venue.model = 'venue';
        // venue.address = this.state.venue.address;
        venue.address = '283 arrrr street';
        venue.phoneNumber = '1234567890';
        // venue.phoneNumber = this.state.venue.phoneNumber;
        createPayload.push(venue);

        const event = {};
        event.id = generateId();
        event.model = 'event';
        // event.name = this.state.name;
        event.name = 'lolla';
        // event.description = this.state.description;
        event.description = 'descrip';
        event.startDateTime = startDateTime;
        event.venueId_ = venue.id;
        createPayload.push(event);

        for(let i in this.state.ticketTypes){
            let ticketType = this.state.ticketTypes[i];
            const quantity = 5;
            // const quantity = this.state.ticketDetails[ticketType]['quantity'];
            // const price = this.state.ticketDetails[ticketType]['price'];
            const price = 20;

            const ticket = {};
            ticket.id = generateId();
            ticket.model = 'ticket';
            ticket.ticketType = ticketType;
            ticket.eventId_ = event.id;
            createPayload.push(ticket);

            for(let j = 0; j < quantity; j++){
                const order = {};
                order.id = generateId();
                order.model = 'order';
                order.orderType = 'sell';
                order.price = price;
                order.ticketId_ = ticket.id;
                createPayload.push(order);
            }
        }

        this.props.createRemote(createPayload, this.props.params);

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
                            <CreatePatronAlertsContainer/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <CreateAutomationContainer/>
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

export const CreateEventTopContainer = connect(
    mapStateToProps,
    actionCreators
)(CreateEventForm);

