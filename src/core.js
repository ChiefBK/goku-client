import {List, Map} from 'immutable';

import {generateId} from '../util';

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

export function getOrdersByUser(orderState, user) {
    console.log("Core - GetOrdersByUser");
    console.log(orderState);
    console.log(user);

    const userOrders = orderState.toJS().filter((order) => {
        return order['user'] == user;
    });

    console.log(userOrders);

    return List(userOrders);
}