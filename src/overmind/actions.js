import { connect } from '@oada/client';
import idclient from '@oada/oada-id-client';

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
    const oada = await connect({domain: state.domain, token: state.token});
    state.points = await oada.get({path: '/bookmarks/points_on_a_map'}).then(r=>r.data);
  
    console.log('Setting center to ', state.pointsArray[0]);
    state.center = state.pointsArray[0];
  } catch (e) {
    alert(`Failed to connect to OADA at domain ${state.domain} with token ${state.token}`);
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
