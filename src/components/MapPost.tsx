import RouteGraph from "./RouteGraph";
import type { Route } from "../types/dataTypes";

interface MapPostProps {
  route: Route
  width: number
}

const MapPost: React.FC<MapPostProps> = ({ route, width }) => {
  return (
    <>
      <div className="grid grid-cols-2 w-full text-center py-1 divide-x-2 divide-white/60 mb-1">
        <div className="">
          <p className="text-md text-white/60">Distance</p>
          <p className="text-lg font-semibold">{route.totalDistance}m</p>
        </div>
        <div className="">
          <p className="text-md text-white/60">Total climb</p>
          <p className="text-lg font-semibold">{route.totalClimb}m</p>
        </div>
      </div>
      <RouteGraph
        allElevations={route.allElevations}
        routePoints={route.points}
        graphWidth={width - 10}
        graphHeight={200} />
    </>
  )
}

export default MapPost;