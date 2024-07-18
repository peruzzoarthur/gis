// import { axiosInstance } from '@/axiosInstance'
import { axiosInstance } from '@/axiosInstance'
import { Coord } from '@/types/gis.types'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export const useGetAllCoords = () => {
    const [showCoords, setShowCoords] = useState<boolean>(true)
    const {
        data: allCoords,
        isFetching: isFetchingAllCoords,
        refetch: refetchAllCoords,
    } = useQuery({
        queryKey: ['get-all-coords'],
        queryFn: async (): Promise<Coord[]> => {
            const { data }: { data: Coord[] } =
                await axiosInstance.get(`/coords/`)

            return data
        },
    })

    return {
        allCoords,
        isFetchingAllCoords,
        refetchAllCoords,
        showCoords,
        setShowCoords,
    }
}
