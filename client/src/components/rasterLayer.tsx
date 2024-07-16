import { useGetMdt } from '@/hooks/useGetMdt'
import GeoRasterLayer from 'georaster-layer-for-leaflet'
import { useMap } from 'react-leaflet'

export const RasterLayer = () => {
    const map = useMap()
    const { georaster } = useGetMdt()

    const layer = new GeoRasterLayer({
        georaster: georaster,
        opacity: 0.7,
        pixelValuesToColorFn: (values) =>
            values[0] === 42 ? '#ffffff' : '#000000',
        resolution: 64,
    })

    map.addLayer(layer)
    return <></>
}
