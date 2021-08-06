// We need to import the "derived" function from overmind
// so we can maintain a copy of our points as an array
import { derived } from 'overmind'

export const state = {
  count: 0,

  domain: 'oats1.ecn.purdue.edu',
  token: 'insert token here',

  center: [41.528772, -96.303004], // Nebraska
  zoom: 7,

  geohashtiles: {
    /*
     * 'dhpkgy': {
     *   _id: "resources/902jekf20fedw",
     *   _rev: 4
     * }
     */
  },

  // Here, pointsArray part of the state is a "derived" function:
  // i.e. it tracks some other part of the state transforms it, and
  // returns that.  If you use pointsArray in any React component,
  // it will redraw that component automatically whenever the source
  // points are changed in any way.  Overmind passes the current global
  // "state" into your function whenever it detects that the output of your
  // function might need to be recomputed (i.e. when the parts of the state that
  // it depends on are changed).
  /*
  pointsArray: derived( function(state) {

    if (!state.points) return []; // no points!

    // First, turn the object into an array of keys:
    return Object.keys(state.points)

    // Sort the keys so they are in order according to the "order" number in the values:
    .sort(function(a,b) { // a and b are the string keys from the points object
      if (state.points[a].order > state.points[b].order) return  1;
      if (state.points[a].order < state.points[b].order) return -1;
      return 0;
    })

    // Next, take that array and call "map" on it to make a new array
    // with the same number of items (i.e. one for each key in state.points), 
    // but each item is some transformed (or "mapped") version of the original
    // key name.  In our case, we're just going to "map" a key name into a [ lat, lon ] array 
    // representing the point, which is what Leaflet wants.
    .map(k => [ +(state.points[k].lat) || 0, +(state.points[k].lon) || 0 ]) // the || 0 is to take care of the case where lat or lon is not yet defined

    .filter(item => item[0] && item[1]);
  }),
    */

};
