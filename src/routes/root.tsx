// import images from '../constants/logos.ts';
// import { Outlet, Link } from "react-router-dom"

// const Root = () => {

//   return (

//     <div className="w-screen h-screen bg-black overflow-x-hidden scrollbar scrollbar-track-secondary scrollbar-thumb-tertiary">
//       <div className="w-full h-14 bg-secondary mb-4 px-4 py-2 flex flex-row">
//         <Link to='/' className="flex flex-row">
//           <img src={images.logo} alt="RouteDesigner logo" className="w-10 h-auto rounded-full" />
//           <h1 className="text-white text-2xl font-bold px-2 py-1">RouteDesigner</h1>
//         </Link>
//       </div>
//       <div className="grid grid-cols-4 gap-4 w-full h-screen bg-black px-4">
//         <Outlet />
//       </div>
//     </div>

//   )
// }

// export default Root;

import images from '../constants/logos.ts';
import { Outlet, Link } from "react-router-dom";

const Root = () => {
  return (
    <div className="w-screen h-screen bg-black overflow-x-hidden scrollbar scrollbar-track-secondary scrollbar-thumb-tertiary">
      {/* Navbar */}
      <header className="h-14 bg-secondary flex items-center px-4 mb-4">
        <Link to="/" className="flex items-center">
          <img
            src={images.logo}
            alt="RouteDesigner logo"
            className="w-10 h-auto rounded-full"
          />
          <h1 className="text-white text-2xl font-bold px-2">RouteDesigner</h1>
        </Link>
      </header>

      {/* Main Content */}

      <main className="w-full h-full grid grid-cols-4 gap-4 px-4">
        <Outlet />
      </main>
    </div>
  );
};

export default Root;
