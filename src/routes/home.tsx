import { dummyMapData } from "../constants/sampleData.js";
import MapPost from '../components/MapPost.js';
import { Link } from "react-router-dom";

const Home = () => {
  const mapPosts = dummyMapData.map(post => {
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

  return (
    <>
      <div className="rounded-lg bg-secondary p-4 text-white">
        <p>01</p>
        <p>02</p>
        <p>03</p>
      </div>
      <div className="rounded-lg bg-black col-span-2">
        {mapPosts}
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