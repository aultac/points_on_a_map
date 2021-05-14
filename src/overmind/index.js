import * as React from 'react';
import { state } from './state';
import * as actions from './actions';
import { createStateHook, createActionsHook } from 'overmind-react';

export const useOvermindState = createStateHook();
export const useOvermindActions = createActionsHook();

export const config = {
  state,
  actions,
};


