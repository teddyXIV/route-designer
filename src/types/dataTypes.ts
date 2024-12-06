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

interface FetchedRoute {
  id: string;
  route: Route
}

export type { LatLng, ElevsObj, Route, FetchedRoute }