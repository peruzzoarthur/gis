import { GeoRaster } from 'georaster'
import GeoRasterLayer, {
    GeoRasterLayerOptions,
} from 'georaster-layer-for-leaflet'
import { useMap } from 'react-leaflet'
import Rainbow from 'rainbowvis.js'

export const RasterLayer = ({ geotiff }: { geotiff: GeoRaster }) => {
    const rainbow = new Rainbow()
    const numberOfItems = 40
    rainbow.setNumberRange(1, numberOfItems)
    rainbow.setSpectrum('black', 'white')
    const map = useMap()

    const pixelValuesToColorFn: GeoRasterLayerOptions['pixelValuesToColorFn'] =
        (vals: number[]) => {
            if (vals[0] <= 0) {
                return 'transparent' // or any other fallback color
            }
            return '#' + rainbow.colourAt(Math.round(vals[0]))
        }

    const layer = new GeoRasterLayer({
        georaster: geotiff,
        opacity: 0.9,
        pixelValuesToColorFn,

        resolution: 128,
        updateWhenZooming: false,
        updateWhenIdle: false,
    })

    map.addLayer(layer)
    return <></>
}
