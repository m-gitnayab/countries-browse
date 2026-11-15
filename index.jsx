import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Home from "./components/Home";
import Error from "./components/ErrorPage";
import CountryDetail from "./components/CountryDetail";

const myRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/:country",
        element: <CountryDetail />,
      },
    ],
  },
]);

const root = createRoot(document.querySelector("#root"));
root.render(<RouterProvider router={myRouter} />);
