type GeometryType = 'MultiPolygon'

type Coordinates = number[][][][]

interface GeoJSONGeometry {
  type: GeometryType
  coordinates: Coordinates
}

export interface GeoJSONProperties {
  ADMIN: string
  ISO_A3: string
  ISO_A2: string
}

interface GeoJSONFeature {
  type: 'Feature'
  properties: GeoJSONProperties
  geometry: GeoJSONGeometry
}

export interface GeoJSONFeatureCollection {
  type: 'FeatureCollection'
  features: GeoJSONFeature[]
}
