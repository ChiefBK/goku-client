import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import sha512 from 'js-sha512';

export class Wrapper extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {};
    }

    loginUser() {
        this.props.authorizeUser('testemail@aol.com', sha512('012345'));
    }

    loginClient(){
        this.props.authorizeUser('thickness@gmail.com', sha512('012345'));
    }

    logoutUser(){
        this.props.signOutUser();
    }

    render() {
        let userLink;

        if (this.props.user) {
            userLink = (
                <div>
                    <div>
                        <Link to={`/user/${this.props.user.get('id')}`}>{this.props.user.get('firstName') + ' ' + this.props.user.get('lastName')}</Link>
                    </div>
                    <div>
                        <a onClick={this.logoutUser.bind(this)}>Logout</a>
                    </div>
                </div>
            );
        }
        else {
            userLink = (
                <div>
                    <div>
                        <a onClick={this.loginUser.bind(this)}>Login User</a>
                    </div>
                    <div>
                        <a onClick={this.loginClient.bind(this)}>Login Client</a>
                    </div>
                </div>
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
    // return {
    //     user: state.getIn(['app', 'user'])
    // };
    return {};
}

export const WrapperContainer = connect(
    mapStateToProps
)(Wrapper);