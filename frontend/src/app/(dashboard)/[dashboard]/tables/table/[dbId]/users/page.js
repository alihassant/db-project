"use client";

import "@/app/dashboard.min.css";
import Script from "next/script";
import { useEffect, useState } from "react";
import Loading from "@/components/dashboard/Loading";
import { usePathname } from "next/navigation";
import axios from "axios";
import getData from "@/app/api/table/tableData/[id]/route";
import Link from "next/link";
import revalidateDataPath from "@/app/actions";
import Cookies from "js-cookie";
import { PLANS } from "@/config/stripe";
import DbUsersTable from "@/components/dashboard/tables/DbUsersTable";

const INITIAL_NEW_USER = {
  email: "",
  userId: "",
  dbId: "",
  role: "viewOnly",
};
export default function Table() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  // getting and setting the databases
  const [users, setUsers] = useState();
  const [db, setDb] = useState();
  const path = usePathname();
  const dbId = path.split("/")[4];
  INITIAL_NEW_USER.dbId = dbId;

  const getDb = async () => {
    try {
      const response = await getData(dbId);
      if (response) {
        const users = response.db.users;
        if (users) {
          setDb(response.db);
          setUsers(users);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  // // setting and getting the user
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
        if (user) {
          setUser(user);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const totalUsersDb = db?.users.length;
  const userPlan = user?.currentPlan;
  const plan = PLANS.find((plan) => plan.slug === userPlan);

  useEffect(() => {
    getUser();
    getDb();
    // eslint-disable-next-line
  }, []);
  INITIAL_NEW_USER.userId = user?._id;

  const [newUser, setNewUser] = useState(INITIAL_NEW_USER);
  function handleChange(e) {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const token = Cookies.get("token");
      setLoading(true);
      setError(null);

      if (totalUsersDb >= plan.users) {
        setError(
          `You have reached the maximum number of users allowed for the ${plan.name} plan`
        );
        setTimeout(() => {
          setError(null);
        }, 5000);
        return;
      }

      const url = `http://localhost:8080/api/db/addNewMember`;
      const payload = { ...newUser };
      const response = await axios.post(url, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      getDb();
      setMessage(response.data.message);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } catch (err) {
      setMessage(null);
      if (err.response) {
        setError(err.response.data.message);
        setTimeout(() => {
          console.log("Called");
          setError(null);
        }, 5000);
      } else {
        setError("Something went wrong!!!");
        setTimeout(() => {
          setError(null);
        }, 5000);
      }
    } finally {
      revalidateDataPath(path);
      setLoading(false);
    }
  }

  async function handlePDF(e) {
    e.preventDefault();
    try {
      const token = Cookies.get("token");
      setLoading(true);
      const url = `http://localhost:8080/api/db/getUsersPDF/${dbId}`;
      const response = await axios.get(url, {
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const pdfBlob = new Blob([response.data], { type: "application/pdf" });

      // Assuming you want to display the PDF in the browser
      const url1 = window.URL.createObjectURL(pdfBlob);
      window.open(url1, "_blank");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  function redirectToDB() {
    window.location.pathname = `/dashboard/tables/table/${dbId}`;
  }

  return (
    <>
      {(user && users && (
        <div className="container-fluid">
          <h3 className="text-dark mb-4">Database Users</h3>
          {(!users
            ? "No data found!!!"
            : users && (
                <div className="card shadow">
                  <div className="card-header py-3">
                    <Link
                      href={`/dashboard/tables/table/${dbId}`}
                      className="text-primary m-0 fw-bold"
                      style={{
                        float: "left",
                        textDecoration: "none",
                      }}
                    >
                      {db?.name}
                    </Link>
                    <div className="d-grid gap-2 d-sm-flex justify-content-sm-end">
                      <button
                        className="btn btn-primary me-md-2 "
                        style={{ color: "white" }}
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        data-bs-whatever="@getbootstrap"
                      >
                        Add User
                      </button>

                      <button
                        className="btn btn-primary me-md-2 "
                        style={{ color: "white" }}
                        type="button"
                        onClick={handlePDF}
                      >
                        {(loading && (
                          <div
                            className="spinner-border spinner-border-sm"
                            role="status"
                          >
                            <span className="visually-hidden">Loading...</span>
                          </div>
                        )) ||
                          "Download PDF"}
                      </button>
                    </div>

                    {/* new modal */}
                    <div
                      className="modal fade"
                      id="exampleModal"
                      tabIndex="-1"
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                              New User
                            </h5>
                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div className="modal-body">
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
                            <form onSubmit={handleSubmit}>
                              <div className="mb-3">
                                <label
                                  htmlFor="email"
                                  className="col-form-label "
                                >
                                  Email:
                                </label>
                                <input
                                  onChange={handleChange}
                                  type="text"
                                  className="form-control"
                                  id="email"
                                  name="email"
                                />
                              </div>
                              <div className="mb-3">
                                <label
                                  htmlFor="role"
                                  className="col-form-label"
                                >
                                  Role:
                                </label>
                                <select
                                  className="form-select"
                                  aria-label="Default select example"
                                  onChange={handleChange}
                                  name="role"
                                  id="role"
                                >
                                  <option value="viewOnly">View Only</option>
                                  <option value="teamLeader">
                                    Team Leader
                                  </option>
                                  <option value="admin">Admin</option>
                                </select>
                              </div>
                            </form>
                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn btn-secondary"
                              data-bs-dismiss="modal"
                            >
                              Close
                            </button>
                            <form onSubmit={handleSubmit}>
                              <button type="submit" className="btn btn-primary">
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
                                  "Add User"}
                              </button>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* new modal close */}

                    {/* <!-- Modal --> */}
                    {/* <div
                            className="modal fade"
                            id="exampleModal"
                            tabIndex="-1"
                            aria-labelledby="exampleModalLabel"
                            aria-hidden="true"
                          >
                            <div className="modal-dialog">
                              <div className="modal-content">
                                <div className="modal-header">
                                  <h5
                                    className="modal-title"
                                    id="exampleModalLabel"
                                  >
                                    Modal title
                                  </h5>
                                  <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                  ></button>
                                </div>
                                <div className="modal-body">...</div>
                                <div className="modal-footer">
                                  <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                  >
                                    Close
                                  </button>
                                  <button
                                    type="button"
                                    className="btn btn-primary"
                                  >
                                    Save changes
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div> */}
                    {/* <!-- Modal --> */}
                  </div>
                  <DbUsersTable dbId={dbId} users={users} />
                </div>
              )) || <Loading />}
        </div>
      )) || <Loading />}
      <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></Script>
      {/* <Script src="/dashboard/assets/js/bs-init.js"></Script>
      <Script src="/dashboard/assets/js/theme.js"></Script> */}
    </>
  );
}
