import Promise from 'bluebird';
import {fromJS} from 'immutable';

import {generateId} from '../util';

function openPendingEvent(id, event) {
    return {
        type: 'OPEN_PENDING_EVENT',
        id,
        event
    }
}

export function closePendingEvent(id) {
    return {
        type: 'CLOSE_PENDING_EVENT',
        id
    }
}

export function createItem(item) {
    return {
        type: 'CREATE_ITEM',
        item
    }
}

export function createRemote(item){
    return function (dispatch, getState, socket){
        const eventId = generateId();

        const event = {
            id: eventId,
            payload: item
        };

        dispatch(openPendingEvent(eventId, event));
        socket.emit('create', event);

    }
}

export function syncItem(id) {
    return function (dispatch, getState, socket) {
        let eventId = generateId();
        let event;

        if (getState().hasIn(['items', id])){
            console.log("State already has item - checking hash");
            //Check if hash of item on client matches hash on server
            event = {
                id: eventId,
                query: {
                    properties:{
                        id,
                        hash: getState().getIn(['items', id, 'hash'])
                    }
                }
            }
        }
        else {
            console.log("State doesn't have item - sending read event to server");
            event = {
                id: eventId,
                query: {
                    properties: {
                        id
                    }
                }
            };
        }

        dispatch(openPendingEvent(eventId, event));

        // Sends a read event to server asking for item with given id
        socket.emit('read', event);


    }
}

export function fetchTicket(id) {
    return function (dispatch, getState, socket) {
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