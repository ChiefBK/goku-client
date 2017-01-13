import React from 'react';
import {connect} from 'react-redux';

import * as actionCreators from '../action';

export class Datetime extends React.PureComponent{
    render(){
        let dateTime = new Date(this.props.dateTimeMillis);

        return (
            <div>
                <span>
                    {
                        this.props.label
                    }
                    :
                </span>
                <span>
                {
                    dateTime.toLocaleString()
                }
                </span>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps){
    return {};
}

export const DatetimeContainer = connect(
    mapStateToProps,
    actionCreators
)(Datetime);