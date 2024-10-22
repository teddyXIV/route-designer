import { dummyMapData } from "../constants/sampleData.js";
import MapPost from '../components/MapPost.js';
import Button from '../utilities/Button';

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
        <Button
          text="Create"
          containerStyles="bg-primary ml-auto"
          textStyles="white"
        />
      </div>
    </>
  )
}

export default Home;