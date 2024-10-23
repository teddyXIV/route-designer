// import { useRef, useEffect } from 'react';
// import mapboxgl from 'mapbox-gl';

// import 'mapbox-gl/dist/mapbox-gl.css';
import Map from "../components/Map";

const Create = () => {

  return (
    <>
      <div className="rounded-lg bg-secondary">
        <p>01</p>
        <p>02</p>
        <p>03</p>
      </div>
      <div className="rounded-lg bg-black col-span-2">
        <Map />
      </div>
      <div className="rounded-lg bg-secondary">03</div>
    </>
  )
}

export default Create;