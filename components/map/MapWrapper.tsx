'use client'
import { forwardRef, useEffect, useState } from 'react'
import mapStyles from './mapStyles.constant'
import MapGL, { MapRef, MapProps } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { useColorMode } from '@/context/ColorModeContext'

interface MapWrapperProps extends MapProps {
  children: React.ReactNode
}

const MapWrapper = forwardRef<MapRef, MapWrapperProps>(({ children, ...otherAttributes }, mapRef) => {
  //initial map view
  const [viewState, setViewState] = useState({
    longitude: 20,
    latitude: 30,
    zoom: 1.5,
  })

  const { colorMode } = useColorMode()

  //escape button to set map to default view
  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setViewState({
          longitude: 20,
          latitude: 30,
          zoom: 1.5,
        })
      }
    }
    window.addEventListener('keydown', listener)

    return () => {
      window.removeEventListener('keydown', listener)
    }
  }, [])

  return (
    <MapGL
      {...viewState}
      onMove={(evt) => setViewState(evt.viewState)}
      interactiveLayerIds={['country-layer', 'country-outline']}
      mapStyle={colorMode === 'light' ? mapStyles.light : mapStyles.dark}
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
      reuseMaps
      attributionControl={false}
      ref={mapRef}
      {...otherAttributes}
    >
      {children}
    </MapGL>
  )
})

MapWrapper.displayName = 'MapWrapper'

export default MapWrapper
