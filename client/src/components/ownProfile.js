import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import validationFunctions from "./validationFunctions";
import axios from "axios";

const OwnProfile = (props) => {
  const { connectedUser } = props;

  const form = useRef();
  const checkBtn = useRef();

  const [profileData, setProfileData] = useState({});
  const [profileChanges, setProfileChanges] = useState({
    username: connectedUser?.username || "",
    userlastname: connectedUser?.userlastname || "",
    email: connectedUser?.email || "",
    dateofbirth: connectedUser?.dateofbirth || "",
    password: "",
  });
  const [editState, setEditState] = useState(true);
  const [message, setMessage] = useState("");
  const [successful, setSuccessful] = useState(false);

  const resetValue = (field) => {
    const obj = { ...profileChanges, [field]: connectedUser[field] };
    setProfileChanges(obj);
  };

  const onFormChange = (event) => {
    let { name, value } = event.target;
    setProfileChanges({ ...profileChanges, [name]: value });
  };

  const updateProfile = async () => {
    return await axios.post(window.location.origin + "/api/auth/signup", {});
  };

  const handleEdit = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    //form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
      updateProfile()
        .then(
          (response) => {
            setMessage(response.data.message);
            setSuccessful(true);
          },
          (error) => {
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();

            setMessage(resMessage);
            setSuccessful(false);
          }
        )
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      {connectedUser ? (
        <>
          <div className="p-5 text-center bg-light">
            <h1 className="mb-3">This is your profile page</h1>
            <button
              className="btn btn-secondary btn-block col-md-3"
              onClick={() => setEditState(!editState)}
            >
              {editState
                ? "Click here to edit your profile"
                : "Click here to exist editing state"}
            </button>
          </div>
          <div className="d-flex align-items-center justify-content-center">
            <div className="card card-container col-6">
              <Form onSubmit={handleEdit} ref={form}>
                {!successful && (
                  <div>
                    <div className="input-group ">
                      <label className="col-3" htmlFor="email">
                        Email :{" "}
                      </label>
                      <Input
                        type="text"
                        className="form-control"
                        name="email"
                        disabled={editState}
                        value={profileChanges.email}
                        onChange={onFormChange}
                        validations={[validationFunctions.validEmail]}
                      />
                      <div className="input-group-append col-3 ">
                        <button
                          className="btn btn-outline-secondary"
                          type="button"
                          disabled={editState}
                          onClick={() => resetValue("email")}
                        >
                          Reset
                        </button>
                      </div>
                    </div>

                    <div className="input-group">
                      <label htmlFor="username" className="col-3">
                        Name :{" "}
                      </label>
                      <Input
                        type="text"
                        className="form-control"
                        name="username"
                        disabled={editState}
                        value={profileChanges.username}
                        onChange={onFormChange}
                        validations={[validationFunctions.validNameAndLastName]}
                      />
                      <div className="input-group-append">
                        <button
                          className="btn btn-outline-secondary"
                          type="button"
                          disabled={editState}
                          onClick={() => resetValue("username")}
                        >
                          Reset
                        </button>
                      </div>
                    </div>

                    <div className="input-group">
                      <label htmlFor="userlastname" className="col-3">
                        Last Name :{" "}
                      </label>
                      <Input
                        type="text"
                        className="form-control"
                        name="userlastname"
                        disabled={editState}
                        value={profileChanges.userlastname}
                        onChange={onFormChange}
                        validations={[validationFunctions.validNameAndLastName]}
                      />
                      <div className="input-group-append">
                        <button
                          className="btn btn-outline-secondary"
                          type="button"
                          disabled={editState}
                          onClick={() => resetValue("userlastname")}
                        >
                          Reset
                        </button>
                      </div>
                    </div>

                    <div className="input-group">
                      <label htmlFor="birthday" className="col-3">
                        Date of birth :{" "}
                      </label>
                      <div>
                        <Input
                          type="date"
                          className="form-control"
                          name="dateofbirth"
                          disabled={editState}
                          value={connectedUser?.dateofbirth}
                          onChange={onFormChange}
                          validations={[validationFunctions.validDate]}
                        />
                      </div>
                      <div className="input-group-append">
                        <button
                          className="btn btn-outline-secondary"
                          type="button"
                          disabled={editState}
                          onClick={() => resetValue("dateofbirth")}
                        >
                          Reset
                        </button>
                      </div>
                    </div>

                    <div className="input-group">
                      <label htmlFor="password" className="col-3">
                        New password ? :{" "}
                      </label>
                      <Input
                        type="password"
                        className="form-control"
                        name="password"
                        disabled={editState}
                        value={profileChanges.password}
                        onChange={onFormChange}
                        validations={[validationFunctions.validPassword]}
                      />
                    </div>

                    <div className="form-group">
                      <button
                        className="btn btn-success btn-block col-md-12"
                        disabled={editState}
                      >
                        Save changes
                      </button>
                    </div>
                  </div>
                )}

                {message && (
                  <div className="form-group">
                    <div
                      className={
                        successful
                          ? "alert alert-success"
                          : "alert alert-danger"
                      }
                      role="alert"
                    >
                      {message}
                    </div>
                  </div>
                )}
                <CheckButton style={{ display: "none" }} ref={checkBtn} />
              </Form>
            </div>
          </div>
        </>
      ) : (
        "You can't access this page while logged out !"
      )}
    </>
  );
};

export default OwnProfile;
