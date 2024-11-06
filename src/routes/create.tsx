// import { useRef, useEffect } from 'react';
// import mapboxgl from 'mapbox-gl';

// import 'mapbox-gl/dist/mapbox-gl.css';
import { useState } from "react";
import Map from "../components/Map";
import Button from "../utilities/Button";
import SegmentDetails from "../components/SegmentDetails";

const Create = () => {
  const [coords, setCoords] = useState<number[][]>([]);
  const [distance, setDistance] = useState<number[]>([]);
  const [totalDist, setTotalDist] = useState<number>(0);

  const addCoords = (lngLat: number[]) => {
    setCoords((prevCoords) => [...prevCoords, lngLat]);
  }

  const removeLastCoord = () => {
    setCoords((prevCoords) => prevCoords.slice(0, -1))
  }

  const clearCoords = () => {
    setCoords([]);
  }

  const addDistance = (distance: number) => {
    setDistance((prevDistance) => [...prevDistance, distance])
  }

  const saveRoute = () => {
    console.log("routesaved")
  }

  return (
    <>
      <div className="rounded-lg bg-black col-span-3">
        <Map
          coords={coords}
          addCoords={addCoords}
          addDistance={addDistance}
          totalDist={totalDist}
          setTotalDist={setTotalDist} />
      </div>
      <div className="flex flex-col rounded-lg text-white">
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
        <div className="border-secondary border-4 rounded-lg p-2">
          <p className="text-sm underline">Total distance:</p>
          <p className="text-lg">{totalDist} meters</p>
        </div>
        <SegmentDetails
          distance={distance} />
      </div>
    </>
  )
}

export default Create;