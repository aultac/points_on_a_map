import React from 'react';
import { useOvermindState, useOvermindActions } from './overmind';
import { OATSMap } from './OATSMap';
import L from 'leaflet'

export const App = () => {

  const state = useOvermindState();
  const actions = useOvermindActions();

  const buttonClicked = function() {
    actions.incrementCount();
    actions.loadOADAData();
    console.log('The button was clicked ', state.count, ' times');
  }

  return <div>
    <h1>Hello, I am the app</h1>
    <div>
      The count is {state.count} <br/>
      <button id="thebutton" onClick={buttonClicked}>I am the button</button>
    </div>

    <OATSMap />    

  </div>;
}
