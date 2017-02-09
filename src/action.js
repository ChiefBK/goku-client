import Promise from 'bluebird';
import {fromJS} from 'immutable';

import {generateId} from '../util';

function openPendingEvent(eventId, event) {
    return {
        type: 'OPEN_PENDING_EVENT',
        id: eventId,
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

export function createGroup(group){
    return {
        type: 'CREATE_GROUP',
        group
    }
}

export function signInUser(user){
    return {
        type: 'SIGN_IN_USER',
        user
    }
}

export function signOutUser(){
    return {
        type: 'SIGN_OUT_USER'
    }
}

export function createRemote(items, urlParams){
    return function (dispatch, getState, socket){
        if(!Array.isArray(items)){
            items = [items];
        }

        const eventId = generateId();

        const event = {
            eventId,
            payload: items,
            urlParams
        };

        dispatch(openPendingEvent(eventId, event));
        socket.emit('create', event);
    }
}

export function syncItem(id, urlParams) {
    return function (dispatch, getState, socket) {
        const eventId = generateId();
        const hash = getState().getIn(['items', id, 'hash']);

        const event = {
            eventId,
            id,
            hash: hash ? hash : ''
        };

        dispatch(openPendingEvent(eventId, event));

        // Sends a read event to server asking for item with given id
        socket.emit('read', event);
    }
}

export function syncGroupAndItems(ownerId){
    return function (dispatch, getState, socket) {
        let eventId = generateId();
        const hash = getState().getIn(['groups', ownerId, 'hash']);

        let event = {
            eventId,
            groupID: ownerId,
            hash: hash ? hash : ''
        };

        dispatch(openPendingEvent(eventId, event));

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