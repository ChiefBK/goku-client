import React from 'react';
import {connect} from 'react-redux';

export class DisplayDatetime extends React.PureComponent{
    render(){
        let dateTimeString;
        if(this.props.dateTimeMillis){
            dateTimeString = new Date(this.props.dateTimeMillis).toLocaleString();
        }
        else{
            dateTimeString = 'N/A';
        }

        return (
            <div>
                <span>
                    {this.props.label}
                    :
                </span>
                <span>
                {dateTimeString}
                </span>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps){
    return {};
}

export const DisplayDatetimeContainer = connect(
    mapStateToProps
)(DisplayDatetime);