import images from '../constants/logos.ts';
import { Outlet, Link } from "react-router-dom";
import Button from '../utilities/Button.tsx';
import { logOut } from '../../lib/firebase.ts';
import { useAuth } from '../context/AuthContext.tsx';
import { useEffect } from 'react';

const Root = () => {
  // const [user, setUser] = useState<boolean>(false)

  const { currentUser } = useAuth();

  useEffect(() => {
    console.log(currentUser)

  }, [currentUser])

  return (
    <div className="w-screen h-screen bg-black overflow-x-hidden overflow-y-hidden ">
      {/* Navbar */}
      <header className="h-14 bg-black flex items-center px-4">
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
            containerStyles="bg-black border-2 border-primary mb-2 mt-2 ml-auto"
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

      <main className="w-full h-fit">
        <Outlet />
      </main>
    </div>
  );
};

export default Root;
