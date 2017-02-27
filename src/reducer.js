import {combineReducers} from "redux-immutable";
import {INITIAL_MAP_STATE} from "./core";
import {fromJS} from "immutable";
import {Item} from "en3-common";

function app(appState = INITIAL_MAP_STATE, action) {
    switch (action.type) {
        case 'SIGN_IN_USER':
            return appState.set("user", fromJS(action.user));
        case 'SIGN_OUT_USER':
            return appState.delete("user");
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
            return itemState.set(action.item.id, new Item(action.item));
        case 'UPDATE_ITEM':
            const originalItem = itemState.get(action.id);
            return itemState.set(action.id, originalItem.updateItem(action.properties));
        case 'DELETE_ITEM':
    }

    return itemState;
}

const reducers = combineReducers({
    items,
    app,
    pending
});

export default reducers;