import { useState, useEffect, useRef } from "react";
import Map from "../components/Map";
import Button from "../utilities/Button";
// import SegmentDetails from "../components/SegmentDetails";
import RouteGraph from "../components/RouteGraph";

const Create = () => {
  const [coords, setCoords] = useState<number[][]>([]);
  const [distance, setDistance] = useState<number[]>([]);
  const [totalDist, setTotalDist] = useState<number>(0);
  const [elevation, setElevation] = useState<number[][]>([]);
  const [routePoints, setRoutePoints] = useState<number>(0);
  const [allElevations, setAllElevations] = useState<number[]>([]);
  const [totalClimb, setTotalClimb] = useState<number>(0);
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
    setAllElevations(elevation.flat());
    console.log("allelevations: ", allElevations)
  }, [elevation])

  useEffect(() => {
    setTotalClimb(getTotalClimb(allElevations));
  }, [allElevations])

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

  const addCoords = (lngLat: number[]) => {
    setCoords((prevCoords) => [...prevCoords, lngLat]);
  }

  const updateRoutePoints = (points: number) => {
    setRoutePoints(points)
  }

  const removeLastCoord = () => {
    // console.log("distance: ", distance);
    // console.log("coords: ", coords);
    // console.log("elev: ", elevation)
    if (distance.length <= 1) {
      setTotalDist(0);
      setElevation([]);
    }

    setDistance((prevDistance) => prevDistance.slice(0, -1));
    setElevation((prevElevation) => prevElevation.slice(0, -1));

    setCoords((prevCoords) => prevCoords.slice(0, -1));
  }

  const clearCoords = () => {
    setCoords([]);
    setDistance([]);
    setTotalDist(0);
    setElevation([]);
  }

  const addDistance = (distance: number) => {
    setDistance((prevDistance) => [...prevDistance, distance]);
  }

  const addElevation = (elev: number[]) => {
    setElevation((prevElevation) => [...prevElevation, elev]);
  }

  const saveRoute = () => {
    console.log("routesaved");
  }

  return (
    <>
      <div className="rounded-lg bg-black col-span-3">
        <Map
          coords={coords}
          addCoords={addCoords}
          addDistance={addDistance}
          totalDist={totalDist}
          setTotalDist={setTotalDist}
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
          <p className="text-lg font-semibold">{totalDist} meters</p>
        </div>
        <div className="border-secondary border-4 rounded-lg p-2 mb-2">
          <p className="text-md text-white/60">Total Elevation Gain:</p>
          <p className="text-lg font-semibold">{totalClimb} meters</p>
        </div>
        <RouteGraph
          allElevations={allElevations}
          routePoints={routePoints}
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