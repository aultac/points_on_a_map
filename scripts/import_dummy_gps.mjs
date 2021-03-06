import { connect } from '@oada/client';
import minimist from 'minimist';
import fs from 'fs';
import ksuid from 'ksuid';
import GeohashLib from 'latlon-geohash';
import Promise from 'bluebird';

(async () => {

  try {
    const argv = minimist(process.argv.slice(2));
  
    const domain = "oats1.ecn.purdue.edu";
    let token = false;
    if (argv.t) token = argv.t;
    if (argv.token) token = argv.token;
  
    if (!token) {
      console.log('ERROR: You have to pass a token for this to work (-t token)');
      process.exit(1);
    }
  
  
    const oada = await connect({ domain, token });
  
    // If path already exists, abort mission
    const exists = await oada.head({path: '/bookmarks/points_on_a_map' }).then(() => true).catch(e => false);
    if (exists) {
      console.log('The /bookmarks/points_on_a_map path already exists at the domain, aborting');
      process.exit(0);
    }
  
    console.log('Creating /bookmarks/points_on_a_map');
  
    const tree = {
      bookmarks: {
        _type: "application/vnd.oada.bookmarks.1+json",
        points_on_a_map: {
          _type: "application/vnd.test.pointsmap.1+json",
          'geohash-index': {
            '*': {
              _type: "application/vnd.test.pointsmap.1+json",
              _rev: 0,
            }
          }
        }
      },
    };
  
    const filedatastr = fs.readFileSync('../sampledata/backlane44_2020_yield.csv').toString();
    const filedataarr = filedatastr.split('\n');
    const latlondata = filedataarr.map(line => {
      const cols = line.split(',');
      return {
        lon: cols[0],
        lat: cols[1]
      };
    }).slice(1).slice(0,-1)
    // Kepp only the last 100 points0
    //.slice(0,1000);
  
    const bodies = {};
    for ( let i=0; i<latlondata.length; i++) {
      const point = latlondata[i];
      // Compute geohash
      const geohash = GeohashLib.encode(point.lat, point.lon, 7);
      if (!bodies[geohash]) {
        bodies[geohash] = {};
      }
      bodies[geohash][ksuid.randomSync().string] = {
        ...latlondata[i],
        order: i,
      };
    }

    console.log('Putting data to oada....');
    await Promise.map(Object.keys(bodies), async (geohash) => {
      const body = bodies[geohash];
      console.log(`    Putting ${Object.keys(body).length} points to geohash ${geohash}`);
      const path = `/bookmarks/points_on_a_map/geohash-index/${geohash}`;
      await oada.put({
        tree,
        path,
        data: body
      });
    }, { concurrency: 5 });
    
    console.log(`${latlondata.length} points were put into ${Object.keys(bodies).length} geohash buckets at ${domain}/${path}`);

    await oada.disconnect();

  } catch (e) {
    console.log('ERROR: unhandled exception: ', e);
  }
})();


