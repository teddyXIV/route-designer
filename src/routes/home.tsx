import sampleData from "../constants/sampleData.js";
import MapPost from '../components/MapPost.js';

const Home = () => {
  const mapPosts = sampleData.map(post => {
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
      {mapPosts}
    </>
  )
}

export default Home;