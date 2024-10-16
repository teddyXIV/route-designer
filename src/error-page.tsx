import { useRouteError } from "react-router-dom";

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
    <div>
      <h1>Oops!</h1>
      <p>
        Sorry, an unexpected error has occurred.
      </p>
      <p>
        <i>
          {error.statusText || error.message}
        </i>
      </p>
    </div>
  )
}

export default ErrorPage;