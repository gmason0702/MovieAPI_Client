import React, { useEffect, useState } from "react";

import "./App.css";

//component import
import SignInOutContainer from "./components/auth/indexs";
import HomePage from "./components/home/HomePage";


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

  return <div className="App">{protectedViews()}</div>;
}


export default App;
