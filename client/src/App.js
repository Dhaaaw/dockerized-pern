import React, {useState, useEffect} from "react";
import { Switch, Route, Link, BrowserRouter, Redirect } from "react-router-dom";

import Login from "./components/login";
import Register from "./components/register";
import SearchProfiles from "./components/searchProfiles";
import OwnProfile from "./components/ownProfile";
import OtherProfile from "./components/otherProfile";


import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [currentUser, setCurrentUser] = useState(undefined);

  const logout = () => {
    localStorage.removeItem("user");
  };

  const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
  };

  useEffect(() => {
    const user = getCurrentUser();

    if (user) setCurrentUser(user);
  }, []);

  return (
    <BrowserRouter>
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
          Dockerized PERN
        </Link>
        {currentUser && (
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                Profile
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/search"} className="nav-link">
                Browse profiles
              </Link>
            </li>
          </div>
        )}

        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {currentUser.username}
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

      <div className="d-flex align-items-center justify-content-center">
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/profile" component={OwnProfile} />
          <Route exact path="/profile/:id" component={OtherProfile} />
          <Route exact path="/search" component={SearchProfiles} />
        </Switch>
        {currentUser ?
        <Redirect to="/profile"/> 
        : 
        <Redirect to="/login"/> 
        }
      </div>
    </div>
    </BrowserRouter>
  );
};

export default App;