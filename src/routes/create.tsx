import { useState, useEffect, useRef } from "react";
import Map from "../components/Map";
import Button from "../utilities/Button";
import SegmentDetails from "../components/SegmentDetails";
import RouteGraph from "../components/RouteGraph";
import { getRoutes, saveRoute } from "../../lib/firebase";
import { LatLng, ElevsObj, Route } from "../types/dataTypes"
import icons from "../constants/logos";
import MapOptions from "../components/MapOptions";
import { useAuth } from "../context/AuthContext";
import MapPost from "../components/MapPost";

const Create = () => {

  const { currentUser } = useAuth();

  const [route, setRoute] = useState<Route>({
    coords: [],
    distance: [],
    totalDistance: 0,
    elevations: [],
    points: 0,
    allElevations: [],
    totalClimb: 0
  })

  const [mapWidth, setMapWidth] = useState<number>(0);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [graphSeg, setGraphSeg] = useState<boolean>(true);
  const [detailsOrList, setDetailsOrList] = useState<boolean>(true);
  const [allUserRoutes, setAllUserRoutes] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const detailsRef: any = useRef()

  const getTotalClimb = (elevations: number[]) => {
    if (elevations.length < 2) return 0;

    let total = 0;

    for (let i = 1; i < elevations.length; i++) {
      if (elevations[i - 1] < elevations[i]) {
        const diff = elevations[i] - elevations[i - 1];
        total += diff
      }
    }
    return parseFloat(total.toFixed(3));
  }

  //======================================================================
  //Testing
  //======================================================================
  // useEffect(() => {
  // console.log("coords", route.coords)
  // console.log("distance", route.distance)
  // console.log("totalDistance", route.totalDistance)
  // console.log("elevations", route.elevations)
  // console.log("points", route.points)
  // console.log("allElevations", route.allElevations)
  // console.log("totalClimb", route.totalClimb)

  // }, [route.elevations])


  //========================================================================
  // Update allElevations and totalClimb when elevations changes
  //========================================================================
  useEffect(() => {

    const flatElevations = route.elevations.flatMap((elevObj) => Object.values(elevObj));

    setRoute((prevRoute) => ({
      ...prevRoute,
      allElevations: flatElevations,
      totalClimb: getTotalClimb(flatElevations)
    }))

  }, [route.elevations])


  //=============================================================================
  // Updates mapWidth when window size changes
  //=============================================================================
  useEffect(() => {
    if (detailsRef.current) {
      setMapWidth(detailsRef.current.offsetWidth)
    }

    const handleResize = () => {
      if (detailsRef.current) {
        setMapWidth(detailsRef.current.offsetWidth);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [])

  //==============================================================================
  //Fetches all user routes
  //==============================================================================

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const fetchedRoutes = await getRoutes();
        setAllUserRoutes(fetchedRoutes);
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false);
      }
    }

    fetchRoutes();
  }, [currentUser])


  //==============================================================================
  // route property update functions
  //==============================================================================
  const updateTotalDistance = (newTotal: number) => {

    setRoute((prevRoute) => ({
      ...prevRoute,
      totalDistance: newTotal
    }))
  }

  const addCoords = (lngLat: LatLng) => {
    setRoute((prevRoute) => ({
      ...prevRoute,
      coords: [...prevRoute.coords, lngLat]
    }))
  }

  const updateRoutePoints = (newPoints: number) => {
    setRoute((prevRoute) => ({
      ...prevRoute,
      points: newPoints
    }))
  }

  const removeLastCoord = () => {
    if (route.distance.length <= 1) {
      setRoute({
        ...route,
        elevations: [],
        totalDistance: 0
      })
    }

    setRoute((prevRoute) => ({
      ...prevRoute,
      coords: [...prevRoute.coords.slice(0, -1)],
      distance: [...prevRoute.distance.slice(0, -1)],
      elevations: [...prevRoute.elevations.slice(0, -1)],
    }))
  }

  const clearCoords = () => {
    setRoute({
      ...route,
      coords: [],
      distance: [],
      totalDistance: 0,
      elevations: []
    })
  }

  const addDistance = (dist: number) => {
    setRoute((prevRoute) => ({
      ...prevRoute,
      distance: [...prevRoute.distance, dist]
    }))
  }

  const addElevation = (elev: ElevsObj) => {
    setRoute((prevRoute) => ({
      ...prevRoute,
      elevations: [...prevRoute.elevations, elev]
    }))
  }

  //==========================================================================
  //UI Toggles
  //==========================================================================

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  }

  const toggleGraphSeg = () => {
    setGraphSeg(!graphSeg);
  }

  const toggleList = () => {
    if (!modalVisible) {
      setModalVisible(true);
    }

    setDetailsOrList(false);
  }

  const toggleDetails = () => {
    if (!modalVisible) {
      setModalVisible(true)
    }
    setDetailsOrList(true);
  }

  //==========================================================================
  //Map through user routes
  //==========================================================================

  const mapPosts = allUserRoutes.map((route, index) => {
    return (
      <div
        key={index}
        className="text-white border-b-2 border-secondary">
        <MapPost
          route={route}
          width={mapWidth} />
      </div>
    )
  })

  //===========================================================================
  // Save route to firestore 
  //===========================================================================
  const uploadRoute = async (routeData: Route) => {
    saveRoute(routeData)
  }

  return (
    <>
      <div className="relative h-[calc(100vh-3.5rem)]">
        <Map
          coords={route.coords}
          addCoords={addCoords}
          addDistance={addDistance}
          totalDist={route.totalDistance}
          updateTotalDistance={updateTotalDistance}
          addElevation={addElevation}
          updateRoutePoints={updateRoutePoints}
        />
        <div className="absolute top-0 left-0 ">
          <MapOptions
            showDetails={toggleDetails}
            showList={toggleList}
            detailsOrList={detailsOrList}
            modalVisible={modalVisible}
          />
          {detailsOrList ?
            <div
              className={`flex flex-col 
            rounded-lg 
            h-[calc(100vh-8.5rem)] max-h-fit
            text-white w-72 bg-black/95 
            px-4 m-2 
            transition-opacity duration-400
            ${modalVisible ? "opacity-100" : "opacity-0"}
            `}
              ref={detailsRef}
            >
              <button className="ml-auto mt-2" onClick={toggleModal}>
                <img src={icons.close} alt="Close modal" />
              </button>
              <h2 className="mb-2 text-2xl font-bold">Route details</h2>
              <div className="overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-track-black scrollbar-thumb-secondary">
                <div className="border-secondary border-4 rounded-lg p-2 mb-2">
                  <p className="text-md text-white/60">Total distance:</p>
                  <p className="text-lg font-semibold">{route.totalDistance} meters</p>
                </div>
                <div className="border-secondary border-4 rounded-lg p-2 mb-2">
                  <p className="text-md text-white/60">Total Elevation Gain:</p>
                  <p className="text-lg font-semibold">{route.totalClimb} meters</p>
                </div>
                <Button
                  text="Graph"
                  containerStyles={`${graphSeg ? "bg-primary" : "bg-black border-2 border-primary"} mb-2 w-24 ml-5 mr-2`}
                  textStyles="white"
                  handleClick={toggleGraphSeg}
                />
                <Button
                  text="Segments"
                  containerStyles={`${!graphSeg ? "bg-primary" : "bg-black border-2 border-primary"} mb-2 w-24`}
                  textStyles="white"
                  handleClick={toggleGraphSeg}
                />
                {graphSeg ?
                  <RouteGraph
                    allElevations={route.allElevations}
                    routePoints={route.points}
                    graphWidth={mapWidth}
                    graphHeight={200}
                  />
                  :
                  <SegmentDetails
                    distance={route.distance}
                    elevations={route.elevations} />
                }
              </div>
            </div>
            :
            <div
              className={`flex flex-col 
            rounded-lg 
            h-[calc(100vh-8.5rem)] max-h-fit
            text-white w-72 bg-black/95 
            px-4 m-2 
            transition-opacity duration-400
            ${modalVisible ? "opacity-100" : "opacity-0"}
            `}
              ref={detailsRef}
            >
              <button className="ml-auto mt-2" onClick={toggleModal}>
                <img src={icons.close} alt="Close modal" />
              </button>
              <h2 className="mb-2 text-2xl font-bold">Your routes</h2>
              <div className="overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-track-black scrollbar-thumb-secondary">
                {!loading && allUserRoutes.length > 0 ? mapPosts : <div>No routes saved yet</div>}
              </div>
            </div>
          }
        </div>
        <div
          className="flex flex-col 
          rounded-lg 
          text-white w-52 bg-black/95 
          p-4 m-2 
          absolute top-0 right-0 
          h-[calc(100vh-4.5rem)] max-h-fit">
          <Button
            text="Save route"
            containerStyles="bg-primary mb-2"
            textStyles="white"
            handleClick={() => uploadRoute(route)}
          />
          <Button
            text="Remove last point"
            containerStyles="bg-black border-2 border-primary mb-2"
            textStyles="white"
            handleClick={removeLastCoord}
          />
          <Button
            text="Clear all points"
            containerStyles="bg-black border-2 border-primary"
            textStyles="white"
            handleClick={clearCoords}
          />
        </div>
      </div>
    </>
  )
}

export default Create;