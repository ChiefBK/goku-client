import React from 'react';
import {connect} from 'react-redux';

export class CreateEvent extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <h2>Create an Event</h2>
                <div className="form-group">
                    <label htmlFor="event-name">Name</label>
                    <input type="text" id="event-name" onChange={(e) => this.props.handleInputChange('name', e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="event-description">Description</label>
                    <input type="text" id="event-description" onChange={(e) => this.props.handleInputChange('description', e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="event-date">Date</label>
                    <input type="text" id="event-date" onChange={(e) => this.props.handleInputChange('date', e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="event-time">Time</label>
                    <input type="text" id="event-time" onChange={(e) => this.props.handleInputChange('time', e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="event-performer">Performer(s)</label>
                    <input type="text" id="event-performer" onChange={(e) => this.props.handleCommaSeparatedInputChange('performers', e.target.value)}/>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {};
}

export const CreateEventContainer = connect(
    mapStateToProps
)(CreateEvent);