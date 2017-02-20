// require('./style.css');
import ReactDOM from 'react-dom';
import React from 'react';
import {Provider} from 'react-redux';
import {browserHistory, Router, Route, IndexRedirect} from 'react-router';
import thunk from 'redux-thunk';
import {applyMiddleware, createStore, compose} from 'redux';
import io from 'socket.io-client';
import {Map, fromJS} from 'immutable';

import reducer from './reducer';
import {WrapperContainer} from './components/Wrapper';
import {WelcomeContainer} from './components/Welcome';
import {DisplayExchangeContainer} from './components/exchange/DisplayExchange';
import {DisplayEventContainer} from './components/event/DisplayEvent';
import {DisplayUserContainer} from './components/user/DisplayUser';
import {BuyTicketContainer} from './components/ticket/BuyTicket';
import {CreateEventTopContainer} from './components/event/CreateEventTop';
import {ManageEventsContainer} from './components/event/ManageEvents';
import {DisplayDashboardContainer} from './components/dashboard/DisplayDashboard';
import {generateId} from '../util';
import {createItem, createGroup, closePendingEvent, signInUser} from './action';

require("bootstrap-webpack");

// require("materialize-loader");

const socket = io(`${location.protocol}//${location.hostname}:8888`);

console.log("socket");
console.log(socket);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
    reducer,
    Map(),
    composeEnhancers(
        applyMiddleware(thunk.withExtraArgument(socket))
    )
);

console.log("created store");

// store.dispatch(signInUser({
//     id: generateId(),
//     model: 'user',
//     firstName: 'Ian',
//     lastName: 'Kingston',
//     email: 'iamking@gmail.com',
//     passwordHash: generateId()
// }));

socket.on("connect", () => {
    console.log("Connection!");
});

socket.on("create", (event) => {
    console.log("received create event");
    console.log(event);
    for (let i in event.payload) {
        if (event.payload[i]['model'] == 'group') {
            store.dispatch(createGroup(event.payload[i]));
        }
        else {
            store.dispatch(createItem(event.payload[i]));
        }
    }

    store.dispatch(closePendingEvent(event.eventId));
});

socket.on("auth", (event) => {
    console.log("received auth event");
    console.log(event);

    const payload = event.payload;
    for (let i in payload) {
        if (payload[i].model === 'user') {
            store.dispatch(signInUser(payload[i]));
        }
    }

    store.dispatch(closePendingEvent(event.eventId));
});

// socket.on("create", (event) => {
//     console.log('received create event');
//     store.dispatch(createItem(fromJS(event.payload)));
//     store.dispatch(closePendingEvent(event.id));
// });

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={WrapperContainer}>
                <IndexRedirect to="/welcome"/>
                <Route path="welcome" component={WelcomeContainer}/>
                <Route path="user/:userId" component={DisplayUserContainer}/>
                <Route path="user/:userId/dashboard" component={DisplayDashboardContainer}/>
                <Route path="user/:userId/dashboard/createEvent" component={CreateEventTopContainer}/>
                <Route path="user/:userId/dashboard/manageEvents" component={ManageEventsContainer}/>
                <Route path="event/:eventId" component={DisplayEventContainer}/>
                <Route path="event/:eventId/ticket/:ticketId/buy" component={BuyTicketContainer}/>
                <Route path="event/:eventId/ticket/:ticketId/exchange" component={DisplayExchangeContainer}/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('app')
);