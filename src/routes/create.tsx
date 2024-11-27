import { useState, useEffect, useRef } from "react";
import Map from "../components/Map";
import Button from "../utilities/Button";
// import SegmentDetails from "../components/SegmentDetails";
import RouteGraph from "../components/RouteGraph";
import { saveRoute } from "../../lib/firebase";

interface LatLng {
  lat: number;
  lng: number;
}

interface Route {
  coords: LatLng[];
  distance: number[];
  totalDistance: number;
  elevations: number[][];
  points: number;
  allElevations: number[];
  totalClimb: number;
}

const Create = () => {
  const [route, setRoute] = useState<Route>({
    coords: [],
    distance: [],
    totalDistance: 0,
    elevations: [],
    points: 0,
    allElevations: [],
    totalClimb: 0
  })

  const [mapWidth, setMapWidth] = useState<number>(0)

  const detailsRef: any = useRef()

  const getTotalClimb = (elevations: number[]) => {
    if (elevations.length < 2) return 0;

    let total = 0;

    for (let i = 1; i < elevations.length; i++) {
      if (elevations[i - 1] < elevations[i]) {
        const diff = elevations[i] - elevations[i - 1];
        total += diff
      }
    }
    return parseFloat(total.toFixed(3));
  }

  // useEffect(() => {
  //   console.log("coords", route.coords)
  //   console.log("distance", route.distance)
  //   console.log("totalDistance", route.totalDistance)
  //   console.log("elevations", route.elevations)
  //   console.log("points", route.points)
  //   console.log("allElevations", route.allElevations)
  //   console.log("totalClimb", route.totalClimb)

  // }, [route])


  //========================================================================
  // Update allElevations and totalClimb when elevations changes
  //========================================================================
  useEffect(() => {

    const flatElevations = route.elevations.flat();

    setRoute((prevRoute) => ({
      ...prevRoute,
      allElevations: flatElevations,
      totalClimb: getTotalClimb(flatElevations)
    }))

  }, [route.elevations])


  //=============================================================================
  // Updates mapWidth when window size changes
  //=============================================================================
  useEffect(() => {
    if (detailsRef.current) {
      setMapWidth(detailsRef.current.offsetWidth)
    }

    const handleResize = () => {
      if (detailsRef.current) {
        setMapWidth(detailsRef.current.offsetWidth);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [])


  //==============================================================================
  // route property update functions
  //==============================================================================
  const updateTotalDistance = (newTotal: number) => {

    setRoute((prevRoute) => ({
      ...prevRoute,
      totalDistance: newTotal
    }))
  }

  const addCoords = (lngLat: LatLng) => {

    console.log("new coords: ", route.coords)

    setRoute((prevRoute) => ({
      ...prevRoute,
      coords: [...prevRoute.coords, lngLat]
    }))
  }

  const updateRoutePoints = (newPoints: number) => {

    setRoute((prevRoute) => ({
      ...prevRoute,
      points: newPoints
    }))
  }

  const removeLastCoord = () => {
    if (route.distance.length <= 1) {
      setRoute({
        ...route,
        elevations: [],
        totalDistance: 0
      })
    }

    setRoute((prevRoute) => ({
      ...prevRoute,
      coords: [...prevRoute.coords.slice(0, -1)],
      distance: [...prevRoute.distance.slice(0, -1)],
      elevations: [...prevRoute.elevations.slice(0, -1)],
    }))
  }

  const clearCoords = () => {
    setRoute({
      ...route,
      coords: [],
      distance: [],
      totalDistance: 0,
      elevations: []
    })
  }

  const addDistance = (dist: number) => {
    setRoute((prevRoute) => ({
      ...prevRoute,
      distance: [...prevRoute.distance, dist]
    }))
  }

  const addElevation = (elev: number[]) => {
    setRoute((prevRoute) => ({
      ...prevRoute,
      elevations: [...prevRoute.elevations, elev]
    }))
  }


  //===========================================================================
  // Save route to firestore 
  //===========================================================================
  const uploadRoute = async (routeData: Route) => {
    console.log("routesaved");
    saveRoute(routeData)
  }

  return (
    <>
      <div className="rounded-lg bg-black col-span-3">
        <Map
          coords={route.coords}
          addCoords={addCoords}
          addDistance={addDistance}
          totalDist={route.totalDistance}
          updateTotalDistance={updateTotalDistance}
          addElevation={addElevation}
          updateRoutePoints={updateRoutePoints}
        />
      </div>
      <div
        className="flex flex-col rounded-lg text-white"
        ref={detailsRef}
      >
        <Button
          text="Save route"
          containerStyles="bg-primary mb-2"
          textStyles="white"
          handleClick={() => uploadRoute(route)}
        />
        <Button
          text="Remove last point"
          containerStyles="bg-black border-2 border-primary mb-2"
          textStyles="white"
          handleClick={removeLastCoord}
        />
        <Button
          text="Clear all points"
          containerStyles="bg-black border-2 border-primary mb-2"
          textStyles="white"
          handleClick={clearCoords}
        />
        <div className="border-secondary border-4 rounded-lg p-2 mb-2">
          <p className="text-md text-white/60">Total distance:</p>
          <p className="text-lg font-semibold">{route.totalDistance} meters</p>
        </div>
        <div className="border-secondary border-4 rounded-lg p-2 mb-2">
          <p className="text-md text-white/60">Total Elevation Gain:</p>
          <p className="text-lg font-semibold">{route.totalClimb} meters</p>
        </div>
        <RouteGraph
          allElevations={route.allElevations}
          routePoints={route.points}
          graphWidth={mapWidth}
        />
        {/* <SegmentDetails
          distance={distance}
          elevations={elevation} /> */}
      </div>
    </>
  )
}

export default Create;