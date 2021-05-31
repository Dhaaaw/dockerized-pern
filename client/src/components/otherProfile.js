import React, { useState, useEffect } from "react";
import axios from "axios";

const OtherProfile = (props) => {
  const { connectedUser } = props;

  const [profileData, setProfileData] = useState({
    username: "",
    userlastname: "",
    email: "",
    dateofbirth: "",
  });

  return (
    <>
      {connectedUser ? (
        <>
          <div className="p-5 text-center bg-light">
            <h1 className="mb-3">
              This is {profileData.username}'s profile page !
            </h1>
          </div>
          <div className="d-flex align-items-center justify-content-center">
            <div className="card card-container col-6">
              <div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    className="form-control"
                    name="email"
                    disabled={true}
                    value={profileData.email}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="username">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="username"
                    disabled={true}
                    value={profileData.username}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="userlastname">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="userlastname"
                    disabled={true}
                    value={profileData.userlastname}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="birthday">Date of birth</label>
                  <div>
                    <input
                      type="date"
                      className="form-control"
                      disabled={true}
                      value={profileData.dateofbirth}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        "You can't access this page while logged out !"
      )}
    </>
  );
};

export default OtherProfile;
