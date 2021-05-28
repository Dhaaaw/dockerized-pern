import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import axios from "axios";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const validEmail = (value) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!re.test(String(value).toLowerCase())) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const validUsername = (value) => {
  if (value.length < 2 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 2 and 20 characters.
      </div>
    );
  }
};

const validUserlastname = (value) => {
  if (value.length < 2 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The last name must be between 2 and 20 characters.
      </div>
    );
  }
};

const validDate = (value) => {
  console.log(new Date(value) > new Date());
  if (new Date(value) > new Date()) {
    return (
      <div className="alert alert-danger" role="alert">
        Please enter a valid date
      </div>
    );
  }
};

const validPassword = (value) => {
  if (value.length < 5 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 5 and 40 characters.
      </div>
    );
  }
};

const Register = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [userlastname, setUserlastname] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [password, setPassword] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const register = async (email, username, userlastname, password) => {
    return await axios.post(window.location.origin + "/register", {
      email,
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
      register(username, email, password).then(
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
      );
    }
  };

  return (
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
                    validations={[required, validEmail]}
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
                    validations={[required, validUsername]}
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
                    validations={[required, validUserlastname]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="birthday">Date of birth</label>
                  <div>
                    <Input
                      type="date"
                      className="form-control"
                      value={date}
                      onChange={onChangeDateofbirth}
                      validations={[required, validDate]}
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
                    validations={[required, validPassword]}
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
                    successful ? "alert alert-success" : "alert alert-danger"
                  }
                  role="alert">
                  {message}
                </div>
              </div>
            )}
            <CheckButton style={{ display: "none" }} ref={checkBtn} />
          </Form>
        </div>
      </div>
    </>
  );
};

export default Register;
