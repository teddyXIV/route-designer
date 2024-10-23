import { useRef, useEffect, useState } from 'react';
import mapboxgl, { LngLatLike } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapboxDirections from '@mapbox/mapbox-sdk/services/directions';

const Map = () => {
  const [center, setCenter] = useState<LngLatLike | undefined>([-122.65, 45.5])
  const [zoom, setZoom] = useState<number>(10.12)
  const mapRef: any = useRef();
  const mapContainerRef: any = useRef()
  const [coordinates, setCoordinates] = useState<number[][]>([]);

  useEffect(() => {
    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: center,
      zoom: zoom
    });

    const directionsClient = MapboxDirections({ accessToken: mapboxgl.accessToken });

    mapRef.current.on('move', () => {
      const mapCenter = mapRef.current.getCenter()
      const mapZoom = mapRef.current.getZoom()

      setCenter([mapCenter.lng, mapCenter.lat])
      setZoom(mapZoom)
    })

    mapRef.current.on('click', (e: mapboxgl.MapMouseEvent) => {
      const lngLat = e.lngLat.toArray();

      setCoordinates((prevCoordinates) => [...prevCoordinates, lngLat]);
    });

    if (coordinates.length > 1) {
      const points = coordinates.map((coord) => ({ coordinates: coord }));

      directionsClient
        .getDirections({
          profile: 'cycling',
          waypoints: points,
          geometries: 'geojson',
        })
        .send()
        .then((response: any) => {
          console.log("response:", response)
          const route = response.body.routes[0].geometry;

          if (mapRef.current.getSource('route')) {
            mapRef.current.removeLayer('route');
            mapRef.current.removeSource('route');
          }

          mapRef.current.addSource('route', {
            type: 'geojson',
            data: {
              type: 'Feature',
              properties: {},
              geometry: route,
            },
          });

          mapRef.current.addLayer({
            id: 'route',
            type: 'line',
            source: 'route',
            layout: {
              'line-join': 'round',
              'line-cap': 'round',
            },
            paint: {
              'line-color': '#ff7e5f',
              'line-width': 4,
            },
          });
        })
        .catch((error: any) => {
          console.error('Error fetching directions:', error);
        });
    }

    return () => {
      mapRef.current.remove()
    }
  }, [coordinates])

  return (
    <div
      ref={mapContainerRef}
      className="w-full h-[450px] rounded-lg"
    />
  )
}

export default Map;