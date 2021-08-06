import { connect } from '@oada/client';
import idclient from '@oada/oada-id-client';
import Promise from 'bluebird';
import _ from 'lodash';
import { setTile, getTile } from '../lib/geohash-store';

import metadata from '../login/signed_software_statement';

export function onInitializeOvermind({state}) {
  console.log('Initializing...');
  state.token = localStorage["oada:token"];
  const center = localStorage["map:center"];
  if (center && center.length === 2) {
    state.center = center;
  }
  const zoom = localStorage["map:zoom"];
  if (zoom && zoom > 0) {
    state.zoom = zoom;
  }
}

export async function setCenter({state}, center) {
  state.center = center;
  localStorage['map:center'] = center;
}
export async function setZoom({state}, zoom) {
  state.zoom = zoom;
  localStorage['map:zoom'] = zoom;
}



export async function loadOADAData({state, actions}) {
  try {
    state.geohashtiles = {};

    const oada = await connect({domain: state.domain, token: state.token});

    // Pull the geohash index:
    const geohashes = await oada
      .get({path: '/bookmarks/points_on_a_map/geohash-index'})
      .then(r=>r.data)
      .then(g => Object.keys(g));

    // Get each of the geohash buckets:
    let mapcentered = false;
    await Promise.map(geohashes, async geohash => {
      const newpoints = await oada.get({ path: `/bookmarks/points_on_a_map/geohash-index/${geohash}` }).then(r=>r.data);
      setTile(newpoints._id, newpoints);
      state.geohashtiles[geohash] = {
        _id: newpoints._id,
        _rev: newpoints._rev,
      };
      if (!mapcentered) {
        const keys = Object.keys(newpoints).filter(k => !k.match(/^_/));
        const lat = +(newpoints[keys[0]].lat);
        const lon = +(newpoints[keys[0]].lon);
        if (lat && lon) {
          actions.setCenter([ lat, lon ]);
          mapcentered = true;
        }
      }
    }, { concurrency: 5 });

  } catch (e) {
    alert(`Failed to connect to OADA at domain ${state.domain} with token ${state.token}.  Error was: ${e.toString()}`);
  }
}

export async function doLogout({state}) {
  state.token = false;
  localStorage["oada:token"] = false;
}

export async function doLogin({state}) {
  const options = {
    metadata,
    scope: 'all:all',
  };

  await new Promise((resolve, reject) => {
    try { 
      idclient.getAccessToken(state.domain, options, (err, token) => {
        if (err) reject(err);
        state.token = token.access_token;
        // Write token to localstorage:
        localStorage["oada:token"] = state.token;
        resolve();
      });
    } catch(e) {
      reject(e);
    }
  });
  
}
