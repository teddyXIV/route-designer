import { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

import 'mapbox-gl/dist/mapbox-gl.css';

const Create = () => {
  const mapRef: any = useRef();
  const mapContainerRef: any = useRef()

  useEffect(() => {
    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
    });

    return () => {
      mapRef.current.remove()
    }
  }, [])

  return (
    <>
      <div className="rounded-lg bg-secondary">
        <p>01</p>
        <p>02</p>
        <p>03</p>
      </div>
      <div className="rounded-lg bg-black col-span-2">
        <div
          ref={mapContainerRef}
          className="w-full h-[450px]"
        />
      </div>
      <div className="rounded-lg bg-secondary">03</div>
    </>
  )
}

export default Create;