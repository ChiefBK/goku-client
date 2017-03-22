import {generateId} from "../../util";
import {openPendingEvent} from "./pendingEvent";
import {Event} from "en3-common";

export function sendCreateUser(id, firstName, lastName, email, passwordHash, classification) {
    return function (dispatch, getState, socket) {
        const eventId = generateId();
        const payload = {
            id: id,
            firstName,
            lastName,
            email,
            passwordHash,
            classification
        };
        const outgoingEvent = new Event(eventId, payload);

        dispatch(openPendingEvent(eventId, outgoingEvent.toObject()));
        socket.emit('create-user', outgoingEvent.toObject());
    }
}

export function sendReadUser(id) {
    return function (dispatch, getState, socket) {
        const eventId = generateId();
        const outgoingEvent = new Event(eventId);

        outgoingEvent.id = id;

        dispatch(openPendingEvent(eventId, outgoingEvent.toObject()));
        socket.emit('read-user', outgoingEvent.toObject());
    }
}