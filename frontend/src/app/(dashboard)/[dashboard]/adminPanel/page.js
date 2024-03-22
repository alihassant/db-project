"use client";

import "@/app/dashboard.min.css";
import { useEffect, useState } from "react";

export default function Profile() {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getUser = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/users/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response) {
        const userData = await response.json();
        const { user } = userData;
        if (user) {
          setUser(user);
        }
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      {user && user.extraRole === "superAdmin" && (
        <div className="col-lg-12 ">
          <div className="row mx-3">
            <div className="col">
              <div className="card shadow mb-3">
                <div className="card-header py-3">
                  <h2>Admin Panel</h2>
                </div>
                <div className="card-body">
                  <div className="row mb-3">
                    <div className="col">
                      <p className="fs-5 mb-0">Admin Options </p>
                      <p className="fs-6 fw-lighter">
                        Admin options will be displayed here
                      </p>
                      <hr />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {user && user.extraRole !== "superAdmin" && !loading && (
        <h1 className="text-center">
          You are not authorized to view this page
        </h1>
      )}
      {loading && (
        <>
          <div className="d-flex justify-content-center text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </>
      )}
    </>
  );
}
