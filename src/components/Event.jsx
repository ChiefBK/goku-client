import React from 'react';
import {connect} from 'react-redux';

import * as actionCreators from '../action';

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


        return (
            <div>
                <div id="event-header" className="row z-depth-1 no-margin">
                    <div className="col s12 m3">
                        <img id="event-image" src="https://consequenceofsound.files.wordpress.com/2016/01/lollapalooza-2015.png" alt="img test" className="circle responsive-img z-depth-3" />
                    </div>
                    <div className="col s12 m9">
                        {
                            this.props.event ?
                                <h2 id="event-header-title">{this.props.event.name}</h2> :
                                <span>Loading...</span>
                        }
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
                            This is a card panel with a teal lighten-2 class
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col s12 m6">
                        <div className="card-panel lighten-2 orange">
                            This is a card panel with a teal lighten-2 class
                        </div>
                    </div>
                    <div className="col s12 m6">
                        <div className="card-panel lighten-2 red">
                            This is a card panel with a teal lighten-2 class
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col s12">
                        <div className="card-panel lighten-2 blue">
                            This is a card panel with a teal lighten-2 class
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        event: state.get('events').find((event) => {
            return event.id == this.props.params.eventId;
        })
    };
}

export const EventContainer = connect(
    mapStateToProps,
    actionCreators
)(Event);