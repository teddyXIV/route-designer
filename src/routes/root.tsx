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
import Button from '../utilities/Button.tsx';
import { logOut } from '../../lib/firebase.ts';
import { useAuth } from '../context/AuthContext.tsx';

const Root = () => {

  const { currentUser } = useAuth();



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
        {currentUser ?
          <Button
            text="Sign out"
            containerStyles="bg-secondary border-2 border-primary mb-2 mt-2 ml-auto"
            textStyles="white"
            handleClick={() => logOut()}
          />
          :
          <button className="rounded-lg justify-center items-center px-2 py-1 bg-primary ml-auto">
            <Link to="/signin">
              <p
                className="text-lg text-white">
                Sign in
              </p>
            </Link>
          </button>}
      </header>

      {/* Main Content */}

      <main className="w-full h-full grid grid-cols-4 gap-4 px-4">
        <Outlet />
      </main>
    </div>
  );
};

export default Root;
