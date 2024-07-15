import { LatLngExpression, LatLngTuple } from 'leaflet'

export function wktStringToLatLon(wkt: string): LatLngTuple | null {
    const pointRegex = /POINT\(\s*(-?\d+\.\d+)\s+(-?\d+\.\d+)\s*\)/
    const match = wkt.match(pointRegex)

    if (match) {
        const lon = parseFloat(match[1])
        const lat = parseFloat(match[2])
        return [lat, lon]
    }

    return null
}

export function wktStringToMultiPolygon(
    wkt: string
): LatLngExpression[] | LatLngExpression[][] | LatLngExpression[][][] | null {
    const multiPolygonRegex = /MULTIPOLYGON\s*\(\(\(([^)]+)\)\)\)/
    const match = wkt.match(multiPolygonRegex)

    if (match) {
        const polygonsString = match[1]
        const polygons = polygonsString
            .split(/\)\s*,\s*\(/)
            .map((polygonString) => {
                return polygonString
                    .trim()
                    .split(/\s*,\s*/)
                    .map((coordinateString) => {
                        const [lon, lat] = coordinateString
                            .trim()
                            .split(/\s+/)
                            .map(Number)
                        return [lat, lon] as LatLngTuple
                    })
            })
        return polygons
    }

    return null
}
