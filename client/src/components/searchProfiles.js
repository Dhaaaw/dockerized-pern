import React, { useState, useEffect } from "react";
import axios from "axios";

const SearchProfiles = (props) => {
  const { connectedUser } = props;

  const [users, setUsers] = useState([]);
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const onSearchChange = (event) => {
    let { value } = event.target;
    setSearchValue(value);
  };

  const grabSearchUsers = async () => {
    if (searchValue)
      await axios
        .get(window.location.origin + "/api/user/" + searchValue)
        .then((response) => setSearchedUsers(response.data))
        .catch((err) => {
          console.log(err);
        });
    else setSearchedUsers(users);
  };

  const grabAllUsers = async () => {
    return await axios.get(window.location.origin + "/api/user");
  };

  const listUsers = () => {
    return (
      <>
        {searchedUsers.map((element, index) => {
          return (
            <>
              <li key={index}>
                <div className="row">
                  <div className="col ml-auto mr-auto" lg="3" md="4" xs="4">
                    {element.username}
                  </div>
                  <div className=" col ml-auto mr-auto" lg="9" md="8" xs="8">
                    <h6>
                      <small>{element.userlastname}</small>
                    </h6>
                  </div>
                  <div className=" col ml-auto mr-auto" lg="9" md="8" xs="8">
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={() =>
                        (window.location = "/profile/" + element.id)
                      }
                    >
                      Check profile
                    </button>
                  </div>
                </div>
              </li>
              <hr />
            </>
          );
        })}
      </>
    );
  };

  useEffect(() => {
    grabAllUsers()
      .then((response) => {
        setUsers(response.data);
        setSearchedUsers(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      {connectedUser ? (
        <>
          <div className="p-5 text-center bg-light">
            <h1 className="mb-3">
              This is the page where you search for other people !
            </h1>
            <div className="input-group col-6">
              <input
                type="text"
                className="form-control"
                value={searchValue}
                onChange={onSearchChange}
                placeholder="Search by name"
              />
              <div className="input-group-append">
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={grabSearchUsers}
                >
                  Search !
                </button>
              </div>
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-center">
            <div className="col-6">{listUsers()}</div>
          </div>
        </>
      ) : (
        "You can't access this page while logged out !"
      )}
    </>
  );
};

export default SearchProfiles;
