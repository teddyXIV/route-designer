import { dummyMapData } from "../constants/sampleData.js";
// import MapPost from '../components/MapPost.js';
import { Link } from "react-router-dom";
// import { getRoutes } from "../../lib/firebase.js";
// import { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext.js";

const Home = () => {
  // const [routes, setRoutes] = useState<any[]>([]);
  // const [loading, setLoading] = useState<boolean>(true);
  // const [error, setError] = useState<string | null>(null)
  // const [listWidth, setListWidth] = useState<number>(0);

  const { currentUser } = useAuth();
  // const routeListRef: any = useRef();

  // useEffect(() => {
  //   if (routeListRef.current) {
  //     setListWidth(routeListRef.current.offsetWidth)
  //   }

  //   const handleResize = () => {
  //     if (routeListRef.current) {
  //       setListWidth(routeListRef.current.offsetWidth)
  //     }
  //   };

  //   window.addEventListener('resize', handleResize);
  //   return () => window.removeEventListener('resize', handleResize);
  // }, [])

  console.log("currentUser: ", currentUser)

  // useEffect(() => {
  //   const fetchRoutes = async () => {
  //     try {
  //       const fetchedRoutes = await getRoutes();
  //       setRoutes(fetchedRoutes);
  //     } catch (err) {
  //       console.error(err)
  //     } finally {
  //       setLoading(false);
  //     }
  //   }

  //   fetchRoutes();
  // }, [currentUser])

  // useEffect(() => {
  //   console.log("ROUTES: ", routes)
  // }, [routes])

  const dummyPosts = dummyMapData.map(post => {
    return (
      <div key={post.id}>
        <p>LOADING</p>
      </div>
    )
  })

  // const mapPosts = routes.map((route, index) => {
  //   return (
  //     <div
  //       key={index}
  //       className="text-white">
  //       <MapPost
  //         route={route}
  //         width={listWidth} />
  //     </div>
  //   )
  // })

  return (
    <>
      <div className="rounded-lg bg-secondary p-4 text-white">
        <p>01</p>
        <p>02</p>
        <p>03</p>
      </div>
      <div className="rounded-lg bg-black col-span-2"
      // ref={routeListRef}
      >
        {dummyPosts}
      </div>
      <div className="rounded-lg bg-secondary p-4 text-white">
        <button className="rounded-lg justify-center items-center px-2 py-1 bg-primary ml-auto">
          <Link to="/create">
            <p
              className="text-lg text-white">
              Create
            </p>
          </Link>
        </button>
      </div>
    </>
  )
}

export default Home;