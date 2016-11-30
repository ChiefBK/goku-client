import {List, Map} from 'immutable';

import {generateId} from '../util';

export const INITIAL_LIST_STATE = List();
export const INITIAL_MAP_STATE = Map();

export function createOrder(orderState, user, price, orderType){
    return orderState.push({
        id: generateId(),
        user: user,
        price: price,
        orderType: orderType
    });
}