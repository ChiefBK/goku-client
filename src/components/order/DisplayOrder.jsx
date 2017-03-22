import React from 'react';
import {connect} from 'react-redux';

export class DisplayOrder extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {};
    }

    remove(){
        if(this.props.user){
            const orderId = this.props.order.get('id');

            this.props.updateRemote(orderId, {
                status: 'idle',
                price: ''
            });
        }
    }

    render() {
        return (
            <tr>
                <td>{this.props.order.get('price').toFixed(2)}</td>
                <td>{this.props.user && this.props.user.get('id') == this.props.order.get('userId_')
                    ? <span><a>*</a><a onClick={this.remove.bind(this)}>remove</a></span>
                    : ''}</td>
            </tr>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {};
}

export const DisplayOrderContainer = connect(
    mapStateToProps
)(DisplayOrder);