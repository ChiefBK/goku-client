import Promise from 'bluebird';
import {fromJS} from 'immutable';

import {generateId} from '../util';

function createOrder(price, orderType, user, ticket) {
    console.log("Action - createOrder");
    return {
        type: 'CREATE_ORDER',
        payload: [
            {
                user,
                price,
                orderType,
                ticket
            }
        ]
    }
}

function readOrders(query) {
    return {
        type: 'READ_ORDER',
        query
    }
}

function updateOrder(update) {
    return {
        type: 'UPDATE_ORDER',
        payload: [update]
    }
}

function deleteOrder(id) {
    return {
        type: 'DELETE_ORDER',
        payload: [id]
    }
}

function contactingRemote() {
    console.log("Action - contactingRemote");
    return {
        type: 'CONTACT_REMOTE'
    }
}

function stopContactingRemote() {
    return {
        type: 'STOP_CONTACT_REMOTE'
    }
}

function setOrdersOfTicket(orders) {
    return {
        type: 'SET_ORDERS',
        orders
    }
}

function createdAction(action) {
    return {
        type: 'CREATED_ACTION',
        action
    }
}

function sendingAction(action) {
    return {
        type: 'SENDING_ACTION',
        action
    }
}

function sentAction(action) {
    return {
        type: 'SENT_ACTION',
        action
    }
}

function receivedResponse(action) {
    return {
        type: 'RECEIVED_RESPONSE',
        action
    }
}

function successfulAction(action) {
    return {
        type: 'SUCCESSFUL_ACTION',
        action
    }
}

function failedToSendAction(action) {
    return {
        type: 'FAILED_TO_SEND_ACTION',
        action
    }
}

function invalidAction(action) {
    return {
        type: 'INVALID_ACTION',
        action
    }
}

function errorProcessingAction(action) {
    return {
        type: 'ERROR_PROCESSING_ACTION',
        action
    }
}

function failedAction(action) {
    return {
        type: 'FAILED_ACTION',
        action
    }
}

function createPendingEvent(id, request) {
    return {
        type: 'CREATE_PENDING_EVENT',
        id,
        request
    }
}

export function closePendingEvent(id) {
    return {
        type: 'CLOSE_PENDING_EVENT',
        id
    }
}

export function createItem(item){
    return {
        type: 'CREATE_' + item.model.toUpperCase(),
        item
    }
}


function sendMessageToServer(sock, event, message) {
    return new Promise(function (resolve, reject) {
        console.log("Sending message to server");
        console.log(message);

        // if(!sock.connected) { reject("Socket disconnected"); }

        sock.emit(event, message, (response) => {
            // If response is null - reject
            if (!response) {
                reject("response was null");
            }

            if (response.error) {
                reject(response.error);
            }
            // If response contains error - reject
            // console.log("Received response from server");
            // console.log(response);

            //Otherwise resolve
            console.log("received response");
            console.log(response);
            resolve(response);
        });
    });
}

export function fetchEvent(id){
    return function (dispatch, getState, socket){
        let eventId = generateId();
        let request = {
            query: {
                model: 'event',
                properties: {
                    id: id
                }
            }
        };

        dispatch(createPendingEvent(eventId, request));
        socket.emit('read', request);
    }
}

export function createBuyOrder(user, price) {
    console.log("middleware - createBuyOrder - " + user + " - " + price);
    return function (dispatch, getState, socket) {

        sendMessageToServer(socket, "action", createOrder(user, price, 'BUY')).then(
            (response) => {
                dispatch(response);
            }
        );

    };
}

export function createSellOrder(user, price) {
    console.log("middleware - createSellOrder - " + user + " - " + price);
    return function (dispatch, getState, socket) {
        dispatch(createOrder(user, price, 'SELL'));
    }
}

export function createOrder(price, orderType, user, ticket) {

    return function (dispatch, getState, socket) {
        const action = createOrder(price, orderType, user, ticket);

        dispatch(sendingAction(action));

        sendMessageToServer(socket, 'action', action)
            .then((response) => {
                const todoAction = response.action;

                dispatch(receivedResponse(action));
                dispatch(todoAction);
            })
            .catch((error) => {
                //TODO - check if invalid action or if error in processing

            });
    };
}

export function readOrdersOfTicket(ticket) {
    console.log("middleware - readOrdersOfTicket - " + ticket);
    return function (dispatch, getState, socket) {
        dispatch(contactingRemote());

        sendMessageToServer(socket, 'read', {
            ticket: ticket
        }).then(
            (response) => {
                dispatch(setOrdersOfTicket(fromJS(response)));
                dispatch(stopContactingRemote());
            }
        );
    };
}