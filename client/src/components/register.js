import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import validationFunctions from "./validationFunctions";
import axios from "axios";

const Register = (props) => {
  const { connectedUser } = props;

  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [userlastname, setUserlastname] = useState("");
  const [email, setEmail] = useState("");
  const [dateofbirth, setDate] = useState("");
  const [password, setPassword] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const register = async () => {
    return await axios.post(window.location.origin + "/api/auth/signup", {
      email,
      dateofbirth,
      username,
      userlastname,
      password,
    });
  };

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangeUserlastname = (e) => {
    const userlastname = e.target.value;
    setUserlastname(userlastname);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangeDateofbirth = (e) => {
    const date = e.target.value;
    setDate(date);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      register()
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
        "You can't access this page while logged in !"
      ) : (
        <>
          <div className="p-5 text-center bg-light">
            <h1 className="mb-3">Registration Page</h1>
            <h4 className="mb-3">Enter your informations</h4>
          </div>
          <div className="d-flex align-items-center justify-content-center">
            <div className="card card-container col-6">
              <Form onSubmit={handleRegister} ref={form}>
                {!successful && (
                  <div>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <Input
                        type="text"
                        className="form-control"
                        name="email"
                        value={email}
                        onChange={onChangeEmail}
                        validations={[
                          validationFunctions.required,
                          validationFunctions.validEmail,
                        ]}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="username">Name</label>
                      <Input
                        type="text"
                        className="form-control"
                        name="username"
                        value={username}
                        onChange={onChangeUsername}
                        validations={[
                          validationFunctions.required,
                          validationFunctions.validNameAndLastName,
                        ]}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="userlastname">Last Name</label>
                      <Input
                        type="text"
                        className="form-control"
                        name="userlastname"
                        value={userlastname}
                        onChange={onChangeUserlastname}
                        validations={[
                          validationFunctions.required,
                          validationFunctions.validNameAndLastName,
                        ]}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="birthday">Date of birth</label>
                      <div>
                        <Input
                          type="date"
                          className="form-control"
                          value={dateofbirth}
                          onChange={onChangeDateofbirth}
                          validations={[
                            validationFunctions.required,
                            validationFunctions.validDate,
                          ]}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <Input
                        type="password"
                        className="form-control"
                        name="password"
                        value={password}
                        onChange={onChangePassword}
                        validations={[
                          validationFunctions.required,
                          validationFunctions.validPassword,
                        ]}
                      />
                    </div>

                    <div className="form-group">
                      <button className="btn btn-primary btn-block col-md-12">
                        Sign Up
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
      )}
    </>
  );
};

export default Register;
