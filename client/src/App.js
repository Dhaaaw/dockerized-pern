import React from "react";
import { Switch, Route, Link, BrowserRouter } from "react-router-dom";

import Login from "./components/login";
import Register from "./components/register";
import SearchProfiles from "./components/searchProfiles";
import OwnProfile from "./components/ownProfile";
import OtherProfile from "./components/otherProfile";


import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <BrowserRouter>
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
    </BrowserRouter>
  );
}

export default App;
