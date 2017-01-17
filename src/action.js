import Promise from 'bluebird';
import {fromJS} from 'immutable';

import {generateId} from '../util';

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

export function createOrder(item){
    return function (dispatch, getState, socket){
        item['id'] = generateId();
        let eventId = generateId();
        let requestEvent = {
            id: eventId,
            payload: item
        };

        dispatch(openPendingEvent(eventId, requestEvent));
        socket.emit('create', requestEvent);
    }
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