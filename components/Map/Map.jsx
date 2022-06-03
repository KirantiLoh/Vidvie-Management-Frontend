import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import "leaflet-defaulticon-compatibility";
import L from "leaflet"
import VidvieLogo from '@public/logo-VIDVIE-icon.png'

const Map = ({center, zoom, scrollWheelZoom, message, position}) => {

  let vidvieIcon = new L.icon({
    iconUrl: VidvieLogo.src,
    iconSize: [30, 30]
  })

  return (
    <MapContainer center={center} zoom={zoom} scrollWheelZoom={scrollWheelZoom} style={{width: '100%', height: '500px'}}>
            <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
            <Marker position={center} icon={vidvieIcon}>
                <Popup>
                    VIDVIE Indonesia
                </Popup>
                <Circle center={center} radius={10} fillColor="blue"/>
            </Marker>
            {position ? 
            <Marker position={position}>
              <Popup>
                    {message}
              </Popup>
            </Marker> : null}
        </MapContainer>
  )
}

export default Map

/*

*/