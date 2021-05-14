import React from 'react';
import { useOvermindState, useOvermindActions } from './overmind';

export const App = () => {

  const state = useOvermindState();
  const actions = useOvermindActions();

  const buttonClicked = function() {
    actions.incrementCount();
    console.log('The button was clicked ', state.count, ' times');
  }

  return <div>
    <h1>Hello, I am the app</h1>
    <div>
      The count is {state.count} <br/>
      <button id="thebutton" onClick={buttonClicked}>I am the button</button>
    </div>
  </div>;
}
