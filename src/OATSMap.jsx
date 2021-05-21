import { useOvermindState } from './overmind';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet'

export const OATSMap = () => {

  const state = useOvermindState();

  const polyline = state.points;

  return <div style={{width: '500px', height: '500px' }}>

    <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false} style={{width: '500px', height: '500px' }}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
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
