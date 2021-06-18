import { connect } from '@oada/client';

export function incrementCount({state}) {
  state.count = state.count+1;
}

export async function loadOADAData({state}) {
  const oada = await connect({domain: state.domain, token: state.token});
  state.points = await oada.get({path: '/bookmarks/points_on_a_map'}).then(r=>r.data);

  console.log('Setting center to ', state.pointsArray[0]);
  state.center = state.pointsArray[0];
}
