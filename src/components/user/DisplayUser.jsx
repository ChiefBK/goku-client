import React from 'react';
import {connect} from 'react-redux';

import * as actionCreators from '../../action';

export class DisplayUser extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount() {
        if (!this.props.user) {
            this.props.readItem(this.props.params.userId, 0);
        }
    }

    render() {
        if(!this.props.user){
            return (
                <div>
                    Loading........
                </div>
            )
        }

        return (
            <div>

            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    const user = state.getIn(['app', 'user']);

    return {
        user
    };
}

export const DisplayUserContainer = connect(
    mapStateToProps,
    actionCreators
)(DisplayUser);