import { useRouteError } from "react-router-dom";
export default function Error() {
  const error = useRouteError();
  return (
    <>
      <h1>Page not found.</h1>
      <p>{error.statusText}</p>
    </>
  );
}
