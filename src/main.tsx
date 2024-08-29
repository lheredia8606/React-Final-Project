import React from "react";
import ReactDOM from "react-dom/client";
import "../src/Styles/global.css";
import { MedicationProvider } from "./Providers/MedicationProvider";
import { QueryClient, QueryClientProvider } from "react-query";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/router";
import { UsersMedsProvider } from "./Providers/UsersMedsProvider";
import { EraseMe } from "./Components/ToErase/EraseMe";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <MedicationProvider>
        <UsersMedsProvider>
          {
            <RouterProvider router={router} />
            //<EraseMe />
          }
        </UsersMedsProvider>
      </MedicationProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
