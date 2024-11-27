interface LatLng {
  lat: number;
  lng: number;
}

type ElevsObj = {
  [key: string]: number
}

interface Route {
  coords: LatLng[];
  distance: number[];
  totalDistance: number;
  elevations: ElevsObj[];
  points: number;
  allElevations: number[];
  totalClimb: number;
}

export type { LatLng, ElevsObj, Route }