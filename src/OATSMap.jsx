import { useOvermindState } from './overmind';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet'
import { getTileAsArray } from './lib/geohash-store'

import { MapCenterer } from './MapCenterer'

export const OATSMap = () => {

  const state = useOvermindState();

  const polyline = state.pointsArray;


  // val -> { _id, _rev }
  // key -> dpkjfiek (geohash)
  const makePolyline = (geohash) => {
    const positions = getTileAsArray(state.geohashtiles[geohash]._id);
    return <Polyline key={'geohashpolyline-'+geohash} pathOptions={{ color: 'lime' }} positions={positions} />
  }

  return <div style={{width: '500px', height: '500px' }}>

    <MapContainer center={state.center} zoom={state.zoom} scrollWheelZoom={false} style={{width: '500px', height: '500px' }}>

      <MapCenterer />
    
      <TileLayer
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
      />

      { Object.keys(state.geohashtiles).map(makePolyline) }
    
    </MapContainer>
    
  </div>
  
}
