import { useEffect } from 'react'
import { useMap } from 'react-leaflet'

type ScreenSquareProps = {
    setScreenSquare: React.Dispatch<
        React.SetStateAction<{
            minX: number
            minY: number
            maxX: number
            maxY: number
        } | null>
    >
}

export function ScreenSquare({ setScreenSquare }: ScreenSquareProps) {
    const map = useMap()

    useEffect(() => {
        // Function to update screen square with current map bounds
        const updateScreenSquare = () => {
            const mapBoundary = map.getBounds()

            const ne = mapBoundary.getNorthEast()
            const northLat = ne.lat
            const eastLng = ne.lng

            const sw = mapBoundary.getSouthWest()
            const southLat = sw.lat
            const westLng = sw.lng

            setScreenSquare({
                minX: westLng,
                minY: southLat,
                maxX: eastLng,
                maxY: northLat,
            })
        }

        // Call updateScreenSquare immediately when component mounts
        updateScreenSquare()

        // Attach event listener for map moveend to update screen square
        map.on('moveend', updateScreenSquare)

        // Clean up the event listener when component unmounts
        return () => {
            map.off('moveend', updateScreenSquare)
        }
    }, [map, setScreenSquare]) // Dependency array ensures this effect runs only when map or setScreenSquare changes

    return <></> // Since this component's purpose is side effect (updating screenSquare), return an empty fragment
}
