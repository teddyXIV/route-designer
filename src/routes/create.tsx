// import { useRef, useEffect } from 'react';
// import mapboxgl from 'mapbox-gl';

// import 'mapbox-gl/dist/mapbox-gl.css';
import { useState } from "react";
import Map from "../components/Map";
import Button from "../utilities/Button";
import SegmentDetails from "../components/SegmentDetails";

const Create = () => {
  const [coords, setCoords] = useState<number[][]>([])

  const addCoords = (lngLat: number[]) => {
    setCoords((prevCoords) => [...prevCoords, lngLat]);
  }

  const removeLastCoord = () => {
    setCoords((prevCoords) => prevCoords.slice(0, -1))
  }

  const clearCoords = () => {
    setCoords([]);
  }

  const saveRoute = () => {
    console.log("routesaved")
  }

  return (
    <>
      <div className="rounded-lg bg-black col-span-3">
        <Map
          coords={coords}
          addCoords={addCoords} />
      </div>
      <div className="flex flex-col rounded-lg bg-secondary text-white p-4">
        <Button
          text="Save route"
          containerStyles="bg-primary mb-2"
          textStyles="white"
          handleClick={saveRoute}
        />
        <Button
          text="Remove last point"
          containerStyles="bg-secondary border-2 border-primary mb-2"
          textStyles="white"
          handleClick={removeLastCoord}
        />
        <Button
          text="Clear all points"
          containerStyles="bg-secondary border-2 border-primary mb-2"
          textStyles="white"
          handleClick={clearCoords}
        />
        <SegmentDetails coords={coords} />
      </div>
    </>
  )
}

export default Create;