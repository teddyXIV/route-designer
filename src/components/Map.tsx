import { useRef, useEffect, useState } from 'react';
import mapboxgl, { LngLatLike } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapboxDirections from '@mapbox/mapbox-sdk/services/directions';

interface MapProps {
  coords: number[][];
  changeCoords: (lngLat: number[]) => void;
}

const Map: React.FC<MapProps> = ({ coords, changeCoords }) => {
  const [center, setCenter] = useState<LngLatLike | undefined>([-122.65, 45.5]);
  const [zoom, setZoom] = useState<number>(10.12);
  const mapRef: any = useRef();
  const mapContainerRef: any = useRef();
  // const [coordinates, setCoordinates] = useState<number[][]>([]);

  useEffect(() => {
    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: center,
      zoom: zoom,
    });

    mapRef.current.on('move', () => {
      const mapCenter = mapRef.current.getCenter();
      const mapZoom = mapRef.current.getZoom();

      setCenter([mapCenter.lng, mapCenter.lat]);
      setZoom(mapZoom);
    });

    return () => {
      mapRef.current.remove();
    };
  }, []);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.on('click', (e: mapboxgl.MapMouseEvent) => {
        const lngLat = e.lngLat.toArray();

        // Add marker at the clicked location
        // new mapboxgl.Marker({ color: '#37FF8B' })
        //   .setLngLat(lngLat)
        //   .addTo(mapRef.current);

        changeCoords(lngLat);

        // setCoordinates((prevCoordinates) => [...prevCoordinates, lngLat]);
      });
    }
  }, []);

  useEffect(() => {
    console.log("useEffect coords: ", coords)
    const markers = coords.map(coord =>
      new mapboxgl.Marker({ color: '#37FF8B' })
        .setLngLat(coord as [number, number])
        .addTo(mapRef.current)
    );

    if (coords.length > 1) {
      const directionsClient = MapboxDirections({ accessToken: mapboxgl.accessToken });
      const points = coords.map((coord) => ({ coordinates: coord as [number, number] }));

      directionsClient
        .getDirections({
          profile: 'cycling',
          waypoints: points,
          geometries: 'geojson',
        })
        .send()
        .then((response: any) => {
          console.log('response:', response);
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
              'line-color': '#108342',
              'line-width': 4,
            },
          });
        })
        .catch((error: any) => {
          console.error('Error fetching directions:', error);
        });
    }

    return () => {
      markers.forEach(marker => marker.remove());
    };
  }, [coords]);

  return (
    <div
      ref={mapContainerRef}
      className="w-100 rounded-lg h-screen"
    />
  );
};

export default Map;