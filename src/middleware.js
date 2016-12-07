import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import Promise from 'bluebird';

import reducer from './reducer';
import {createOrder} from './action';

// applyMiddleware supercharges createStore with middleware:
// let store = createStore(reducer, applyMiddleware(thunk));

function sendMessageToServer(sock, event, message) {
    return new Promise(function(resolve, reject){
        console.log(sock.connected);
        console.log(sock);

        // if(!sock.connected) { reject("Socket disconnected"); }

        sock.emit(event, message, (response) => {
            // If response is null - reject
            if(!response){ reject(response); }
            // If response contains error - reject


            //Otherwise resolve
            resolve(response);
        });
    });
}


export function createBuyOrder(user, price) {
    console.log("middleware - createBuyOrder - " + user + " - " + price);
    return function (dispatch, getState) {
        console.log("State");
        console.log(getState());
        dispatch(createOrder(user, price, 'BUY'));
    };
}

export function createSellOrder(user, price) {
    console.log("middleware - createSellOrder - " + user + " - " + price);
    return function (dispatch, getState) {
        dispatch(createOrder(user, price, 'SELL'));
    }
}