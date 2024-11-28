import RouteGraph from "./RouteGraph";
import type { Route } from "../types/dataTypes";

interface MapPostProps {
  route: Route
  width: number
}

const MapPost: React.FC<MapPostProps> = ({ route, width }) => {
  return (
    <div className="text-white rounded-lg bg-secondary mb-4">
      <div className="grid grid-cols-3 w-full text-center">
        <div>
          <p>Distance</p>
          <p>{route.totalDistance}</p>
        </div>
        <div>
          <p>Elevation</p>
          <p>{route.totalClimb}</p>
        </div>
      </div>
      <RouteGraph
        allElevations={route.allElevations}
        routePoints={route.points}
        graphWidth={width - 10}
        graphHeight={200} />
      {/* <img src={image} alt="route image" className="w-full h-64 mt-2 rounded-b-lg" /> */}
    </div>
  )
}

export default MapPost;