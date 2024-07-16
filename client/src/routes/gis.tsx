import { createFileRoute } from '@tanstack/react-router'

import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import 'leaflet/dist/leaflet.css'
import { useGetAllCoords } from '@/hooks/useGetAllCoords'
// import { Icon, LatLngTuple } from 'leaflet'
import { wktStringToLatLon } from '@/util/conversion'
import { LayerGroup, Marker, Polygon, useMapEvent } from 'react-leaflet'

import MarkerClusterGroup from 'react-leaflet-cluster'
import mari from '../styles/jpg/mari.jpg'
import { Icon, LatLngExpression, LatLngTuple } from 'leaflet'
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from '@/components/ui/resizable'
import React, { memo, useState } from 'react'
import { Card } from '@/components/ui/card'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { useToast } from '@/components/ui/use-toast'
import {
    ErrorResponse,
    ScreenSquare as ScreenSquareType,
} from '@/types/gis.types'
import { ErrorBox } from '@/components/custom/errorBox'
import { ToolsNav } from '@/components/custom/toolsNav'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { useGetAllRsCities } from '@/hooks/useGetAllRsCities'
import { ScreenSquare } from '@/components/custom/screenSquare'
import { useGetMdt } from '@/hooks/useGetMdt'
import { RasterLayer } from '@/components/rasterLayer'

export const Route = createFileRoute('/gis')({
    component: Gis,
})

export function Gis() {
    const [isError, setError] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string | undefined>()
    const [selectCoord, setSelectCoord] = useState<{
        lat: number
        lng: number
    } | null>()
    const [onHoverCoord, setOnHoverCoord] = useState<{
        lat: number
        lng: number
    } | null>()
    const [isPointToolOn, setIsPointToolOn] = useState<boolean>(false)
    const { toast } = useToast()
    const { allCoords, refetchAllCoords, showCoords, setShowCoords } =
        useGetAllCoords()
    const [screenSquare, setScreenSquare] = useState<ScreenSquareType | null>(
        null
    )
    const { isFetchingAllRsCities, geometries, showCities, setShowCities } =
        useGetAllRsCities(screenSquare as ScreenSquareType)

    const { mdt } = useGetMdt()

    // const image = georaster?.getImage()

    const markers: {
        geocode: LatLngTuple
    }[] = allCoords
        ? allCoords.map((c) => {
              const tuple = wktStringToLatLon(c.coords) as LatLngTuple
              return {
                  geocode: tuple,
              }
          })
        : []

    const createPoint = async (input: { lat: number; lng: number }) => {
        try {
            const requestBody: {
                latitude: number
                longitude: number
            } = {
                latitude: input.lat,
                longitude: input.lng,
            }

            const data: AxiosResponse<unknown> = await axios.post(
                `${import.meta.env.VITE_SERVER_URL}/coords/`,
                requestBody
            )
            await refetchAllCoords()
            setSelectCoord(null)
            toast({
                title: `Created point with lat: ${input.lat} long:${input.lng}`,
            })

            return data
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError<ErrorResponse>

                if (axiosError.response && axiosError.response.status === 400) {
                    setError(true)
                    setErrorMessage(axiosError.response.data.message)
                }
            } else {
                setError(true)
                setErrorMessage(`Error creating point}.`)
            }
        }
    }

    return (
        <ResizablePanelGroup
            direction="horizontal"
            className="min-h-[200px] h-screen max-w-full rounded-lg border"
        >
            <ResizablePanel defaultSize={25}>
                <div className="flex flex-col h-screen p-6 ">
                    <span className="font-semibold">Sidebar</span>
                    {isPointToolOn ? (
                        <>
                            {selectCoord ? (
                                <Card className="flex flex-col p-2">
                                    <p>{`lat: ${selectCoord?.lat}`}</p>
                                    <p>{`lng: ${selectCoord?.lng}`}</p>

                                    <Button
                                        onClick={async () =>
                                            createPoint(selectCoord)
                                        }
                                    >
                                        Create point
                                    </Button>
                                </Card>
                            ) : (
                                <p>Pick a coordinate </p>
                            )}
                        </>
                    ) : null}
                    <Card className="flex p-2">
                        <Switch
                            checked={showCoords}
                            onCheckedChange={setShowCoords}
                            className="flex items-center mr-2"
                        />
                        Points
                    </Card>
                    <Card className="flex p-2">
                        <Switch
                            checked={showCities}
                            onCheckedChange={setShowCities}
                            className="flex items-center mr-2"
                        />
                        Cities
                    </Card>
                </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={75}>
                <div className="flex flex-col h-screen">
                    <ToolsNav
                        isPointToolOn={isPointToolOn}
                        setIsPointToolOn={setIsPointToolOn}
                    />
                    <MapContainer
                        center={[-31.75955334256868, -52.34488136477589]}
                        zoom={11}
                        scrollWheelZoom={true}
                        className="h-full hover:cursor-default"
                    >
                        {/* <RasterLayer /> */} //!!!!!!!
                        <ScreenSquare setScreenSquare={setScreenSquare} />
                        <CoordsFinderDummy setOnHoverCoord={setOnHoverCoord} />
                        {isPointToolOn && (
                            <>
                                <CoordsPickerDummy
                                    setSelectCoord={setSelectCoord}
                                />
                                <TemporaryMarker selectCoord={selectCoord} />
                            </>
                        )}
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url=" https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                        />
                        {showCoords && (
                            <MarkerClusterGroup chunkedLoading>
                                {markers.map((m, index) => (
                                    <Marker
                                        key={index}
                                        position={m.geocode}
                                        icon={
                                            new Icon({
                                                iconUrl: mari,
                                                iconSize: [33, 33],
                                            })
                                        }
                                    >
                                        {/* <Popup className="custom-popup">
                                {allCountriesData
                                ?.filter((c) => c.name === m.name)
                                ?.map((c, index) => (
                                    <ArtistsFromCountriesCarousel
                                    country={c}
                                    key={index}
                                    />
                                    ))}
                                    </Popup> */}
                                    </Marker>
                                ))}
                            </MarkerClusterGroup>
                        )}
                        <LayerGroup>
                            {!isFetchingAllRsCities &&
                                geometries &&
                                showCities &&
                                geometries.map((g, index) => (
                                    <MemoizedPolygon
                                        key={index}
                                        positions={
                                            g as
                                                | LatLngExpression[]
                                                | LatLngExpression[][]
                                                | LatLngExpression[][][]
                                        }
                                    />
                                ))}
                        </LayerGroup>
                    </MapContainer>
                    <Card>
                        <p>{`lat: ${onHoverCoord?.lat} lng: ${onHoverCoord?.lng}`}</p>
                    </Card>
                    {isError && (
                        <ErrorBox
                            errorMessage={errorMessage}
                            setError={setError}
                        />
                    )}
                </div>
            </ResizablePanel>
        </ResizablePanelGroup>
    )
}

