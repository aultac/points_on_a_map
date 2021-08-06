import { useOvermindState } from './overmind';
import { useMap } from 'react-leaflet'

const arrayEquals = (a1, a2) => {
  if (!a1 || !a2) return false;
  if (a1.length !== a2.length) return false;

  return a1.reduce((acc, val1, index1) => {
    return acc && (val1 === a2[index1]);
  }, true);
};

export const MapCenterer = () => {

  const state = useOvermindState();
  const map = useMap();
  
  if (!map) return;

  const curcenter = map.getCenter();
  const nextcenter = state.center;

  const curzoom = map.getZoom();
  const nextzoom = state.zoom;

  if (arrayEquals(curcenter, nextcenter) && curzoom === nextzoom) return;

  map.setView(state.center, state.zoom);

  return null;
};
