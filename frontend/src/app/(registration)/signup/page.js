"use client";

import "@/app/dashboard.min.css";
import { handleLogin } from "@/utils/auth";
import axios from "axios";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { useEffect, useState } from "react";

const INITIAL_USER = {
  name: "",
  email: "",
  username: "",
  password: "",
  password_repeat: "", // Added password_repeat field
};

export default function Signup() {
  const [priceId, setPriceId] = useState();

  useEffect(() => {
    const priceId = new URLSearchParams(window.location.search).get("priceId");
    setPriceId(priceId);
  }, []);

  const Router = useRouter();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(INITIAL_USER);

  // useEffect(() => {
  //   if (!priceId) {
  //     window.location.pathname = "/pricing";
  //   }
  // }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  }

  // Function to handle changes in the repeated password field
  function handleRepeatPasswordChange(e) {
    const { value } = e.target;
    setUser((prev) => ({ ...prev, password_repeat: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (user.password !== user.password_repeat) {
      setError("Passwords do not match.");
      return;
    }
    try {
      setError(null);
      setLoading(true);
      const url = `http://localhost:8080/api/auth/signup`;
      const payload = { ...user, priceId };
      const response = await axios.post(url, payload);
      const { userId, email, name } = response.data;
      handleLogin(response.data.token);
      // window.location.pathname = "/signup/plans";
      if (priceId !== "free") {
        const customerId = await axios.post(
          "http://localhost:8080/api/subscription/createCustomer",
          {
            userId,
            email,
            name,
          }
        );

        if (customerId.data.success) {
          const subscription = await axios.post(
            "http://localhost:8080/api/subscription/createCheckoutLink",
            {
              userId,
              priceId,
            }
          );
          console.log(subscription.data);
          if (subscription.data.success) {
            Router.push(subscription.data.url);
          }
        }
      } else {
        Router.push("/dashboard");
      }
    } catch (err) {
      console.log(err);
      if (err.message === "Network Error") {
        setError("Network Error: Please check your internet connection.");
      }
      setError(err.response.data.message);
      setTimeout(() => {
        setError(null);
      }, 10000);
    } finally {
      setLoading(false);
    }
  }
  // console.log(user);

  return (
    <>
      <div className="container">
        <div className="card shadow-lg o-hidden border-0 my-5 ">
          <div className="card-body p-0">
            <div className="row">
              <div className="col-lg-5 d-none d-lg-flex">
                <div
                  className="flex-grow-1 bg-register-image"
                  style={{
                    backgroundImage:
                      'url("/dashboard/assets/img/dogs/image2.jpeg")',
                  }}
                />
              </div>
              <div className="col-lg-7">
                <div className="p-5">
                  <div className="text-center mb-md-5">
                    <h4 className="text-dark mb-4">Create an Account!</h4>
                  </div>
                  <form className="user pt-md-4" onSubmit={handleSubmit}>
                    {error && (
                      <div className="alert alert-danger" role="alert">
                        {error}
                      </div>
                    )}
                    <div className="row mb-3">
                      <div className="col-sm-6 mb-3 mb-sm-0">
                        <input
                          className="form-control form-control-user"
                          type="text"
                          id="name"
                          placeholder="Name"
                          name="name"
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-sm-6">
                        <input
                          className="form-control form-control-user"
                          type="text"
                          id="username"
                          placeholder="Username"
                          name="username"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="mb-3">
                      <input
                        className="form-control form-control-user"
                        type="email"
                        id="email"
                        aria-describedby="emailHelp"
                        placeholder="Email Address"
                        name="email"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="row mb-3">
                      <div className="col-sm-6 mb-3 mb-sm-0">
                        <input
                          className="form-control form-control-user"
                          type="password"
                          id="password"
                          placeholder="Password"
                          name="password"
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-sm-6">
                        <input
                          className="form-control form-control-user"
                          type="password"
                          id="confirmPassword"
                          placeholder="Repeat Password"
                          name="password_repeat"
                          onChange={handleRepeatPasswordChange}
                        />
                      </div>
                    </div>
                    <button
                      className="btn btn-primary d-block btn-user w-100"
                      type="submit"
                    >
                      {(loading && (
                        <div
                          className="spinner-border spinner-border-sm"
                          role="status"
                        >
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      )) ||
                        "Register Account"}
                    </button>
                    <hr />
                  </form>
                  <div className="text-center pt-md-5">
                    <a className="small" href="/reset">
                      Forgot Password?
                    </a>
                  </div>
                  <div className="text-center">
                    <a className="small" href="/login">
                      Already have an account? Login!
                    </a>
                  </div>
                </div>
                <div className="text-center pt-md-5">
                  <p className="small"></p>
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
