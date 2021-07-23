import React from 'react';
import { useOvermindState, useOvermindActions } from './overmind';
import { OATSMap } from './OATSMap';
import L from 'leaflet'

import './App.css';

export const App = () => {

  const state = useOvermindState();
  const actions = useOvermindActions();

  const buttonClicked = function() {
    actions.loadOADAData();
  }

  const loginClicked = function() {
    console.log('doing login...');
    actions.doLogin();
  }

  const logoutClicked = function() {
    actions.doLogout();
  }

  return <div className="app">

    <div className="navbar">
      <div style={{ flexGrow: 0 }}></div>
      <div style={{ flexGrow: 1 }}></div>
      <div style={{ flexGrow: 0, margin: '10px' }}>
        { state.token
          ? <a className="login" onClick={logoutClicked}>Logout</a>
          : <a className="login" onClick={loginClicked}>Login</a>
        }

      </div>
    
    </div>
    
    <div>
      <button id="loadpoints" onClick={buttonClicked}>Load points from {state.domain}</button>
    </div>

    <OATSMap />    

  </div>;
}
