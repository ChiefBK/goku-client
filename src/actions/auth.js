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