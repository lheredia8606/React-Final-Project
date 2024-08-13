import { createBrowserRouter } from "react-router-dom";
import { Home } from "../Components/Home/Home";
import { Login } from "../Components/Login/Login";
import { About } from "../Components/About.tsx/About";
import { UserPage } from "../Components/UserPage/UserPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <h2>someError in route url</h2>,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/userPage/:id",
        element: <UserPage />,
      },
    ],
  },
]);
