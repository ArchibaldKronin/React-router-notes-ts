import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  let errorJSX: JSX.Element;

  if (isRouteErrorResponse(error)) {
    errorJSX = (
      <p>
        <i>{`${error.status}: ${error.statusText}`}</i>
      </p>
    );
  } else if (error instanceof Error) {
    errorJSX = (
      <p>
        <i>{`${error.name}: ${error.message}`}</i>
      </p>
    );
  } else if (typeof error === "string") {
    errorJSX = (
      <p>
        <i>{error}</i>
      </p>
    );
  } else {
    errorJSX = (
      <p>
        <i>{"Unknown error"}</i>
      </p>
    );
  }

  return (
    <div id="error-page">
      <h1>Something went wrong</h1>
      <p>Unexpected error has occurred</p>
      {errorJSX}
    </div>
  );
}
