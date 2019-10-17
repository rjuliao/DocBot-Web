import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import store from './redux/store';

/**
 * Toda la aplicación de encuentra conectada a react-redux
 */

ReactDOM.render(
<Provider store = {store}>
    <App/>
</Provider>, document.getElementById('root'));


serviceWorker.unregister();
