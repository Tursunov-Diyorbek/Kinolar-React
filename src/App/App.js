import React, { useState } from "react";
import "./App.css";
import "../Style/style.css";
import { Routes, Route, Navigate, Router } from "react-router-dom";
import { ContextApi, api } from "../Api";
import { QueryClient, QueryClientProvider } from "react-query";
import { Movie } from "../Companents/Movie/movie";
import { UserRegistr } from "../usersLogin/userRegistr";
import { UserLogin } from "../usersLogin/userLogin";
import { AuthProvider } from "react-auth-kit";
import { Movies } from "../Companents/Movies/movies";
import { SearchMovies } from "../Companents/Movie/search";
import { ContextSearch } from "../Contex/context";
import { FilterKinolar } from "../Companents/Movie/filterKinolar";
import AuthProtectedRoute from "../auth/auth-protected";

const queryClient = new QueryClient({});

function App() {
  const [searchMovies, setSearchMovies] = useState("");

  const tok = localStorage.getItem("tokens");

  return (
    <AuthProvider
      authType={"cookie"}
      authName={"_auth"}
      cookieDomain={window.location.hostname}
      cookieSecure={
        window.location.protocol === "https://last-movies-beckend.onrender.com/"
      }
    >
      <QueryClientProvider client={queryClient}>
        <ContextApi.Provider value={{ api }}>
          <ContextSearch.Provider value={{ searchMovies, setSearchMovies }}>
            <Routes>
              {/*AUTH*/}

              {/* <Route
                path=""
                element={tok ? <Movies /> : <Navigate to="/auth" />}
              />
              <Route
                path="auth"
                element={<AuthProtectedRoute allowed={!tok} redirectURL="/" />}
              >
                <Route path={"kirish"} element={<UserLogin />}></Route>
                <Route path={"royxatdan-otish"} element={<UserRegistr />} />
                <Route
                  path="*"
                  index
                  element={<Navigate to="/auth/kirish" />}
                />
              </Route> */}
              <Route path="/" element={<Movies />} />

              {/*Movies*/}

              <Route path={"/:movie"} element={<Movie />}></Route>
              <Route path={"/qidiruv"} element={<SearchMovies />}></Route>
              <Route
                path={"/filter/:filterFilms"}
                element={<FilterKinolar />}
              ></Route>
            </Routes>
          </ContextSearch.Provider>
        </ContextApi.Provider>
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
