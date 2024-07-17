import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
// import GeoTIFF, { GeoTIFFImage, fromArrayBuffer } from 'geotiff'
import { axiosInstance } from '@/axiosInstance'
import parseGeoraster, { GeoRaster } from 'georaster'

const hexToArrayBuffer = (hex: string): ArrayBuffer => {
    // if (hex.length % 2 !== 0) {
    //     throw new Error('Invalid hex string length')
    // }

    const typedArray = new Uint8Array(
        hex.match(/.{1,2}/g)!.map((byte) => parseInt(byte, 16))
    )

    return typedArray.buffer
}

// const logArrayBuffer = (buffer: ArrayBuffer, length: number = 100) => {
//     // const dataView = new DataView(buffer)
//     const byteArray = new Uint8Array(buffer)
//     const hexArray = []

//     for (let i = 0; i < Math.min(length, byteArray.length); i++) {
//         hexArray.push(byteArray[i].toString(16).padStart(2, '0'))
//     }

//     console.log('ArrayBuffer initial bytes:', hexArray.join(' '))
// }

export const useGetMdt = () => {
    const [geotiff, setGeotiff] = useState<GeoRaster | null>(null)

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

                if (!data) {
                    throw new Error('No data received from /raster endpoint')
                }

                const arrayBuffer = hexToArrayBuffer(data)

                // console.log('Typed array length:', arrayBuffer.byteLength)
                // logArrayBuffer(arrayBuffer)

                // Check initial bytes for GeoTIFF signature
                const initialBytes = new Uint8Array(arrayBuffer.slice(0, 4))
                console.log('Initial Bytes:', initialBytes)

                if (initialBytes[0] !== 0x49 && initialBytes[0] !== 0x4d) {
                    throw new Error('Invalid TIFF header in the array buffer')
                }

                const tiff = await parseGeoraster(arrayBuffer)
                // console.log(tiff)
                setGeotiff(tiff)

                // const image = await tiff.getImage()
                // setRasterImage(image)
                // console.log('GeoTIFFImage:', image)

                return tiff
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
