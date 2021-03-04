import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";

import "./App.css";

// A component import
import MovieDetail from "./components/home/MovieDetail";
import Navbar from "./components/home/Navbar";
import SignInOutContainer from "./components/auth/indexs";
import HomePage from "./components/home/HomePage";
import Heading from "./components/home/Heading";

function App() {
  const [sessionToken, setSessionToken] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setSessionToken(localStorage.getItem("token"));
    }
  }, []);
  const updateToken = (newToken) => {
    localStorage.setItem("token", newToken);
    setSessionToken(newToken);
    console.log(sessionToken);
  };
  const clearToken = () => {
    localStorage.clear();
    setSessionToken("");
  };
  const protectedViews = () => {
    return sessionToken === localStorage.getItem("token") ? (
      <HomePage token={sessionToken} logout={clearToken} />
    ) : (
      <SignInOutContainer updateToken={updateToken} />
    );
  };

  // All functional components need to return jsx with one parent element
  return (
    <div className="App">
      {/* \<Heading logout={clearToken} /> */}
      {protectedViews()}
    </div>
  );
}


// Makes our Component available for import
export default App;
