import { useState, useEffect, useRef } from "react";
import Map from "../components/Map";
import Button from "../utilities/Button";
// import SegmentDetails from "../components/SegmentDetails";
import RouteGraph from "../components/RouteGraph";

interface Route {
  coords: number[][];
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

  // const [coords, setCoords] = useState<number[][]>([]);
  // const [distance, setDistance] = useState<number[]>([]);
  // const [totalDist, setTotalDist] = useState<number>(0);
  // const [elevation, setElevation] = useState<number[][]>([]);
  // const [routePoints, setRoutePoints] = useState<number>(0);
  // const [allElevations, setAllElevations] = useState<number[]>([]);
  // const [totalClimb, setTotalClimb] = useState<number>(0);
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

  useEffect(() => {
    console.log("coords", route.coords)
    console.log("distance", route.distance)
    console.log("totalDistance", route.totalDistance)
    console.log("elevations", route.elevations)
    console.log("points", route.points)
    console.log("allElevations", route.allElevations)
    console.log("totalClimb", route.totalClimb)

  }, [route])


  //========================================================================
  // Update allElevations when elevations changes
  //========================================================================
  useEffect(() => {
    // setAllElevations(elevation.flat());

    setRoute({
      ...route,
      allElevations: route.elevations.flat(),
      totalClimb: getTotalClimb(route.elevations.flat())
    })
    console.log("allelevations: ", route.allElevations)
  }, [route.elevations])


  //============================================================================
  // Update totalClimb when allElevations changes
  //============================================================================
  // useEffect(() => {
  //   // setTotalClimb(getTotalClimb(route.allElevations));
  //   console.log("set total climb triggered")
  //   setRoute({
  //     ...route,
  //     totalClimb: getTotalClimb(route.allElevations)
  //   })
  // }, [route.allElevations])


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
    console.log("updateTotalDistance triggered", newTotal)

    setRoute({
      ...route,
      totalDistance: newTotal,
    })
  }

  const addCoords = (lngLat: number[]) => {
    // setCoords((prevCoords) => [...prevCoords, lngLat]);
    console.log("addCoords triggered");

    setRoute((prevRoute) => ({
      ...prevRoute,
      coords: [...prevRoute.coords, lngLat]
    }))
  }

  const updateRoutePoints = (newPoints: number) => {
    // setRoutePoints(newPoints)
    console.log("updatePoints triggered")

    setRoute((prevRoute) => ({
      ...prevRoute,
      points: newPoints
    }))
  }

  const removeLastCoord = () => {
    if (route.distance.length <= 1) {
      // setTotalDist(0);
      // setElevation([]);
      setRoute({
        ...route,
        elevations: [],
        totalDistance: 0
      })
    }


    // setDistance((prevDistance) => prevDistance.slice(0, -1));
    // setElevation((prevElevation) => prevElevation.slice(0, -1));
    // setCoords((prevCoords) => prevCoords.slice(0, -1));

    setRoute((prevRoute) => ({
      ...prevRoute,
      coords: [...prevRoute.coords.slice(0, -1)],
      distance: [...prevRoute.distance.slice(0, -1)],
      elevations: [...prevRoute.elevations.slice(0, -1)],
    }))
  }

  const clearCoords = () => {
    // setCoords([]);
    // setDistance([]);
    // setTotalDist(0);
    // setElevation([]);

    setRoute({
      ...route,
      coords: [],
      distance: [],
      totalDistance: 0,
      elevations: []
    })
  }

  const addDistance = (dist: number) => {
    // setDistance((prevDistance) => [...prevDistance, distance]);
    console.log("addDistance triggered", dist)

    setRoute((prevRoute) => ({
      ...prevRoute,
      distance: [...prevRoute.distance, dist]
    }))
  }

  const addElevation = (elev: number[]) => {
    // setElevation((prevElevation) => [...prevElevation, elev]);
    console.log("addElevation triggered", elev)
    setRoute((prevRoute) => ({
      ...prevRoute,
      elevations: [...prevRoute.elevations, elev]
    }))
  }


  //===========================================================================
  // Save route to firestore 
  //===========================================================================
  const saveRoute = () => {
    console.log("routesaved");
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
          handleClick={saveRoute}
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