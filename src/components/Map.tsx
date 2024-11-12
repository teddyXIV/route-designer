import { useRef, useEffect, useState } from 'react';
import mapboxgl, { LngLatLike } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapboxDirections from '@mapbox/mapbox-sdk/services/directions';

interface MapProps {
  coords: number[][];
  addCoords: (lngLat: number[]) => void;
  addDistance: (distance: number) => void;
  totalDist: number;
  setTotalDist: (total: number) => void;
  addElevation: (elevation: number[]) => void;
}

const Map: React.FC<MapProps> = ({ coords, addCoords, addDistance, totalDist, setTotalDist, addElevation }) => {
  const [center, setCenter] = useState<LngLatLike | undefined>([-122.65, 45.5]);
  const [zoom, setZoom] = useState<number>(10.12);
  const mapRef: any = useRef();
  const mapContainerRef: any = useRef();

  useEffect(() => {
    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/satellite-streets-v12',
      center: center,
      // pitch: 40,
      // bearing: 41,
      zoom: zoom,
    });

    mapRef.current.on('style.load', () => {
      mapRef.current.addSource('mapbox-dem', {
        type: 'raster-dem',
        url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
        tileSize: 512,
        maxzoom: 14
      });
      mapRef.current.setTerrain({ source: 'mapbox-dem', exaggeration: 1.5 });
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

        addCoords(lngLat);

      });
    }

    // return () => {
    //   mapRef.current.remove()
    // };
  }, []);

  useEffect(() => {

    const markers = coords.map(coord =>
      new mapboxgl.Marker({ color: '#FF6542' })
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
          const distance = response.body.routes[0].distance;
          setTotalDist(parseFloat(distance.toFixed(3)));

          const routeElevations = route.coordinates.map((coord: LngLatLike) => {
            const elev = mapRef.current.queryTerrainElevation(coord);
            return parseFloat(elev.toFixed(3))
          })

          if (routeElevations !== null) {
            addElevation(routeElevations);
            console.log(routeElevations)
          } else {
            console.log("No elevation data available")
          }

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
              'line-color': '#37FF8B',
              'line-width': 4,
            },
          });

          const segDist = (distance - totalDist)
          if (segDist > 0) {
            addDistance(parseFloat(segDist.toFixed(3)))
          }
        })
        .catch((error: any) => {
          console.error('Error fetching directions:', error);
        });
    } else if (mapRef.current.getSource('route')) {
      mapRef.current.removeLayer('route');
      mapRef.current.removeSource('route');
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