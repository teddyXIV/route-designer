import images from '../constants/logos.ts';
import { Outlet, Link } from "react-router-dom"

const Root = () => {

  return (

    <div className="w-screen h-screen bg-black overflow-x-hidden scrollbar scrollbar-track-secondary scrollbar-thumb-tertiary">
      <div className="w-full h-14 bg-secondary mb-4 px-4 py-2 flex flex-row">
        <Link to='/' className="flex flex-row">
          <img src={images.logo} alt="RouteDesigner logo" className="w-10 h-auto rounded-full" />
          <h1 className="text-white text-2xl font-bold px-2 py-1">RouteDesigner</h1>
        </Link>
      </div>
      <div className="grid grid-cols-4 gap-4 w-full h-fit bg-black px-4">
        <Outlet />
      </div>
    </div>

  )
}

export default Root;