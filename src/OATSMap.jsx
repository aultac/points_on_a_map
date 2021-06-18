import { useOvermindState } from './overmind';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet'

import { MapCenterer } from './MapCenterer'

export const OATSMap = () => {

  const state = useOvermindState();

  const polyline = state.pointsArray;


  return <div style={{width: '500px', height: '500px' }}>

    <MapContainer center={state.center} zoom={state.zoom} scrollWheelZoom={false} style={{width: '500px', height: '500px' }}>

      <MapCenterer />
    
      <TileLayer
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
      />

      <Polyline pathOptions={{ color: 'lime' }} positions={polyline} />
    
      <Marker position={[51.505, -0.09]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
    
  </div>
  
}
