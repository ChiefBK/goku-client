import React from 'react';
import {connect} from 'react-redux';
import {toJS} from 'immutable';

import * as actionCreators from '../action';
import {DatetimeContainer} from '../components/Datetime';

export class Event extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    componentWillMount(){
        if(this.props.event == null){
            console.log("fetching event " + this.props.params.eventId);
            this.props.fetchEvent(this.props.params.eventId);
        }
    }

    render() {
        // console.log(this.store.getState());

        if(this.props.event){
            return (
                <div>
                    <div id="event-header" className="row z-depth-1 no-margin">
                        <div className="col s12 m3">
                            <img id="event-image" src="https://consequenceofsound.files.wordpress.com/2016/01/lollapalooza-2015.png" alt="img test" className="circle responsive-img z-depth-3" />
                        </div>
                        <div className="col s12 m9">
                            <h2 id="event-header-title">{this.props.event.name}</h2>
                        </div>
                    </div>
                    <div id="event-subheader" className="row">
                        <div className="col s6">
                        </div>
                        <div className="col s6">

                        </div>
                    </div>
                    <div className="row">
                        <div className="col s12">
                            <div className="card-panel lighten-2 teal">
                                {this.props.event.description}
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s12 m6">
                            <div className="card-panel lighten-2 orange">
                                <DatetimeContainer dateTimeMillis={this.props.event.startDateTime} label="Doors Open"/>
                                <DatetimeContainer dateTimeMillis={this.props.event.endDateTime} label="Event Ends"/>
                            </div>
                        </div>
                        <div className="col s12 m6">
                            <div className="card-panel lighten-2 red">

                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s12">
                            <div className="card-panel lighten-2 blue">
                                performer description goes here
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        else{
            return (
                <div>
                    Loading...
                </div>
            );
        }
    }
}

function mapStateToProps(state, ownProps) {
    const e = state.get('events').find((event) => {
        return event.id == ownProps.params.eventId;
    }, null, null);

    const v = state.get('venues').find((venue) => {
        return e.venueID == venue.id;
    }, null, null);

    return {
        event: e,
        venue: v
    };
}

export const EventContainer = connect(
    mapStateToProps,
    actionCreators
)(Event);