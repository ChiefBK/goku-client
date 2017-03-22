import React from 'react';
import {connect} from 'react-redux';

export class CreateTicket extends React.PureComponent {

    constructor(props) {
        super(props);

        this.handleNext = this.handleNext.bind(this);
        this.handleTicketTypes = this.handleTicketTypes.bind(this);

        this.state = {
            page: 1,
            types: []
        };
    }

    handleNext(e){
        this.setState({page: this.state.page + 1})
    }

    handleTicketTypes(key, val){
        const types = this.props.handleCommaSeparatedInputChange(key,val);
        this.setState({types});
    }

    render() {
        const first = (
            <div>
                <div className="form-group">
                    <label htmlFor="ticket-type">Ticket Type(s)</label>
                    <input type="text" id="ticket-type" onChange={(e) => this.handleTicketTypes('ticketTypes', e.target.value)}/>
                </div>
                <button onClick={this.handleNext}>Next</button>
            </div>
        );

        const second = (
            <div className="row">
                {
                    this.state.types.map((ticketType) =>
                            <div className="col-sm-3">
                                <h5>{ticketType}</h5>
                                <div className="form-group">
                                    <label htmlFor="ticket-quantity">Ticket Quantity</label>
                                    <input type="text" id="ticket-quantity" onChange={(e) => this.props.handleInputChange('ticketDetails.'+ ticketType + '.quantity', e.target.value)}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="ticket-price">Ticket Price</label>
                                    <input type="text" id="ticket-price" onChange={(e) => this.props.handleInputChange('ticketDetails.'+ ticketType + '.price', e.target.value)}/>
                                </div>
                            </div>
                    )
                }

            </div>
        );

        const content = this.state['page'] == 1 ? first : second;

        return (
            <div>
                <h3>Tickets</h3>
                {content}
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {};
}

export const CreateTicketContainer = connect(
    mapStateToProps
)(CreateTicket);