"use client";

import "@/app/dashboard.min.css";
import { handleLogin } from "@/utils/auth";
import axios from "axios";
import Script from "next/script";
import { useState } from "react";

const INITIAL_USER = {
  email: "",
  password: "",
};

export default function Login() {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(INITIAL_USER);
  const [rememberMe, setRememberMe] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  }
  // console.log(user);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError(null);
      setLoading(true);
      const url = `http://localhost:8080/api/auth/login`;
      const payload = { ...user };
      const response = await axios.post(url, payload);
      handleLogin(response.data.token, rememberMe);
      window.location.pathname = "/dashboard";
      // console.log(response.data);
    } catch (err) {
      // console.log(err.response.data.message);
      if (err.message === "Network Error") {
        setError("Network Error: Please check your internet connection.");
      }
      setError(err.response.data.message);
      // console.log(err);
      setTimeout(() => {
        setError(null);
      }, 5000);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-9 col-lg-12 col-xl-10">
            <div className="card shadow-lg o-hidden border-0 my-5">
              <div className="card-body p-0">
                <div className="row">
                  <div className="col-lg-6 d-none d-lg-flex">
                    <div
                      className="flex-grow-1 bg-login-image"
                      style={{
                        backgroundImage:
                          'url("/dashboard/assets/img/dogs/image3.jpeg")',
                      }}
                    />
                  </div>
                  <div className="col-lg-6">
                    <div className="p-5">
                      <div className="text-center">
                        <h4 className="text-dark mb-4">Welcome Back!</h4>
                      </div>
                      <form className="user mt-md-5" onSubmit={handleSubmit}>
                        {error && (
                          <div className="alert alert-danger" role="alert">
                            {error}
                          </div>
                        )}
                        <div className="mb-3">
                          <input
                            className="form-control form-control-user"
                            type="email"
                            id="email"
                            aria-describedby="emailHelp"
                            placeholder="Enter Email Address..."
                            name="email"
                            onChange={handleChange}
                          />
                        </div>
                        <div className="mb-3">
                          <input
                            className="form-control form-control-user"
                            type="password"
                            id="password"
                            placeholder="Password"
                            name="password"
                            onChange={handleChange}
                          />
                        </div>
                        <div className="mb-3">
                          <div className="custom-control custom-checkbox small">
                            <div className="form-check">
                              <input
                                className="form-check-input custom-control-input"
                                type="checkbox"
                                id="formCheck-1"
                                name="rememberMe"
                                onChange={() => setRememberMe(!rememberMe)}
                              />
                              <label
                                className="form-check-label custom-control-label"
                                htmlFor="formCheck-1"
                              >
                                Remember Me
                              </label>
                            </div>
                          </div>
                        </div>
                        <button
                          className="btn btn-primary d-block btn-user w-100 my-md-5"
                          type="submit"
                        >
                          {(loading && (
                            <div
                              className="spinner-border spinner-border-sm"
                              role="status"
                            >
                              <span className="visually-hidden">
                                Loading...
                              </span>
                            </div>
                          )) ||
                            "Login"}
                        </button>
                        <hr />
                      </form>
                      <div className="text-center mt-md-5">
                        <a className="small" href="/reset">
                          Forgot Password?
                        </a>
                      </div>
                      <div className="text-center mb-md-5">
                        <a className="small" href="/signup">
                          Create an Account!
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Script defer src="/dashboard/assets/bootstrap/js/bootstrap.min.js" />
      <Script defer src="/dashboard/assets/js/bs-init.js" />
      <Script defer src="/dashboard/assets/js/theme.js" />
    </>
  );
}
