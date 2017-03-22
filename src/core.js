import {List, Map} from 'immutable';
import Promise from 'bluebird';
import {generateId, Event} from 'en3-common';

export const INITIAL_LIST_STATE = List();
export const INITIAL_MAP_STATE = Map();

export function createOrder(orderState, user, price, orderType) {
    console.log("Core - creating order - " + user + " - " + price + " - " + orderType);
    return orderState.push({
        id: generateId(),
        user: user,
        price: price,
        orderType: orderType
    });
}

export function getOrdersByUser(orderState, user, ticket) {
    console.log("Core - GetOrdersByUser");
    console.log(orderState);
    console.log(user);

    const userOrders = orderState.filter((order) => {
        return order['user'] == user && order['ticket'] == ticket;
    });

    console.log(userOrders);

    return List(userOrders);
}

export function setOrders(orderState, orders) {
    console.log("Core - setOrders");

    return orderState.merge(orders);
}

export function sortOrdersAscending(orderA, orderB) {
    return orderA.get('price') - orderB.get('price');
}

export function findEventById(id, state){
    const events = state.get('events');

    return new Promise((resolve, reject) => {
        console.log("finding event by id: " + id);
        console.log("events:");
        console.log(state.get('events').toJS());
        let event = state.get('events').find((event) => {
            console.log("looking at event with id: " + event.get('id'));
            return event.get('id') == id;
        }, this, null);
        console.log(event);
        while (event === undefined){}
        console.log(event);
        resolve(event);
    });
}

export function findVenueById(id, state){
    return new Promise((resolve, reject) => {
        console.log("finding venue by id");
        let venue = state.get('venues').find((venue) => {
            return venue.get('id') == id;
        });

        while (venue === undefined){}

        resolve(venue);
    });
}