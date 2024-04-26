"use client";

import "@/app/dashboard.min.css";
import Loading from "@/components/dashboard/Loading";
import Image from "next/image";
import Script from "next/script";
import { useEffect, useState } from "react";

export default function Profile() {
  const [user, setUser] = useState();
  const getUser = async () => {
    try {
      const response = await fetch("/api/users/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response) {
        const userData = await response.json();
        const { user } = userData;
        // console.log(user);
        // const user = { ...userData };
        if (user) {
          setUser(user);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);
  // console.log(user.name);
  return (
    <>
      {(user && (
        <div className="container-fluid">
          <h3 className="text-dark mb-4">Profile</h3>
          <div className="row mb-3">
            <div className="col-lg-4">
              <div className="card mb-3">
                <div className="card-body text-center shadow">
                  <Image
                    priority
                    alt="User Avatar"
                    className="rounded-circle mb-3 mt-4"
                    src="/dashboard/assets/img/avatars/avatar1.jpg"
                    width={160}
                    height={160}
                  />
                  <div className="mb-3">
                    <button className="btn btn-primary btn-sm" type="button">
                      Change Photo
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="row">
                <div className="col">
                  <div className="card shadow mb-3">
                    <div className="card-header py-3">
                      <p className="text-primary m-0 fw-bold">User Details</p>
                    </div>
                    <div className="card-body">
                      <form>
                        <div className="row">
                          <div className="col">
                            <div className="mb-3">
                              <label className="form-label" htmlFor="username">
                                <strong>Username: {user.name}</strong>
                                <br></br>
                                <strong>id: {user._id}</strong>
                              </label>
                            </div>
                          </div>
                          <div className="col">
                            <div className="mb-3">
                              <label className="form-label" htmlFor="email">
                                <strong>Email Address: {user.email}</strong>
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col">
                            <div className="mb-3">
                              <label
                                className="form-label"
                                htmlFor="first_name"
                              >
                                <strong>
                                  First Name: {user.name.split(" ")[0]}
                                </strong>
                              </label>
                            </div>
                          </div>
                          <div className="col">
                            <div className="mb-3">
                              <label className="form-label" htmlFor="last_name">
                                <strong>
                                  Last Name: {user.name.split(" ")[1]}
                                </strong>
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="mb-3">
                          <button
                            className="btn btn-primary btn-sm"
                            type="submit"
                          >
                            Save Settings
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="card shadow">
                    <div className="card-header py-3">
                      <p className="text-primary m-0 fw-bold">
                        Contact Settings
                      </p>
                    </div>
                    <div className="card-body">
                      <form>
                        <div className="mb-3">
                          <label className="form-label" htmlFor="address">
                            <strong>Address</strong>
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            id="address"
                            placeholder="Sunset Blvd, 38"
                            name="address"
                          />
                        </div>
                        <div className="row">
                          <div className="col">
                            <div className="mb-3">
                              <label className="form-label" htmlFor="city">
                                <strong>City</strong>
                              </label>
                              <input
                                className="form-control"
                                type="text"
                                id="city"
                                placeholder="Los Angeles"
                                name="city"
                              />
                            </div>
                          </div>
                          <div className="col">
                            <div className="mb-3">
                              <label className="form-label" htmlFor="country">
                                <strong>Country</strong>
                              </label>
                              <input
                                className="form-control"
                                type="text"
                                id="country"
                                placeholder="USA"
                                name="country"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="mb-3">
                          <button
                            className="btn btn-primary btn-sm"
                            type="submit"
                          >
                            Save&nbsp;Settings
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card shadow mb-5">
            <div className="card-header py-3">
              <p className="text-primary m-0 fw-bold">Forum Settings</p>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <form>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="signature">
                        <strong>Signature</strong>
                        <br />
                      </label>
                      <textarea
                        className="form-control"
                        id="signature"
                        rows={4}
                        name="signature"
                        defaultValue={""}
                      />
                    </div>
                    <div className="mb-3">
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="formCheck-1"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="formCheck-1"
                        >
                          <strong>Notify me about new replies</strong>
                        </label>
                      </div>
                    </div>
                    <div className="mb-3">
                      <button className="btn btn-primary btn-sm" type="submit">
                        Save Settings
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )) || <Loading />}

      <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></Script>
      {/* <Script src="/dashboard/assets/js/bs-init.js"></Script>
      <Script src="/dashboard/assets/js/theme.js"></Script> */}
    </>
  );
}
