import Promise from 'bluebird';

function createOrder(user, price, orderType){
    console.log("Action - createOrder");
    return {
        type: 'CREATE_ORDER',
        user,
        price,
        orderType
    }
}

function sendMessageToServer(sock, event, message) {
    return new Promise(function(resolve, reject){
        console.log("Sending message to server");
        console.log(message);

        // if(!sock.connected) { reject("Socket disconnected"); }

        sock.emit(event, message, (response) => {
            // If response is null - reject
            if(!response){ reject(response); }
            // If response contains error - reject
            // console.log("Received response from server");
            // console.log(response);

            //Otherwise resolve
            resolve(response);
        });
    });
}

export function createBuyOrder(user, price) {
    console.log("middleware - createBuyOrder - " + user + " - " + price);
    return function (dispatch, getState, socket) {
        sendMessageToServer(socket, "action", createOrder(user, price, 'BUY')).then(
            (response) => {
                console.log("dispatching response");
                console.log(response);
                dispatch(response);
            }
        );

    };
}


export function createSellOrder(user, price) {
    console.log("middleware - createSellOrder - " + user + " - " + price);
    return function (dispatch, getState, socket) {
        dispatch(createOrder(user, price, 'SELL'));
    }
}