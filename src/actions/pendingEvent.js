export function openPendingEvent(eventId, event) {
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