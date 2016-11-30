// require('./style.css');

const socket = io(`${location.protocol}//${location.hostname}:8090`);

// socket.on('state', state =>
//     store.dispatch(setState(state))
// );
// [
//     'connect',
//     'connect_error',
//     'connect_timeout',
//     'reconnect',
//     'reconnecting',
//     'reconnect_error',
//     'reconnect_failed'
// ].forEach(ev =>
//     socket.on(ev, () => store.dispatch(setConnectionState(ev, socket.connected)))
// );

const createStoreWithMiddleware = applyMiddleware(
    remoteActionMiddleware(socket)
)(createStore);

const store = createStoreWithMiddleware(reducer);
store.dispatch(setClientId(getClientId()));

const routes = <Route component={App}>
    <Route path="/" component={VotingContainer} />
    <Route path="/results" component={ResultsContainer} />
</Route>;

ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory}>{routes}</Router>
    </Provider>,
    document.getElementById('app')
);