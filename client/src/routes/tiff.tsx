import { createFileRoute } from '@tanstack/react-router'
import { MapContainer, TileLayer } from 'react-leaflet'
import { useGetMdt } from '@/hooks/useGetMdt'
import { RasterLayer } from '@/components/rasterLayer'

export const Route = createFileRoute('/tiff')({
    component: MapComponent,
})

function MapComponent() {
    const { geotiff } = useGetMdt()

    // if (!geotiff) {
    //     return <div>Loading...</div>
    // }

    return (
        <div className="flex flex-col w-screen h-screen">
            <MapContainer
                center={[-31.75955334256868, -52.34488136477589]}
                zoom={11}
                scrollWheelZoom={true}
                className="h-screen hover:cursor-default"
            >
                {geotiff && <RasterLayer geotiff={geotiff} />}

                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url=" https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                />
            </MapContainer>
        </div>
    )
}
