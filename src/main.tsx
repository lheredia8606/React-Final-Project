import React from "react";
import ReactDOM from "react-dom/client";
import "../src/Styles/global.css";
import { Home } from "./Components/Home";
import { UserProvider } from "./Providers/UserProvider";
import { MedicationProvider } from "./Providers/MedicationProvider";
import { QueryClient, QueryClientProvider } from "react-query";
import { Login } from "./Components/Login/Login";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <MedicationProvider>
          <Home>
            <Login />
          </Home>
        </MedicationProvider>
      </UserProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
