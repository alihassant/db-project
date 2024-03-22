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
      const url = `http://localhost:8080/api/db/addNewMember`;
      const payload = { ...newUser };
      const response = await axios.post(url, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      getDb();
      setMessage(response.data.message);
    } catch (err) {
      setMessage(null);
      if (err.response) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong!!!");
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
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
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
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-6 text-nowrap">
                        <div
                          id="dataTable_length"
                          className="dataTables_length"
                          aria-controls="dataTable"
                        >
                          <label className="form-label">
                            Show&nbsp;
                            <select
                              defaultValue={10}
                              className="d-inline-block form-select form-select-sm"
                            >
                              <option value={10}>10</option>
                              <option value={25}>25</option>
                              <option value={50}>50</option>
                              <option value={100}>100</option>
                            </select>
                            &nbsp;
                          </label>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div
                          className="text-md-end dataTables_filter"
                          id="dataTable_filter"
                        >
                          <label className="form-label">
                            <input
                              type="search"
                              className="form-control form-control-sm"
                              aria-controls="dataTable"
                              placeholder="Search"
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                    <div
                      className="table-responsive table mt-2"
                      id="dataTable"
                      role="grid"
                      aria-describedby="dataTable_info"
                    >
                      <table
                        className="table table-striped my-0"
                        id="dataTable"
                      >
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Role</th>
                            <th>Email</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {users.map((user) => {
                            // INITIAL_REMOVE_USER.removeUserId = user?._id;
                            return (
                              <tr key={user._id}>
                                <td>{user.name}</td>
                                <td>{user.role}</td>
                                <td>{user.email}</td>
                                <td>
                                  <Link
                                    href={`/dashboard/tables/table/${dbId}/users/${user.userId}`}
                                    className="btn btn-primary"
                                  >
                                    {" "}
                                    See More
                                  </Link>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
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
