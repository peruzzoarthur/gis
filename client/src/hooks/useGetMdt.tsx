import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
// import GeoTIFF, { GeoTIFFImage, fromArrayBuffer } from 'geotiff'
import { axiosInstance } from '@/axiosInstance'
import parseGeoraster, { GeoRaster } from 'georaster'



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

                const initialBytes = new Uint8Array(arrayBuffer.slice(0, 4))
                // console.log('Initial Bytes:', initialBytes)

                if (initialBytes[0] !== 0x49 && initialBytes[0] !== 0x4d) {
                    throw new Error('Invalid TIFF header in the array buffer')
                }

                const tiff = await parseGeoraster(arrayBuffer)
                setGeotiff(tiff)

        
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