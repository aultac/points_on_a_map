
const tiles = {};
const arrays = {};

export function setTile(id, data) {
  tiles[id] = data;
  // First, turn the object into an array of keys:
  arrays[id] = Object.keys(data)
    .filter(k => !k.match(/^_/))
    // Sort the keys so they are in order according to the "order" number in the values:
    .sort(function(a,b) { // a and b are the string keys from the points object
      if (data[a].order > data[b].order) return  1;
      if (data[a].order < data[b].order) return -1;
      return 0;
    })
    // Next, take that array and call "map" on it to make a new array
    // with the same number of items (i.e. one for each key in state.points), 
    // but each item is some transformed (or "mapped") version of the original
    // key name.  In our case, we're just going to "map" a key name into a [ lat, lon ] array 
    // representing the point, which is what Leaflet wants.
    .map(k => [ +(data[k].lat) || 0, +(data[k].lon) || 0 ]) // the || 0 is to take care of the case where lat or lon is not yet defined
    .filter(item => item[0] && item[1]);
}

export function getTile(id) {
  return tiles[id];
}

export function getTileAsArray(id) {
  return arrays[id];
}

export function removeTile(id) {
  if (tiles[id]) delete tiles[id];
}
