// require('./style.css');
import ReactDOM from 'react-dom';
import React from 'react';
import {Provider} from 'react-redux';
import {browserHistory, Router, Route} from 'react-router';
import thunk from 'redux-thunk';
import {applyMiddleware, createStore, compose} from 'redux';
import io from 'socket.io-client';
import {fromJS} from 'immutable';

import reducer from './reducer';
import {OrderContainer} from './components/Order';
import {ExchangeContainer} from './components/Exchange';
import {EventContainer} from './components/Event';
import {TicketContainer} from './components/Ticket';
import {DashboardContainer} from './components/Dashboard';
import {generateId} from '../util';
import {createItem, closePendingEvent} from './action';

require("bootstrap-webpack");

// require("materialize-loader");

const socket = io(`${location.protocol}//${location.hostname}:8888`);

console.log("socket");
console.log(socket);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
    reducer,
    fromJS({
        user: {
            id: generateId(),
            firstName: "Paul",
            lastName: "Pierce",
            email: "hotdamn@aol.com"
        }
    }),
    composeEnhancers(
        applyMiddleware(thunk.withExtraArgument(socket))
    )
);

console.log("created store");

socket.on("connect", () => {
    console.log("Connection!");
});

socket.on("payload", (event) => {
    console.log("received payload event");
    console.log(event);
    for (let i in event.payload) {
        store.dispatch(createItem(fromJS(event.payload[i])));
    }

    store.dispatch(closePendingEvent(event.id));

});

socket.on("create", (event) => {
    console.log('received create event');
    store.dispatch(createItem(fromJS(event.payload)));
    store.dispatch(closePendingEvent(event.id));
});

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={OrderContainer}/>
            <Route path="/user/:userId/dashboard" component={DashboardContainer}/>
            <Route path="/event/:eventId" component={EventContainer}/>
            <Route path="/event/:eventId/ticket/:ticketId" component={TicketContainer}/>
            <Route path="/event/:eventId/ticket/:ticketId/exchange" component={ExchangeContainer}/>
        </Router>
    </Provider>,
    document.getElementById('app')
);