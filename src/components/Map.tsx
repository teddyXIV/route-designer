import { useRef, useEffect, useState } from 'react';
import mapboxgl, { LngLatLike } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapboxDirections, { DirectionsWaypoint } from '@mapbox/mapbox-sdk/services/directions';
import { LatLng, ElevsObj } from "../types/dataTypes"

interface MapProps {
  coords: LatLng[];
  addCoords: (arg0: LatLng) => void;
  addDistance: (distance: number) => void;
  totalDist: number;
  updateTotalDistance: (total: number) => void;
  addElevation: (elevation: ElevsObj) => void;
  updateRoutePoints: (totalPoints: number) => void;
}

const Map: React.FC<MapProps> = ({ coords, addCoords, addDistance, totalDist, updateTotalDistance, addElevation, updateRoutePoints }) => {
  const [center, setCenter] = useState<LngLatLike | undefined>([-122.65, 45.5]);
  const [zoom, setZoom] = useState<number>(10.12);
  const mapRef: any = useRef();
  const mapContainerRef: any = useRef();

  const [allElev, setAllElev] = useState<number[]>([]);


  //===========================================================================
  //renders map, allows movement
  //===========================================================================
  useEffect(() => {
    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/satellite-streets-v12',
      center: center,
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


  //=====================================================================================
  //adds coordinates to state on click
  //=====================================================================================
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.on('click', (e: mapboxgl.MapMouseEvent) => {
        const lngLat: LatLng = {
          lat: e.lngLat.lat,
          lng: e.lngLat.lng
        };

        console.log("lngLat: ", lngLat)

        addCoords(lngLat);

      });
    }
  }, []);

  //======================================================================================
  //creates markers and routes on map when coords change
  //======================================================================================
  useEffect(() => {
    const markers = coords.map(coord =>
      new mapboxgl.Marker({ color: '#FF6542' })
        .setLngLat([coord.lng, coord.lat])
        .addTo(mapRef.current)
    );

    if (coords.length > 1) {
      const directionsClient = MapboxDirections({ accessToken: mapboxgl.accessToken });
      const points = coords.map((coord) => ({
        coordinates: [coord.lng, coord.lat] // Ensure coordinates is a tuple
      }));

      directionsClient
        .getDirections({
          profile: 'cycling',
          waypoints: points as DirectionsWaypoint[],
          geometries: 'geojson',
        })
        .send()
        .then((response: any) => {

          const route = response.body.routes[0].geometry;
          const distance = response.body.routes[0].distance;
          updateTotalDistance(parseFloat(distance.toFixed(3)));

          const routeElevations = route.coordinates.map((coord: LngLatLike) => {
            const elev = mapRef.current.queryTerrainElevation(coord);
            return parseFloat(elev.toFixed(3))
          })

          if (routeElevations !== null) {

            const newElevs = routeElevations.slice(allElev.length);

            const newElevsObj: ElevsObj = {};

            for (let i = 0; i < newElevs.length; i++) {
              newElevsObj[i] = newElevs[i];
            }

            if (newElevs.length > 0) {
              addElevation(newElevsObj);
            }

          } else {
            console.log("No elevation data available")
          }

          setAllElev(routeElevations);

          updateRoutePoints(routeElevations.length)

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
      setAllElev([]);
      updateRoutePoints(allElev.length)
    } else {
      setAllElev([]);
      updateRoutePoints(allElev.length)
    }

    return () => {
      markers.forEach(marker => marker.remove());
    };

  }, [coords]);

  return (
    <div
      ref={mapContainerRef}
      className="w-full h-[calc(100vh-3.5rem)]"
    />
  );
};

export default Map;