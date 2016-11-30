
export function createOrder(user, price, orderType){
    return {
        type: 'CREATE_ORDER',
        user,
        price,
        orderType
    }
}