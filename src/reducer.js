import {combineReducers} from 'redux-immutable';
import {INITIAL_LIST_STATE, INITIAL_MAP_STATE, createOrder, setOrders} from './core';

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
        case 'READ_TICKET':
        case 'UPDATE_TICKET':
        case 'DELETE_TICKET':
    }

    return ticketState;
}

function orders(orderState = INITIAL_LIST_STATE, action) {
    switch(action.type){
        case 'CREATE_ORDER':
            console.log("reducer - create order");
            return createOrder(orderState, action.user, action.price, action.orderType);
        case 'READ_ORDER':
        case 'UPDATE_ORDER':
        case 'DELETE_ORDER':
        case 'SET_ORDERS':
            return setOrders(orderState, action.orders)
    }

    return orderState;
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
        case 'CREATE_PENDING_EVENT':
            return pendingState.set(action.id, action.request);
        case 'CLOSE_PENDING_EVENT':
            return pendingState.delete(action.id);
    }

    return pendingState;
}

const reducers = combineReducers({
    user,
    events,
    tickets,
    orders,
    app,
    pending
});

export default reducers;