import React, { useState } from "react";
import { Switch, Route, Link, BrowserRouter, Redirect } from "react-router-dom";

import Login from "./components/login";
import Register from "./components/register";
import SearchProfiles from "./components/searchProfiles";
import OwnProfile from "./components/ownProfile";
import OtherProfile from "./components/otherProfile";

import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  const logout = () => {
    localStorage.removeItem("user");
  };

  const updateCurrentUser = (newInfo) => {
    localStorage.setItem("user", JSON.stringify(newInfo));
    setCurrentUser(newInfo);
  };

  return (
    <BrowserRouter>
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            Dockerized PERN
          </Link>
          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}'s Profile
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/search"} className="nav-link">
                  Search Profiles
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={logout}>
                  Logout
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Register
                </Link>
              </li>
            </div>
          )}
        </nav>

        <div>
          <Switch>
            <Route
              exact
              path="/login"
              render={(props) => (
                <Login {...props} connectedUser={currentUser} />
              )}
            />
            <Route
              exact
              path="/register"
              render={(props) => (
                <Register {...props} connectedUser={currentUser} />
              )}
            />
            <Route
              exact
              path="/profile"
              render={(props) => (
                <OwnProfile
                  {...props}
                  connectedUser={currentUser}
                  updateCurrentUser={updateCurrentUser}
                />
              )}
            />
            <Route
              exact
              path="/profile/:id"
              render={(props) => (
                <OtherProfile {...props} connectedUser={currentUser} />
              )}
            />
            <Route
              exact
              path="/search"
              render={(props) => (
                <SearchProfiles {...props} connectedUser={currentUser} />
              )}
            />
            <Redirect from="*" to={currentUser ? "/profile" : "/login"} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
