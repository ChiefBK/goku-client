import {combineReducers} from 'redux-immutable';
import {INITIAL_LIST_STATE, INITIAL_MAP_STATE, createOrder} from './core';

function user(userState = INITIAL_MAP_STATE, action) {
    switch(action.type){

    }

    return userState;
}

function events(eventState = INITIAL_LIST_STATE, action) {
    switch(action.type){

    }

    return eventState;
}

function tickets(ticketState = INITIAL_LIST_STATE, action) {
    switch(action.type){

    }

    return ticketState;
}

function orders(orderState = INITIAL_LIST_STATE, action) {
    switch(action.type){
        case 'CREATE_ORDER':
            return createOrder(orderState, action.user, action.price, action.orderType);
        case 'READ_ORDER':
        case 'UPDATE_ORDER':
        case 'DELETE_ORDER':
    }

    return orderState;
}

const reducers = combineReducers({
    user,
    events,
    tickets,
    orders
});

export default reducers;