import { createFileRoute } from '@tanstack/react-router'
import {
    MapContainer,
    Marker,
    Popup,
    TileLayer,
    useMapEvent,
} from 'react-leaflet'
import { useGetMdt } from '@/hooks/useGetMdt'
import { RasterLayer } from '@/components/rasterLayer'
// import GeoRaster from 'georaster-layer-for-leaflet'
import { useState } from 'react'
import geoblaze from 'geoblaze'
import { GeoRaster } from 'georaster'
export const Route = createFileRoute('/tiff')({
    component: MapComponent,
})

function MapComponent() {
    const { geotiff, isFetchingMdt } = useGetMdt()
    const [selectAltitude, setSelectAltitude] = useState<number | null>(null)
    const [selectCoord, setSelectCoord] = useState<{
        lat: number
        lng: number
    } | null>()

    // if (!geotiff) {
    //     return <div>Loading...</div>
    // }

    return (
        <div className="flex flex-col w-screen h-screen">
            {isFetchingMdt ? <h1>loading</h1> : null}
            {selectAltitude && <h1>{selectAltitude}</h1>}
            <MapContainer
                center={[-31.75955334256868, -52.34488136477589]}
                zoom={11}
                scrollWheelZoom={true}
                className="h-screen hover:cursor-default"
            >
                {geotiff && (
                    <>
                        {selectAltitude && selectCoord && (
                            <Marker position={selectCoord}>
                                <Popup>{`Altitude: ${selectAltitude}`}</Popup>
                            </Marker>
                        )}
                        <RasterLayer geotiff={geotiff} />
                        <CoordsPickerDummy
                            geotiff={geotiff}
                            setSelectAltitude={setSelectAltitude}
                            setSelectCoord={setSelectCoord}
                        />
                    </>
                )}

                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url=" https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                />
            </MapContainer>
        </div>
    )
}

const CoordsPickerDummy = ({
    geotiff,
    setSelectAltitude,
    setSelectCoord,
}: {
    geotiff: GeoRaster
    setSelectAltitude: React.Dispatch<React.SetStateAction<number | null>>
    setSelectCoord: React.Dispatch<
        React.SetStateAction<
            | {
                  lat: number
                  lng: number
              }
            | null
            | undefined
        >
    >
}) => {
    useMapEvent('click', (e) => {
        const latlng = e.latlng
        const lat = latlng.lat
        const lng = latlng.lng
        const elevation = geoblaze.identify(geotiff, [lng, lat])
        setSelectAltitude(elevation[0])
        setSelectCoord(latlng)
        console.log(elevation)

        return null
    })
    return <></>
}
