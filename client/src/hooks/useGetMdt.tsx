import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import GeoTIFF, { GeoTIFFImage, fromArrayBuffer } from 'geotiff'
import { axiosInstance } from '@/axiosInstance'

const hexToArrayBuffer = (hex: string): ArrayBuffer => {
    // Ensure the hex string has an even length
    if (hex.length % 2 !== 0) {
        throw new Error('Invalid hex string')
    }

    const typedArray = new Uint8Array(
        hex.match(/.{1,2}/g)!.map((byte) => parseInt(byte, 16))
    )
    return typedArray
}

export const useGetMdt = () => {
    const [geotiff, setGeotiff] = useState<GeoTIFF | null>(null)
    const [rasterImage, setRasterImage] = useState<GeoTIFFImage | null>(null)

    const {
        data: mdt,
        isFetching: isFetchingMdt,
        refetch: refetchMdt,
    } = useQuery({
        queryKey: ['get-all-rs-mdt'],
        queryFn: async () => {
            try {
                const { data }: { data: string } =
                    await axiosInstance.get('/raster')

                const arrayBuffer = hexToArrayBuffer(data)
                console.log(arrayBuffer)

                const raster = await fromArrayBuffer(arrayBuffer)
                console.log(raster)
                return data
            } catch (error) {
                console.error(
                    'Error fetching or processing GeoTIFF data:',
                    error
                )
                throw new Error('Failed to fetch GeoTIFF data.')
            }
        },
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
    })

    return {
        mdt,
        isFetchingMdt,
        refetchMdt,
        geotiff,
        rasterImage,
    }
}

// try {
//     const { data }: { data: string } =
//         await axiosInstance.get('/raster')

//     const hexToInt16ArrayBuffer = (hex: string): ArrayBuffer => {
//         const typedArray = new Int16Array(
//             hex.match(/.{1,4}/g)!.map((byte) => parseInt(byte, 16))
//         )
//         return typedArray.buffer
//     }

//     const arrayBuffer = hexToInt16ArrayBuffer(data)
//     console.log(arrayBuffer)
//     const raster = await parseGeoraster(arrayBuffer)

//     setGeoraster
//     return raster
// } catch (error) {
//     console.error(
//         'Error fetching or processing GeoTIFF data:',
//         error
//     )
//     throw new Error('Failed to fetch GeoTIFF data.')
// }

// try {
//     // Fetch GeoTIFF data from server
//     const response = await fetch('http://localhost:3000/raster')
//     const arrayBuffer = await response.arrayBuffer()

//     // Parse GeoTIFF using fromArrayBuffer
//     const tiff = await fromArrayBuffer(arrayBuffer)
//     setGeotiff(tiff)

//     // Get the first image from the GeoTIFF
//     const image = await tiff.getImage()
//     setRasterImage(image)

//     return tiff
// } catch (error) {
//     console.error(
//         'Error fetching or processing GeoTIFF data:',
//         error
//     )
//     throw new Error('Failed to fetch GeoTIFF data.')
// }
