// import { axiosInstance } from '@/axiosInstance'
import { axiosInstance } from '@/axiosInstance'
import { City, ScreenSquare } from '@/types/gis.types'
import { wktStringToMultiPolygon } from '@/util/conversion'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export const useGetAllRsCities = (screenSquare: ScreenSquare) => {
    const [showCities, setShowCities] = useState<boolean>(true)
    const {
        data: allRsCities,
        isFetching: isFetchingAllRsCities,
        refetch: refetchAllRsCities,
    } = useQuery({
        queryKey: ['get-all-rs-cities', screenSquare],
        queryFn: async (): Promise<City[]> => {
            const requestBody: ScreenSquare = {
                minX: screenSquare.minX,
                minY: screenSquare.minY,
                maxX: screenSquare.maxX,
                maxY: screenSquare.maxY,
            }

            const { data }: { data: City[] } = await axiosInstance.post(
                `/cities/squared`,
                requestBody
            )

            return data
        },
        enabled: !!screenSquare,
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
    })

    const geometries = allRsCities
        ?.map((c) => wktStringToMultiPolygon(c.geometry))
        .filter((g) => g !== null)

    return {
        allRsCities,
        isFetchingAllRsCities,
        refetchAllRsCities,
        showCities,
        setShowCities,
        geometries,
    }
}
