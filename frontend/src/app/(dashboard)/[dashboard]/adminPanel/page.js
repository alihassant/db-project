"use client";

import "@/app/dashboard.min.css";
import DbsTableAdmin from "@/components/dashboard/superAdmin/tables/DbsTableAdmin";
import UsersTable from "@/components/dashboard/superAdmin/tables/UsersTable";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function Profile() {
  const [user, setUser] = useState();
  const [users, setUsers] = useState();
  const [dbs, setDbs] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const token = Cookies.get("token");

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

  const getAllUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:8080/api/superAdmin/getAllUsers",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response) {
        const userData = await response.data;
        const { users } = userData;
        if (users) {
          setUsers(users);
        }
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const getAllDbs = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:8080/api/superAdmin/getDatabases",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response) {
        const dbsData = response.data;
        const { databases: dbs } = dbsData;
        if (dbs) {
          setDbs(dbs);
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
    getAllUsers();
    getAllDbs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                  {/* <div className="row mb-3">
                    <div className="col">
                      <p className="fs-5 mb-0">Admin Options </p>
                      <p className="fs-6 fw-lighter">
                        Admin options will be displayed here
                      </p>
                      <hr />
                    </div>
                  </div> */}
                  <div className="row mb-3"></div>
                  <div className="accordion" id="accordionExample">
                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <button
                          className="accordion-button collapsed fs-5 fw-bolder"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseTwo"
                          aria-expanded="false"
                          aria-controls="collapseTwo"
                        >
                          Users
                        </button>
                      </h2>
                      <div
                        id="collapseTwo"
                        className="accordion-collapse collapse"
                        data-bs-parent="#accordionExample"
                      >
                        <div className="accordion-body">
                          <div className="col">
                            {users && <UsersTable users={users} />}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <button
                          className="accordion-button collapsed fs-5 fw-bolder"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseThree"
                          aria-expanded="false"
                          aria-controls="collapseThree"
                        >
                          Databases
                        </button>
                      </h2>
                      <div
                        id="collapseThree"
                        className="accordion-collapse collapse"
                        data-bs-parent="#accordionExample"
                      >
                        <div className="accordion-body">
                          {dbs && (
                            <>
                              <div className="row">
                                <p className="fs-5">
                                  Total Dbs : {dbs?.length}{" "}
                                </p>
                              </div>
                              <div className="row">
                                <DbsTableAdmin dbs={dbs} />
                              </div>
                            </>
                          )}
                        </div>
                      </div>
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
