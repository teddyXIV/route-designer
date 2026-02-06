import { Outlet, Link } from "react-router-dom";
import icons from "../constants/logos.ts";

const Root = () => {
  // const [user, setUser] = useState<boolean>(false)



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

      </header>

      <main className="w-full h-fit">
        <Outlet />
      </main>
    </div>
  );
};

export default Root;
