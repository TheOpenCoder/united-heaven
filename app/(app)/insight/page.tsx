'use client'
import { useState, useRef, useCallback } from 'react'
import MapWrapper from '@/components/map/MapWrapper'
import { Layer, Source, MapRef } from 'react-map-gl'
import { countryLayer, countryOutline, selectedCountryFill } from './_components/mapTilesStyle'
//@ts-ignore
import CountryGeoJson from '@/data/countries.geojson'
import { GeoJSONProperties } from '@/types/geojson'
import MouseOverlayWrapper from './_components/MouseOverlayWrapper'
import Image from 'next/image'
import OverlayCard from '@/components/OverlayCard'
import { useColorMode } from '@/context/ColorModeContext'
import Menu, { MenuOption } from '@/components/Menu'

const MenuOptions: MenuOption[] = [
  { name: 'Index Rank', value: 'Index Rank' },
  { name: 'Index Score', value: 'Index Score' },
  { name: 'Spillover Score', value: 'Spillover Score' },
  { name: 'Country Details', value: 'Country Details' },
  { name: 'SDG 1', value: 'SDG 1' },
  { name: 'SDG 2', value: 'SDG 2' },
  { name: 'SDG 3', value: 'SDG 3' },
  { name: 'SDG 4', value: 'SDG 4' },
  { name: 'SDG 5', value: 'SDG 5' },
  { name: 'SDG 6', value: 'SDG 6' },
  { name: 'SDG 7', value: 'SDG 7' },
  { name: 'SDG 8', value: 'SDG 8' },
  { name: 'SDG 9', value: 'SDG 9' },
  { name: 'SDG 10', value: 'SDG 10' },
  { name: 'SDG 11', value: 'SDG 11' },
  { name: 'SDG 12', value: 'SDG 12' },
  { name: 'SDG 13', value: 'SDG 13' },
  { name: 'SDG 14', value: 'SDG 14' },
  { name: 'SDG 15', value: 'SDG 15' },
  { name: 'SDG 16', value: 'SDG 16' },
  { name: 'SDG 17', value: 'SDG 17' },
]

const Insight = () => {
  const mapRef = useRef<MapRef | null>(null)

  const [hoveredCountryId, sethoveredCountryId] = useState(null)
  const [hoveredCountry, sethoveredCountry] = useState<GeoJSONProperties | null>(null)
  const [selectedCountry, setselectedCountry] = useState<GeoJSONProperties | null>(null)
  const [insightMode, setInsightMode] = useState('Index Rank')
  const { colorMode } = useColorMode()

  const onHover = useCallback(
    (event: any) => {
      if (!mapRef.current) return

      if (event.features.length > 0) {
        const hoveredFeature = event.features[0]

        if (hoveredCountryId !== null) {
          if (hoveredFeature.id === hoveredCountryId) {
            return
          }

          mapRef.current.setFeatureState(
            {
              source: 'country',
              id: hoveredCountryId,
            },
            { hover: false }
          )
        }

        mapRef.current.setFeatureState(
          {
            source: 'country',
            id: hoveredFeature.id,
          },
          { hover: true }
        )

        sethoveredCountryId(hoveredFeature.id)
        sethoveredCountry(hoveredFeature.properties)
      }
    },
    [hoveredCountryId]
  )

  const onLeave = useCallback(() => {
    if (!mapRef.current) return

    if (hoveredCountryId !== null) {
      mapRef.current.setFeatureState(
        {
          source: 'country',
          id: hoveredCountryId,
        },
        { hover: false }
      )
      sethoveredCountryId(null)
      sethoveredCountry(null)
    }
  }, [hoveredCountryId])

  const onMapClick = useCallback(
    (event: any) => {
      if (event.features.length > 0) {
        const eventCountry = event.features[0]?.properties.ADMIN
        const eventCountryIso3 = event.features[0]?.properties.ISO_A3
        if (insightMode !== 'Country Details') {
          // navigate(`/profiles/${eventCountryIso3.toLowerCase()}`);
        } else {
          if (selectedCountry !== null && selectedCountry.ADMIN === eventCountry) {
            setselectedCountry(null)
          } else {
            setselectedCountry(event.features[0].properties)
          }
        }
      }
    },
    [selectedCountry, insightMode]
  )

  return (
    <div className='w-full h-[100dvh] -mt-16 bg-black relative'>
      <MapWrapper ref={mapRef} onMouseMove={onHover} onMouseLeave={onLeave} onClick={onMapClick}>
        <Source generateId={true} id='country' type='geojson' data={CountryGeoJson}>
          <Layer {...countryLayer(colorMode)} />
          <Layer {...countryOutline(colorMode)} />
          <Layer {...selectedCountryFill(colorMode, selectedCountry)} />
        </Source>
        <div className='hidden md:block'>
          {hoveredCountry && (
            <MouseOverlayWrapper>
              <div className='flex'>
                <Image
                  className='mr-2.5 w-20 h-20'
                  width={80}
                  height={80}
                  src={`/images/Flags/${hoveredCountry?.ISO_A2.toLowerCase()}.png`}
                  alt={`${hoveredCountry?.ADMIN} flag`}
                />
                <div className='flex flex-col justify-center'>
                  <p className='text-xl font-bold line-clamp-1'>{hoveredCountry?.ADMIN}</p>
                  <p className='text-md font-medium mt-0.5'>{colorMode}</p>
                </div>
              </div>
            </MouseOverlayWrapper>
          )}
        </div>
      </MapWrapper>
      {selectedCountry !== null && insightMode === 'Country Details' && (
        <OverlayCard
          title={selectedCountry.ADMIN}
          onClose={() => setselectedCountry(null)}
          position={{ left: '0', top: '50%' }}
          className='h-5/6 mt-8 -translate-y-1/2'
          divider
          width={340}
        >
          <p>ISO2: {selectedCountry.ISO_A2}</p>
          <p>ISO3: {selectedCountry.ISO_A3}</p>
        </OverlayCard>
      )}

      <div className='fixed right-0 bottom-0 mb-6 mr-8'>
        <Menu options={MenuOptions} value={insightMode} setValue={setInsightMode} />
      </div>
    </div>
  )
}

export default Insight
