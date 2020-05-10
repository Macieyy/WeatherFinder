import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Store from "./store";

ReactDOM.render(<Store><App /></Store>, document.getElementById('root'));
serviceWorker.unregister();
