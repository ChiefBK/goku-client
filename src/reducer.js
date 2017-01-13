import {combineReducers} from 'redux-immutable';
import {INITIAL_LIST_STATE, INITIAL_MAP_STATE, setOrders} from './core';
import {fromJS} from 'immutable';

function user(userState = INITIAL_MAP_STATE, action) {
    switch(action.type){
        case 'CREATE_USER':
        case 'READ_USER':
        case 'UPDATE_USER':
        case 'DELETE_USER':
    }

    return userState;
}

function events(eventState = INITIAL_LIST_STATE, action) {
    switch(action.type){
        case 'CREATE_EVENT':
            return eventState.push(action.item);
        case 'READ_EVENT':
        case 'UPDATE_EVENT':
        case 'DELETE_EVENT':
    }

    return eventState;
}

function tickets(ticketState = INITIAL_LIST_STATE, action) {
    switch(action.type){
        case 'CREATE_TICKET':
            return ticketState.push(action.item);
        case 'READ_TICKET':
        case 'UPDATE_TICKET':
        case 'DELETE_TICKET':
    }

    return ticketState;
}

function orders(orderState = INITIAL_LIST_STATE, action) {
    switch(action.type){
        case 'CREATE_ORDER':
            return orderState.push(action.item);
        case 'READ_ORDER':
        case 'UPDATE_ORDER':
        case 'DELETE_ORDER':
        case 'SET_ORDERS':
            return setOrders(orderState, action.orders)
    }

    return orderState;
}

function venues(venueState = INITIAL_LIST_STATE, action) {
    switch (action.type){
        case 'CREATE_VENUE':
            return venueState.push(action.item);
    }

    return venueState;
}

function app(appState = INITIAL_MAP_STATE, action) {
    switch (action.type) {
        case 'CONTACT_REMOTE':
            return appState.set("contacting_remote", true);
        case 'STOP_CONTACT_REMOTE':
            return appState.set("contacting_remote", false);
    }

    return appState;
}

function pending(pendingState = INITIAL_MAP_STATE, action) {
    switch (action.type){
        case 'OPEN_PENDING_EVENT':
            console.log("Opening event with id: " + action.id);
            return pendingState.set(action.id, action.request);
        case 'CLOSE_PENDING_EVENT':
            console.log("Closing event with id: " + action.id);
            return pendingState.delete(action.id);
    }

    return pendingState;
}

const reducers = combineReducers({
    user,
    events,
    tickets,
    orders,
    venues,
    app,
    pending
});

export default reducers;