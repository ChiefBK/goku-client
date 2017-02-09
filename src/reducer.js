import {combineReducers} from 'redux-immutable';
import {INITIAL_LIST_STATE, INITIAL_MAP_STATE, setOrders} from './core';
import {Map, fromJS} from 'immutable';

function app(appState = INITIAL_MAP_STATE, action) {
    switch (action.type) {
        case 'SIGN_IN_USER':
            return appState.set("user", fromJS(action.user));
        case 'SIGN_OUT_USER':
            return appState.set("user", Map());
    }

    return appState;
}

function pending(pendingState = INITIAL_MAP_STATE, action) {
    switch (action.type) {
        case 'OPEN_PENDING_EVENT':
            console.log("Opening event with id: " + action.id);
            return pendingState.setIn([action.id, 'event'], fromJS(action.event));
        case 'CLOSE_PENDING_EVENT':
            console.log("Closing event with id: " + action.id);
            return pendingState.delete(action.id);
    }

    return pendingState;
}

function items(itemState = INITIAL_MAP_STATE, action) {
    switch (action.type) {
        case 'CREATE_ITEM':
            console.log("Setting item in reducer");
            return itemState.set(action.item.id, fromJS(action.item));
        case 'UPDATE_ITEM':
        case 'DELETE_ITEM':
    }

    return itemState;
}

function groups(groupState = INITIAL_MAP_STATE, action) {
    switch (action.type) {
        case 'CREATE_GROUP':
            return groupState.set(action.group.id, fromJS(action.group));
        case 'UPDATE_GROUP':
        case 'DELETE_GROUP':
    }

    return groupState;
}

const reducers = combineReducers({
    items,
    groups,
    app,
    pending
});

export default reducers;