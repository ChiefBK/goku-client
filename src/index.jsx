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
import {generateId} from '../util';
import {createItem, closePendingEvent} from './action';

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
    for(let i in event.payload){
        console.log("item");
        console.log(event.payload[i]);
        store.dispatch(createItem(event.payload[i]));
    }

    store.dispatch(closePendingEvent(event.id));

});

// socket.on('state', state =>
//     store.dispatch(setState(state))
// );
// [
//     'connect',
//     'connect_error',
//     'connect_timeout',
//     'reconnect',
//     'reconnecting',
//     'reconnect_error',
//     'reconnect_failed'
// ].forEach(ev =>
//     socket.on(ev, () => store.dispatch(setConnectionState(ev, socket.connected)))
// );

// const createStoreWithMiddleware = applyMiddleware(
//     remoteActionMiddleware(socket)
// )(createStore);
//
// const store = createStoreWithMiddleware(reducer);
// store.dispatch(setClientId(getClientId()));
//
// const routes = <Route component={App}>
//     <Route path="/" component={VotingContainer} />
//     <Route path="/results" component={ResultsContainer} />
// </Route>;
//
// ReactDOM.render(
//     <Provider store={store}>
//         <Router history={hashHistory}>{routes}</Router>
//     </Provider>,
//     document.getElementById('app')
// );

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={OrderContainer} />
            <Route path="/event/:eventId" component={EventContainer} />
            <Route path="/event/:eventId/ticket/:ticketId" component={ExchangeContainer} />
        </Router>
    </Provider>,
    document.getElementById('app')
);

// ReactDOM.render(
//     <OrderContainer/>,
//     document.getElementById('app')
// );