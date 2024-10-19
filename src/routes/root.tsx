import images from '../constants/logos.ts';
import Button from '../utilities/Button';
import sampleData from "../constants/sampleData.js";
import MapPost from '../components/MapPost.js';

const Root = () => {

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
      <div className="w-screen h-screen bg-black">
        <div className="w-full h-14 bg-secondary mb-4 px-4 py-2 flex flex-row">
          <img src={images.logo} alt="RouteDesigner logo" className="w-10 h-auto rounded-full" />
          <h1 className="text-white text-2xl font-bold px-2 py-1">RouteDesigner</h1>
          <Button
            text="Create"
            containerStyles="primary ml-auto"
            textStyles="white"
            handleClick={() => { console.log(typeof (images.logo)) }}
          />
        </div>
        <div className="grid grid-cols-4 gap-4 w-full h-fit bg-black px-4">
          <div className="rounded-lg bg-secondary">
            <p>01</p>
            <p>02</p>
            <p>03</p>
          </div>
          <div className="rounded-lg bg-black col-span-2">
            {mapPosts}
          </div>
          <div className="rounded-lg bg-secondary">03</div>
        </div>
      </div>
    </>
  )
}

export default Root;