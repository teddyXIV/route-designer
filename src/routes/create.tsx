// import { useRef, useEffect } from 'react';
// import mapboxgl from 'mapbox-gl';

// import 'mapbox-gl/dist/mapbox-gl.css';
import Map from "../components/Map";
import Button from "../utilities/Button";

const Create = () => {

  const handleClick = () => {
    console.log("clicked")
  }

  return (
    <>
      <div className="rounded-lg bg-black col-span-3">
        <Map />
      </div>
      <div className="flex flex-col rounded-lg bg-secondary text-white p-4">
        <Button
          text="Save route"
          containerStyles="bg-primary mb-2"
          textStyles="white"
          handleClick={handleClick}
        />
        <Button
          text="Remove last point"
          containerStyles="bg-secondary border-2 border-primary mb-2"
          textStyles="white"
          handleClick={handleClick}
        />
        <Button
          text="Clear all points"
          containerStyles="bg-secondary border-2 border-primary mb-2"
          textStyles="white"
          handleClick={handleClick}
        />
      </div>
    </>
  )
}

export default Create;