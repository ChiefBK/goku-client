import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import sha512 from 'js-sha512';

import * as actionCreators from '../action';

export class Wrapper extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {};
    }

    login() {
        this.props.authorizeUser('testemail@aol.com', sha512('012345'));
    }

    render() {
        let userLink;

        if (this.props.user) {
            userLink = (
                <Link to={`/user/${this.props.user.get('id')}`}>{this.props.user.get('firstName') + ' ' + this.props.user.get('lastName')}</Link>
            );
        }
        else {
            userLink = (
                <a onClick={this.login.bind(this)}>Login</a>
            );
        }

        return (
        <div className="body">
            <div className="container">
                <div>
                    <Link to={`/user/difdofdod/dashboard`}>Dashboard</Link>
                </div>
                <div>{userLink}</div>
                <br/><br/>
                {this.props.children}
            </div>
        </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        user: state.getIn(['app', 'user'])
    };
}

export const WrapperContainer = connect(
    mapStateToProps,
    actionCreators
)(Wrapper);