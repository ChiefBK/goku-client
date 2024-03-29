import {generateId} from "../../util";
import {openPendingEvent} from "./pendingEvent";
import {Event} from "en3-common";

export function sendCreateEvent(id, userId, name, startDateTime, endDateTime, description) {
    return function (dispatch, getState, socket) {
        const eventId = generateId();
        const payload = {
            id,
            userId,
            name,
            startDateTime,
            endDateTime,
            description,
        };
        const outgoingEvent = new Event(eventId, payload);

        dispatch(openPendingEvent(eventId, outgoingEvent.toObject()));
        socket.emit('create-event', outgoingEvent.toObject());
    }
}

export function sendReadEvent(id, tier = 'full') {
    return function (dispatch, getState, socket) {
        const eventId = generateId();
        const outgoingEvent = new Event(eventId);

        outgoingEvent.id = id;
        outgoingEvent.tier = tier;

        dispatch(openPendingEvent(eventId, outgoingEvent.toObject()));
        socket.emit('read-event', outgoingEvent.toObject());
    };
}