const CoordsFinderDummy = ({
    setOnHoverCoord,
}: {
    setOnHoverCoord: React.Dispatch<
        React.SetStateAction<
            | {
                  lat: number
                  lng: number
              }
            | null
            | undefined
        >
    >
}) => {
    useMapEvent('mousemove', (e) => {
        setOnHoverCoord(e.latlng)
    })
    return null
}

const CoordsPickerDummy = ({
    setSelectCoord,
}: {
    setSelectCoord: React.Dispatch<
        React.SetStateAction<
            | {
                  lat: number
                  lng: number
              }
            | null
            | undefined
        >
    >
}) => {
    useMapEvent('click', (e) => {
        setSelectCoord(e.latlng)
    })
    return null
}

const TemporaryMarker = ({
    selectCoord,
}: {
    selectCoord:
        | {
              lat: number
              lng: number
          }
        | null
        | undefined
}) => {
    return (
        <>
            {selectCoord ? (
                <Marker position={[selectCoord.lat, selectCoord.lng]}></Marker>
            ) : null}
        </>
    )
}

const MemoizedPolygon = memo(
    ({
        positions,
    }: {
        positions:
            | LatLngExpression[]
            | LatLngExpression[][]
            | LatLngExpression[][][]
    }) => {
        const limeOptions = { color: 'lime' }

        return (
            <Polygon
                positions={positions}
                pathOptions={limeOptions}
                noClip={false}
            />
        )
    }
)
