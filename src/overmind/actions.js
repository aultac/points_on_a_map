import { connect } from '@oada/client';
import idclient from '@oada/oada-id-client';
import Promise from 'bluebird';
import _ from 'lodash';

import metadata from '../login/signed_software_statement';

export function onInitializeOvermind({state}) {
  console.log('Initializing...');
  state.token = localStorage["oada:token"];
}

export function incrementCount({state}) {
  state.count = state.count+1;
}

export async function loadOADAData({state}) {
  try {
    state.points = {};

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
      const keys = Object.keys(newpoints);
      for( let i=0; i<keys.length; i++) {
        const key = keys[i];
        if (!mapcentered) {
          const lat = +(newpoints[key].lat);
          const lon = +(newpoints[key].lon);
          if (lat && lon) {
            state.center = [ lat, lon ];
            mapcentered = true;
          }
        }
        state.points[key] = newpoints[key]
      }
    }, { concurrency: 5 });

  
    //console.log('Setting center to ', state.pointsArray[0]);
    //state.center = state.pointsArray[0];
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
