import RouteGraph from "./RouteGraph";
import type { Route } from "../types/dataTypes";

interface MapPostProps {
  route: Route
  width: number
  updateFullRoute: (selectedRoute: Route) => void
}

const MapPost: React.FC<MapPostProps> = ({ route, width, updateFullRoute }) => {
  return (
    <button className="text-white rounded-lg mb-2 pr-2"
      onClick={() => updateFullRoute(route)}
    >
      <div className="grid grid-cols-3 w-full text-center py-1">
        <div className="ml-6">
          <p className="text-md text-white/60">Distance</p>
          <p className="text-lg font-semibold">{route.totalDistance}m</p>
        </div>
        <div />
        <div className="mr-6">
          <p className="text-md text-white/60">Elevation</p>
          <p className="text-lg font-semibold">{route.totalClimb}m</p>
        </div>
      </div>
      <RouteGraph
        allElevations={route.allElevations}
        routePoints={route.points}
        graphWidth={width - 10}
        graphHeight={200} />
      {/* <img src={image} alt="route image" className="w-full h-64 mt-2 rounded-b-lg" /> */}
    </button>
  )
}

export default MapPost;