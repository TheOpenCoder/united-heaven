import { GeoJSONProperties } from '@/types/geojson'
import type { FillLayer, LineLayer } from 'react-map-gl'

export const countryLayer: (_colorMode: string) => FillLayer = (colorMode) => {
  return {
    id: 'country-layer',
    type: 'fill',
    source: 'country',
    filter: ['!=', 'ISO_A3', '-99'],
    paint: {
      'fill-color': colorMode === 'light' ? '#B7C2CD' : '#31465B',
      'fill-opacity': ['case', ['boolean', ['feature-state', 'hover'], false], 1, 0.4],
    },
  }
}

export const countryOutline: (_colorMode: string) => LineLayer = (colorMode: string) => {
  return {
    id: 'country-outline',
    type: 'line',
    source: 'country',
    filter: ['!=', 'ISO_A3', '-99'],
    paint: {
      'line-color': colorMode === 'light' ? '#B7C2CD' : '#31465B',
      'line-width': 2,
    },
  }
}

export const selectedCountryFill: (_colorMode: string, _selectedCountry: GeoJSONProperties | null) => FillLayer = (
  colorMode,
  selectedCountry
) => {
  return {
    id: 'selected-country-outline',
    type: 'fill',
    source: 'country',
    filter: ['==', 'ADMIN', selectedCountry?.ADMIN || 'null'],
    paint: {
      'fill-color': colorMode === 'light' ? '#11465B' : '#93ADC6',
    },
  }
}
