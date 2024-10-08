import React from "react";
import ReactDOM from "react-dom/client";
import "../src/Styles/global.css";
import { MedicationProvider } from "./Providers/MedicationProvider";
import { QueryClient, QueryClientProvider } from "react-query";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/router";
import { UsersMedsProvider } from "./Providers/UsersMedsProvider";
import { UserProvider } from "./Providers/userProvider/UserProvider";

export const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <MedicationProvider>
          <UsersMedsProvider>
            {<RouterProvider router={router} />}
          </UsersMedsProvider>
        </MedicationProvider>
      </UserProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
