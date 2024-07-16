declare module 'georaster' {
    export interface GeoRaster {
        // Add properties as needed based on the GeoRaster structure
        noDataValue: number
        height: number
        width: number
        projection: number
        xmin: number
        xmax: number
        ymin: number
        ymax: number
        pixelWidth: number
        pixelHeight: number
        numberOfRasters: number
        sourceType: string
        dataType: string
        values: number[][][] // or adjust based on actual structure
    }

    export default function parseGeoraster(
        data: ArrayBuffer
    ): Promise<GeoRaster>
}

declare module 'georaster-layer-for-leaflet' {
    import { GridLayer, GridLayerOptions } from 'leaflet'
    import { GeoRaster } from 'georaster'

    export interface GeoRasterLayerOptions extends GridLayerOptions {
        georaster: GeoRaster
        opacity?: number
        pixelValuesToColorFn?: (values: number[]) => string
        resolution?: number
    }

    export default class GeoRasterLayer extends GridLayer {
        constructor(options: GeoRasterLayerOptions)
    }
}
