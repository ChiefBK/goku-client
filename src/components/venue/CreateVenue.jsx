import React from 'react';
import {connect} from 'react-redux';

import * as actionCreators from '../../action';

export class CreateVenue extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <h3>Venue</h3>
                <div className="form-group">
                    <label htmlFor="venue-name">Name</label>
                    <input id="venue-name" type="text" onChange={(e) => this.props.handleInputChange('venue.name', e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="venue-address">Address</label>
                    <input id="venue-address" type="text" onChange={(e) => this.props.handleInputChange('venue.address', e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="venue">Phone Number</label>
                    <input id="venue-phoneNumber" type="text" onChange={(e) => this.props.handleInputChange('venue.phoneNumber', e.target.value)}/>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {};
}

export const CreateVenueContainer = connect(
    mapStateToProps,
    actionCreators
)(CreateVenue);