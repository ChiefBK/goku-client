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

function openPendingEvent(id, request) {
    return {
        type: 'OPEN_PENDING_EVENT',
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
        type: 'CREATE_' + item.get('model').toUpperCase(),
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
        let requestEvent = {
            id: eventId,
            query: {
                model: 'event',
                properties: {
                    id: id
                }
            }
        };

        dispatch(openPendingEvent(eventId, requestEvent));
        socket.emit('read', requestEvent);
    }
}

export function fetchTicket(id){
    return function(dispatch, getState, socket){
        let eventId = generateId();
        let requestEvent = {
            id: eventId,
            query: {
                model: 'ticket',
                properties: {
                    id: id
                }
            }
        };

        dispatch(openPendingEvent(eventId, requestEvent));
        socket.emit('read', requestEvent);
    }
}

export function fetchOrdersOfTicket(id) {
    return function (dispatch, getState, socket) {
        //TODO - send query to get all orders with same ID as ticket

        let eventId = generateId();
        let requestEvent = {
            id: eventId,
            query: {
                model: 'order',
                properties: {
                    ticketID: id
                },
                levels: 1
            }
        };

        dispatch(openPendingEvent(eventId, requestEvent));
        socket.emit('read', requestEvent);
    };
}