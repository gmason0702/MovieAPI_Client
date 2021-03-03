// adding css to jsx is that easy
import './App.css'; // This pattern is preferred where css for this component has a matching .css filename
import React, { useEffect, useState } from "react";
// A component import
import Navbar from './components/Navbar';
import SignInOutContainer from './components/auth/indexs';
import Homepage from './components/Home/homepage';


// Defining our <App /> component the function name matches the file name
function App() {
  const [sessionToken,setSessionToken] = useState('');
  
  useEffect(() => {
    if (localStorage.getItem('token')){
      setSessionToken(localStorage.getItem('token'));
    }
  },[]);
  const updateToken = (newToken) => {
    localStorage.setItem('token', newToken);
    setSessionToken(newToken);
    console.log(sessionToken);
  };
  const clearToken = () => {
    localStorage.clear();
    setSessionToken("");
  };
  const protectedViews = () => {
    return sessionToken === localStorage.getItem("token") ? (
      <Homepage token={sessionToken} />
    ) : (
      <SignInOutContainer updateToken={updateToken} />
    );
  };

      // All functional components need to return jsx with one parent element
      return  ( 
    <div className="App"> {/* Parent Element. Also we can't use the word class, so we use className in jsx*/}
      {/* Navbar is our imported component*/}
      <Navbar logout = {clearToken}/>
      {protectedViews()}
    </div>
  );
 }

// Makes our Component available for import
export default App;