import React from "react";
import "./App.css";
import "./Style/style.css";
import { Routes, Route } from "react-router-dom";
import { Menu } from "./Companents/Menu/menu";
import { AdminPassword } from "./Companents/AdminPanel/adminPassword";
import { api, ContextApi } from "./Api";
import { QueryClient, QueryClientProvider } from "react-query";
import { Movie } from "./Companents/Movie/movie";
import { AdminPanel } from "./Companents/AdminPanel/adminPanel";

const queryClient = new QueryClient({});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ContextApi.Provider value={api}>
        <Routes>
          <Route path={"/"} element={<Menu />}></Route>
          <Route path={"/kinoadminpanel"} element={<AdminPassword />}></Route>
          <Route
            path={"/kinoadminpanel/kirildi"}
            element={<AdminPanel />}
          ></Route>
          <Route path={"/:movie/:id"} element={<Movie />}></Route>
        </Routes>
      </ContextApi.Provider>
    </QueryClientProvider>
  );
}

export default App;
