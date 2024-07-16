export type Coord = {
    id: number
    createdAt: string // ISO date string
    updatedAt: string | null
    coords: string // WKT representation of the point
}

export type City = {
    id: number
    nm_mun: string
    geometry: string
}

export type ErrorResponse = {
    message: string
}

export type ScreenSquare = {
    minX: number
    minY: number
    maxX: number
    maxY: number
}

export type RasterRow = {
    rid: number
    hex: string
}
