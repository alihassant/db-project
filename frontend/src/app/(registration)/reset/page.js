"use client";

import "@/app/dashboard.min.css";
import axios from "axios";
import Script from "next/script";
import { useState } from "react";

const INITIAL_USER = {
  email: "",
};

export default function Reset() {
  const [error, setError] = useState();
  const [message, setMessage] = useState();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState(INITIAL_USER);

  function handleReset(e) {
    const { name, value } = e.target;
    setEmail((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError(null);
      setLoading(true);
      const url = `http://localhost:8080/api/auth/getResetPasswordLink`;
      const payload = { ...email };
      const response = await axios.post(url, payload);
      setMessage(response.data.message);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
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
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-9 col-lg-12 col-xl-10">
            <div className="card shadow-lg o-hidden border-0 my-5">
              <div className="card-body p-0">
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
                          <label className="form-label">Email Address</label>
                          <input
                            className="form-control form-control-user"
                            type="email"
                            id="email"
                            aria-describedby="emailHelp"
                            placeholder="Enter Email Address..."
                            name="email"
                            onChange={handleReset}
                          />
                        </div>
                        <div className="text-center pt-md-5">
                          <a className="small" href="/login">
                            Already have an account? Login!
                          </a>
                        </div>
                        <div className="text-center mb-md-5">
                          <a className="small" href="/signup">
                            Create an Account!
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
                            "Get Reset Link"}
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
      <Script defer src="/dashboard/assets/bootstrap/js/bootstrap.min.js" />
      <Script defer src="/dashboard/assets/js/bs-init.js" />
      <Script defer src="/dashboard/assets/js/theme.js" />
    </>
  );
}
