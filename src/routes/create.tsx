import { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

import 'mapbox-gl/dist/mapbox-gl.css';

const Create = () => {
  const mapRef: any = useRef();
  const mapContainerRef: any = useRef()

  useEffect(() => {
    mapboxgl.accessToken
  }, [])

  return (
    <>
      <div ref={mapContainerRef} />
    </>
  )
}

export default Create;