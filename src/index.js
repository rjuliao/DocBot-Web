import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './redux/store';

/**
 * Toda la aplicación de encuentra conectada a react-redux
 */

ReactDOM.render(
<Provider store = {store}>
    <PersistGate loading={null} persistor={persistor}>
        <App/>
    </PersistGate>
</Provider>, document.getElementById('root'));


serviceWorker.unregister();
