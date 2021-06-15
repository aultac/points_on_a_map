const { connect } = require('@oada/client');
const minimist = require('minimist');
const fs = require('fs');
const ksuid = require('ksuid');

(async () => {

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

  const tree = {
    bookmarks: {
      _type: "application/vnd.oada.bookmarks.1+json",
      points_on_a_map: {
        _type: "application/vnd.test.pointsmap.1+json",
      }
    },
  };

  const filedatastr = fs.readFileSync('../sampledata/backlane44_2020_yield.csv').toString();
  const filedataarr = filedatastr.split('\n');
  const latlondata = filedataarr.map(line => {
    const cols = line.split(',');
    return {
      lat: cols[0],
      lon: cols[1]
    };
  }).slice(1).slice(0,-1);

  const body = {};
  for ( let i=0; i<latlondata.length; i++) {
    body[ksuid.randomSync().string] = {
      ...latlondata[i],
      order: i,
    };
    
  }


  console.log('Putting data to oada....');
  const path = '/bookmarks/points_on_a_map';
  if (await oada.get({path}).then(r=>r.status) === 200) {
    // path exists...
    console.log('points_on_a_map already exists, to avoid making tons of points I am deleting it first....');
    await oada.delete({path});
  }


  await oada.put({
    tree,
    path,
    data: body
  });

  
  console.log(`${latlondata.length} points were put into ${domain}/${path}`);

})();


