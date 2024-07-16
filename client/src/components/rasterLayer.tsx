import { GeoRaster } from 'georaster'
import GeoRasterLayer from 'georaster-layer-for-leaflet'
import { useMap } from 'react-leaflet'

export const RasterLayer = ({ geotiff }: { geotiff: GeoRaster }) => {
    const map = useMap()

    const layer = new GeoRasterLayer({
        georaster: geotiff,
        opacity: 0.7,
        // pixelValuesToColorFn: (values) =>
        //     values[0] === 0 ? 'transparent' : 'black',
        // pixelValuesToColorFn: function (values) {
        //     if (values[0] === 0) {
        //         return 'transparent'
        //     } else if (values[0] > 2 && values[0] < 8) {
        //         return 'green'
        //     } else if (values[0] < 4 && values[0] > 10) {
        //         return '#93E9BE'
        //     } else if (values[0] < 10 && values[0] > 20) {
        //         return 'red'
        //     } else if (values[0] === 12) {
        //         return '#966400'
        //     } else {
        //         return 'transparent'
        //     }
        // },
        resolution: 512,
    })

    map.addLayer(layer)
    return <></>
}
