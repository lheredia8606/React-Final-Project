import { createBrowserRouter } from "react-router-dom";
import { Home } from "../Components/Home/Home";
import { Login } from "../Components/Login/Login";
import { About } from "../Components/About.tsx/About";
import { UserPage } from "../Components/UserPage/UserPage";
import MedsTable from "../Components/Tables/UserMedication/UserMedTable";
import { UserProfile } from "../Components/UserPage/UserProfile/UserProfile";
import { CurrentUserProfile } from "../Components/UserPage/UserProfile/CurrentUserProfile";

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
        children: [
          {
            path: "/userPage/:id/myMeds",
            element: <MedsTable user={null} />,
          },
          {
            path: "/userPage/:id/myProfile",
            element: <CurrentUserProfile />,
          },
          {
            path: "/userPage/:id/createUser",
            element: <UserProfile userProfile={{}} />,
          },
        ],
      },
    ],
  },
]);
