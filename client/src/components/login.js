import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import validationFunctions from "./validationFunctions";
import axios from "axios";

const Login = (props) => {
  const { connectedUser } = props;

  const form = useRef();
  const checkBtn = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const login = async (email, password) => {
    return await axios
      .post(window.location.origin + "/api/auth/signin", {
        email,
        password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      login(email, password)
        .then(
          () => {
            window.location.reload();
          },
          (error) => {
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();

            setLoading(false);
            setMessage(resMessage);
          }
        )
        .catch((err) => {
          console.log(err);
        });
    } else {
      setLoading(false);
    }
  };

  return (
    <>
      {connectedUser ? (
        "You can't access this page while logged in !"
      ) : (
        <>
          <div className="p-5 text-center bg-light">
            <h1 className="mb-3">Login Page</h1>
            <h4 className="mb-3">Enter your credentials</h4>
          </div>
          <div className="d-flex align-items-center justify-content-center">
            <div className="card card-container col-6">
              <Form onSubmit={handleLogin} ref={form}>
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
                  <label htmlFor="password">Password</label>
                  <Input
                    type="password"
                    className="form-control"
                    name="password"
                    value={password}
                    onChange={onChangePassword}
                    validations={[validationFunctions.required]}
                  />
                </div>

                <div className="form-group row justify-content-center">
                  <button
                    className="btn btn-primary btn-block col-6"
                    disabled={loading}
                  >
                    {loading && (
                      <span className="spinner-border spinner-border-sm"></span>
                    )}
                    <span>Login</span>
                  </button>
                </div>

                {message && (
                  <div className="form-group">
                    <div className="alert alert-danger" role="alert">
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

export default Login;
