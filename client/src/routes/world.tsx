import { createFileRoute } from '@tanstack/react-router'

import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import 'leaflet/dist/leaflet.css'
// import { Marker, Popup } from 'react-leaflet'

// import MarkerClusterGroup from 'react-leaflet-cluster'
// import mari from '../styles/img/mari.png'
// import { Icon, LatLngTuple } from 'leaflet'

export const Route = createFileRoute('/world')({
    component: World,
})
export function World() {
    // const markers: {
    //   geocode: LatLngTuple;
    //   popUp: string;
    //   size: number;
    //   name: string;
    // }[] = allCountriesData
    //   ? allCountriesData.map((c) => ({
    //       geocode: [c.latitude ?? null, c.longitude ?? null] as LatLngTuple,
    //       popUp: c.artists.map((a) => a.name).join(", ") as string,
    //       size: c.artists.length,
    //       name: c.name,
    //     }))
    //   : [];

    return (
        <div className="bg-green-200 w-full">
            <MapContainer center={[0, 0]} zoom={2} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url=" https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                />
            </MapContainer>
        </div>
    )
}

// <MarkerClusterGroup chunkedLoading>
// {markers.map((m, index) => (
//   <Marker
//     key={index}
//     position={m.geocode}
//     icon={
//       new Icon({
//         iconUrl: mari,
//         iconSize: [justaVariable(m.size), justaVariable(m.size)],
//       })
//     }
//   >
//     <Popup className="custom-popup">
//       {allCountriesData
//         ?.filter((c) => c.name === m.name)
//         ?.map((c, index) => (
//           <ArtistsFromCountriesCarousel country={c} key={index} />
//         ))}
//     </Popup>
//   </Marker>
// ))}
// </MarkerClusterGroup>
