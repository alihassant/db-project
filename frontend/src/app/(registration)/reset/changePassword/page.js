"use client";

import "@/app/dashboard.min.css";
import axios from "axios";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { useEffect, useState } from "react";

const INITIAL_CHANGE_PASSWORD = {
  password: "",
  confirmPassword: "",
};

export default function ChangePassword() {
  const router = useRouter();
  const [token, setToken] = useState();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const resetToken = new URLSearchParams(window.location.search).get(
      "resetToken"
    );
    setToken(resetToken);
  }, []);

  const [error, setError] = useState();
  const [message, setMessage] = useState();
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState(INITIAL_CHANGE_PASSWORD);

  function handleChangePassword(e) {
    const { name, value } = e.target;
    setPassword((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError(null);
      setLoading(true);
      if (password.password !== password.confirmPassword) {
        setError("Passwords do not match.");
        return;
      }
      const url = `http://localhost:8080/api/auth/resetPassword`;
      const payload = { password: password.password, token };
      const response = await axios.post(url, payload);
      setMessage(response.data.message);
      setTimeout(() => {
        setMessage(null);
        router.push("/login");
      }, 3000);
    } catch (err) {
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
      {token && (
        <>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-9 col-lg-12 col-xl-10">
                <div className="card shadow-lg o-hidden border-0 my-5">
                  <div className="card-body  p-0">
                    <div className="row">
                      <div
                        className="col-lg-6 mh-100 d-none d-lg-flex"
                        style={{ height: "650px" }}
                      >
                        <div
                          className="flex-grow-1 bg-login-image"
                          style={{
                            backgroundImage:
                              'url("/dashboard/assets/img/dogs/image3.jpeg")',
                          }}
                        />
                      </div>
                      <div className="col-lg-6">
                        <div
                          className="row align-items-center p-5"
                          style={{ height: "100%" }}
                        >
                          <div className="text-center">
                            <h4 className="text-dark ">Reset Password!</h4>
                          </div>
                          <form className="user" onSubmit={handleSubmit}>
                            {error && (
                              <div className="alert alert-danger" role="alert">
                                {error}
                              </div>
                            )}
                            {message && (
                              <div className="alert alert-success" role="alert">
                                {message}
                              </div>
                            )}
                            <div className="mb-3">
                              <label className="form-label">New Password</label>
                              <input
                                className="form-control form-control-user"
                                type={(!showPassword && `password`) || `text`}
                                id="password"
                                placeholder="Enter Password..."
                                name="password"
                                onChange={handleChangePassword}
                              />
                            </div>
                            <div className="mb-3">
                              <label className="form-label">
                                Confirm Password
                              </label>
                              <input
                                className="form-control form-control-user"
                                type={(!showPassword && `password`) || `text`}
                                id="confirmPassword"
                                placeholder="Confirm Password..."
                                name="confirmPassword"
                                onChange={handleChangePassword}
                              />
                            </div>
                            <div className="mb-3">
                              <div className="custom-control custom-checkbox small">
                                <div className="form-check">
                                  <input
                                    className="form-check-input custom-control-input"
                                    type="checkbox"
                                    id="formCheck-1"
                                    name="showPassword"
                                    onChange={(e) =>
                                      setShowPassword(e.target.checked)
                                    }
                                  />
                                  <label
                                    className="form-check-label custom-control-label"
                                    htmlFor="formCheck-1"
                                  >
                                    Show Password
                                  </label>
                                </div>
                              </div>
                            </div>
                            {password.confirmPassword !== "" &&
                              password.password !==
                                password.confirmPassword && (
                                <p className="text-danger">
                                  Passwords do not match.
                                </p>
                              )}
                            <div className="text-center pt-md-5">
                              <a className="small" href="/reset">
                                Reset Again?
                              </a>
                            </div>
                            <div className="text-center ">
                              <a className="small" href="/login">
                                Already have an account? Login!
                              </a>
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
                                "Change Password"}
                            </button>
                            <hr />
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <Script defer src="/dashboard/assets/bootstrap/js/bootstrap.min.js" />
      <Script defer src="/dashboard/assets/js/bs-init.js" />
      <Script defer src="/dashboard/assets/js/theme.js" />
    </>
  );
}
