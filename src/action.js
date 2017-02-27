import {generateId} from "../util";

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

export function updateItem(id, properties){
    return {
        type: 'UPDATE_ITEM',
        id,
        properties
    }
}

export function signInUser(user) {
    return {
        type: 'SIGN_IN_USER',
        user
    }
}

export function signOutUser() {
    return {
        type: 'SIGN_OUT_USER'
    }
}

export function createRemote(items) {
    return function (dispatch, getState, socket) {
        if (!Array.isArray(items)) {
            items = [items];
        }

        const eventId = generateId();

        const event = {
            eventId,
            payload: items
        };

        dispatch(openPendingEvent(eventId, event));
        socket.emit('create', event);
    }
}

/**
 *
 * @param id - (int) the ID of the item to be updated
 * @param properties - (object) an object containing the keys of the properties to change and the values to change them to
 * @returns {Function}
 */
export function updateRemote(id, properties) {
    return function (dispatch, getState, socket) {
        const eventId = generateId();

        const event = {
            eventId,
            payload: {
                id,
                properties
            }
        };

        dispatch(openPendingEvent(eventId, event));
        socket.emit('update', event);
    }
}

export function readItem(id, levels = -1) {
    return function (dispatch, getState, socket) {
        const eventId = generateId();
        const hash = getState().getIn(['items', id, 'hash']);

        const event = {
            eventId,
            id,
            hash,
            levels
        };

        dispatch(openPendingEvent(eventId, event));
        socket.emit('read', event);
    }
}

export function readOrdersOfTicket(ticketId) {
    return function (dispatch, getState, socket) {
        let eventId = generateId();

        let event = {
            eventId,
            query: {
                properties: {
                    model: 'order',
                    ticketId_: ticketId
                }
            },
            levels: 0
        };

        dispatch(openPendingEvent(eventId, event));
        socket.emit('query', event);
    }
}

export function activateOrder(orderId){
    updateRemote(orderId, {status: 'active'});
}

export function authorizeUser(email, passwordHash) {
    return function (dispatch, getState, socket) {
        const eventId = generateId();

        const event = {
            eventId,
            email,
            passwordHash
        };

        dispatch(openPendingEvent(eventId, event));
        socket.emit('auth', event);
    }
}