import React from 'react';
import ReactDOM from 'react-dom';
import { createOvermind } from 'overmind';
import { Provider } from 'overmind-react';

import { config } from './overmind';
import { App } from './App.jsx';

const overmind = createOvermind(config); /*, {
  devtools: 'localhost:3031'
});*/


ReactDOM.render(
  <Provider value={overmind}>
    <App />
  </Provider>,
  document.getElementById('root')
);


