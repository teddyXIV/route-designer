import { Outlet, Link } from "react-router-dom";
import Button from '../utilities/Button.tsx';
import { logOut } from '../../lib/firebase.ts';
import { useAuth } from '../context/AuthContext.tsx';
import icons from "../constants/logos.ts";
import { useState } from "react";
import ModalContainer from "../components/ModalContainer.tsx";

const Root = () => {
  // const [user, setUser] = useState<boolean>(false)
  const [menuVisible, setMenuVisible] = useState<boolean>(false)

  const { currentUser } = useAuth();

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  }

  return (
    <div className="w-screen h-screen bg-black overflow-x-hidden overflow-y-hidden ">
      <header className="h-14 bg-black flex items-center px-4">
        <Link to="/" className="flex items-center">
          <img
            src={icons.logo}
            alt="RouteDesigner logo"
            className="w-10 h-auto rounded-full"
          />
          <h1 className="text-white text-2xl font-bold px-2">RouteDesigner</h1>
        </Link>
        {currentUser ?
          <div className="flex flex-col ml-auto">
            <button className="ml-auto" onClick={() => setMenuVisible(true)}>
              <img src={icons.menu} alt="user icon" />
            </button>
            <ModalContainer modalVisible={menuVisible} toggleModal={toggleMenu} header="" >
              <div className="flex flex-col text-white absolute top-6">
                {/* <h1 className="text-white">1</h1>
                <h1 className="text-white">2</h1>
                <h1 className="text-white">3</h1>
                <h1 className="text-white">4</h1>
                <h1 className="text-white">5</h1>
                <h1 className="text-white">6</h1> */}
              </div>
            </ModalContainer>
          </div>
          // <Button
          //   text="Sign out"
          //   containerStyles="bg-black border-2 border-primary mb-2 mt-2 ml-auto"
          //   textStyles="white"
          //   handleClick={() => logOut()}
          // />
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

      <main className="w-full h-fit">
        <Outlet />
      </main>
    </div>
  );
};

export default Root;
