import { useState, useEffect } from "react";
import Map from "../components/Map";
import Button from "../utilities/Button";
import SegmentDetails from "../components/SegmentDetails";
import RouteGraph from "../components/RouteGraph";
import { getRoutes, createRoute, updateRoute } from "../../lib/firebase";
import { LatLng, ElevsObj, Route } from "../types/dataTypes"
import MapOptions from "../components/MapOptions";
import { useAuth } from "../context/AuthContext";
import MapPost from "../components/MapPost";
import ModalContainer from "../components/ModalContainer";
import { Link } from "react-router-dom";

const Create = () => {

  const { currentUser } = useAuth();

  const emptyRoute = {
    coords: [],
    distance: [],
    totalDistance: 0,
    elevations: [],
    points: 0,
    allElevations: [],
    totalClimb: 0
  }

  const [route, setRoute] = useState<Route>(emptyRoute)

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [graphSeg, setGraphSeg] = useState<boolean>(true);
  const [detailsOrList, setDetailsOrList] = useState<boolean>(true);
  const [allUserRoutes, setAllUserRoutes] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [savedMapView, setSavedMapView] = useState<boolean>(false);
  const [savedRoute, setSavedRoute] = useState<Route>(emptyRoute);
  const [routeId, setRouteId] = useState<string>("");

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
  }, [currentUser, loading])


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

  const loopIt = () => {
    if (route.coords.length > 0) {
      const firstCoord = route.coords[0];

      setRoute((prevRoute) => ({
        ...prevRoute,
        coords: [...prevRoute.coords, firstCoord]
      }))
    }
  }

  //=========================================================================
  //Update entire route object
  //=========================================================================

  const updateFullRoute = (selectedRoute: Route) => {
    setRoute(selectedRoute)
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

  const routePlaceholder = currentUser ?
    <div className="text-lg font-semibold p-2">No routes saved yet.</div>
    :
    <div className="text-lg font-semibold p-2">
      <Link to="/signin" className="underline text-primary">Sign in</Link> to view and save your routes.
    </div>

  //==========================================================================
  //Map through user routes
  //==========================================================================

  const mapPosts = allUserRoutes.map((route) => {
    return (
      <button className="text-white rounded-lg hover:bg-secondary"
        key={route.id}
        onClick={() => {
          updateFullRoute(route.route)
          setSavedMapView(true)
          setSavedRoute(route.route)
          setRouteId(route.id)
        }}
      >
        <MapPost
          route={route.route}
          width={310}
        />
      </button>
    )
  })

  //===========================================================================
  // Save/update route in firestore 
  //===========================================================================

  const uploadRoute = async (routeData: Route) => {
    if (route.coords.length > 1) {
      if (routeId == "") {
        createRoute(routeData)
      } else {
        console.log("Saving existing route")
        updateRoute(routeId, routeData)
        //function for updating an existing route
      }
      setLoading(true);
    }
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
            <ModalContainer modalVisible={modalVisible} toggleModal={toggleModal} header="Route details">
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
                  graphWidth={310}
                  graphHeight={200}
                />
                :
                <SegmentDetails
                  distance={route.distance}
                  elevations={route.elevations} />
              }
            </ModalContainer>
            :
            <ModalContainer modalVisible={modalVisible} toggleModal={toggleModal} header="Your routes">
              {!loading && allUserRoutes.length > 0 ? mapPosts : routePlaceholder}
            </ModalContainer>
          }
        </div>
        <div
          className="flex flex-col 
          rounded-lg 
          text-white w-52 bg-black/95 
          p-2 m-2 
          absolute top-0 right-0 
          h-fit">
          <Button
            text={`${savedMapView ? "Update" : "Save"} route`}
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
            containerStyles="bg-black border-2 border-primary mb-2"
            textStyles="white"
            handleClick={clearCoords}
          />
          <Button
            text="Loop it"
            containerStyles="bg-primary"
            textStyles="white"
            handleClick={loopIt}
          />
          {savedMapView ?
            <>
              <Button
                text="Undo changes"
                containerStyles="bg-primary mt-2"
                textStyles="white"
                handleClick={() => updateFullRoute(savedRoute)}
              />
              <Button
                text="New route"
                containerStyles="bg-primary mt-2"
                textStyles="white"
                handleClick={() => {
                  updateFullRoute(emptyRoute);
                  setSavedRoute(emptyRoute);
                  setSavedMapView(false);
                  setRouteId("");
                }}
              />
            </>
            :
            null
          }
        </div>
      </div>
    </>
  )
}

export default Create;