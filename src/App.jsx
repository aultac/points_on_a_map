import React from 'react';
import { useOvermindState, useOvermindActions } from './overmind';
import { OATSMap } from './OATSMap';
import L from 'leaflet'

export const App = () => {

  const state = useOvermindState();
  const actions = useOvermindActions();

  const buttonClicked = function() {
    actions.loadOADAData();
  }

  return <div>
    <h1>Points on a Map</h1>
    <div>
      <button id="loadpoints" onClick={buttonClicked}>Load points from {state.domain}</button>
    </div>

    <OATSMap />    

  </div>;
}
