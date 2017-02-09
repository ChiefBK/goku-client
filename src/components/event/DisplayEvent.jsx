import React from 'react';
import {connect} from 'react-redux';
import {toJS} from 'immutable';

import * as actionCreators from '../../action';
import {DisplayDatetimeContainer} from '../datetime/DisplayDatetime';

export class DisplayEvent extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    componentWillMount(){
        console.log("fetching event " + this.props.params.eventId);
        this.props.syncItem(this.props.params.eventId);
    }

    render() {
        // console.log(this.store.getState());

        if(this.props.event && this.props.venue){
            return (
                <div>
                    <div id="event-header" className="row">
                        <div className="col-sm-12">
                            <h2>{this.props.event.get('name')}</h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <h4>Description</h4>
                            {this.props.event.get('description')}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12 col-md-6">
                            <h4>When</h4>
                            <DisplayDatetimeContainer dateTimeMillis={this.props.event.get('startDateTime')} label="Doors Open"/>
                            <DisplayDatetimeContainer dateTimeMillis={this.props.event.get('endDateTime')} label="Event Ends"/>
                        </div>
                        <div className="col-sm-12 col-md-6">
                            <h4>Where</h4>
                            <div>{this.props.venue.get('name')}</div>
                            <div>{this.props.venue.get('address')}</div>
                            <div>{this.props.venue.get('phoneNumber')}</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <h4>Performers</h4>
                            performer description goes here
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
    const e = state.getIn(['items', ownProps.params.eventId]);
    let v;
    if (e){
        v = state.getIn(['items', e.get('venueId_')]);
    }

    return {
        event: e,
        venue: v,
    };
}

export const DisplayEventContainer = connect(
    mapStateToProps,
    actionCreators
)(DisplayEvent);