import { useRouteError, Link } from "react-router-dom";
import images from './constants/logos.ts';

type RouteError = {
  status?: number;
  statusText?: string;
  message?: string;
  stack?: string;
}
const ErrorPage = () => {
  const error = useRouteError() as RouteError;
  console.error(error);

  return (
    <div className="w-screen h-screen bg-black overflow-x-hidden scrollbar scrollbar-track-secondary scrollbar-thumb-tertiary">
      <div className="w-full h-14 bg-secondary mb-4 px-4 py-2 flex flex-row">
        <Link to='/' className="flex flex-row">
          <img src={images.logo} alt="RouteDesigner logo" className="w-10 h-auto rounded-full" />
          <h1 className="text-white text-2xl font-bold px-2 py-1">RouteDesigner</h1>
        </Link>
      </div>
      <div className="bg-black text-white h-screen flex flex-col justify-center items-center">
        <h1 className="text-primary text-4xl font-bold mb-4">Oops!</h1>
        <p className="text-lg mb-2">
          Sorry, an unexpected error has occurred.
        </p>
        <p className="text-base italic">
          {error.statusText || error.message}
        </p>
      </div>
    </div>
  )
}

export default ErrorPage;