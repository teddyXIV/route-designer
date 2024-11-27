import { dummyMapData } from "../constants/sampleData.js";
import MapPost from '../components/MapPost.js';
import { Link } from "react-router-dom";
import { getRoutes } from "../../lib/firebase.js";
import { useEffect, useState } from "react";

const Home = () => {
  const [routes, setRoutes] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const fetchedRoutes = await getRoutes();
        setRoutes(fetchedRoutes);
      } catch (err) {
        setError("Failed to fetch routes")
        console.error(err)
      } finally {
        setLoading(false);
      }
    }

    fetchRoutes();
  }, [])

  useEffect(() => {
    console.log("ROUTES: ", routes)
  }, [routes])

  const dummyPosts = dummyMapData.map(post => {
    return (
      <div key={post.id}>
        <MapPost
          image={post.image}
          title={post.title}
          distance={post.distance}
          elevation={post.elevation}
          difficulty={post.difficulty}
        />
      </div>
    )
  })

  const mapPosts = routes.map((route, index) => {
    return (
      <div
        key={index}
        className="text-white">
        <p>{route.totalDistance}</p>
      </div>
    )
  })

  return (
    <>
      <div className="rounded-lg bg-secondary p-4 text-white">
        <p>01</p>
        <p>02</p>
        <p>03</p>
      </div>
      <div className="rounded-lg bg-black col-span-2">
        {!loading && routes.length > 0 ? mapPosts : dummyPosts}
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