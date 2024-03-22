"use client";

import "@/app/dashboard.min.css";
import Script from "next/script";
import { useEffect, useState } from "react";
import Loading from "@/components/dashboard/Loading";
import { usePathname } from "next/navigation";
import axios from "axios";
import getData from "@/app/api/table/tableData/[id]/route";
import Link from "next/link";
import Cookies from "js-cookie";

const INITIAL_NEW_USER = {
  email: "",
  userId: "",
  dbId: "",
  role: "viewOnly",
};

const INITIAL_REMOVE_USER = {
  userId: "",
  dbId: "",
  removeUserId: "",
};

const INITIAL_USER_POSTS = {
  userId: "",
  dbId: "",
};

const INITIAL_USER_ROLE = {
  userId: "",
  dbId: "",
  changeUserId: "",
  role: "viewOnly",
};

export default function Table({ params }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  // getting and setting the databases
  const [users, setUsers] = useState();
  const path = usePathname();
  const dbId = params.dbId;
  const userId = params.id;

  // console.log(params);

  INITIAL_REMOVE_USER.dbId = dbId;
  INITIAL_REMOVE_USER.removeUserId = userId;
  INITIAL_USER_ROLE.dbId = dbId;
  INITIAL_USER_ROLE.changeUserId = userId;

  const getDb = async () => {
    try {
      const response = await getData(dbId);
      if (response) {
        const users = response.db.users;
        if (users) {
          setUsers(users);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  // // // setting and getting the user
  const [userData, setUserData] = useState();
  const getUserDataClient = async () => {
    try {
      const token = Cookies.get("token");
      const response = await axios.get(
        `http://localhost:8080/api/auth/user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response) {
        const { user } = response.data;
        const userDb = user;
        const db = user.databases.filter((db) => db.dbId === dbId);
        user.dbRole = db[0].dbRole;
        INITIAL_USER_ROLE.role = db[0].dbRole;
        if (user) {
          setUserData(userDb);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

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

  INITIAL_REMOVE_USER.userId = user?._id;
  INITIAL_USER_ROLE.userId = user?._id;

  const [posts, setPosts] = useState(INITIAL_USER_POSTS);
  const getPosts = async () => {
    try {
      const token = Cookies.get("token");
      const response = await axios.get(
        `http://localhost:8080/api/db/getUserData/${dbId}/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response) {
        const posts = response.data.posts;
        setPosts(posts.length);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // change role functionality
  const [changeRole, setChangeRole] = useState(INITIAL_USER_ROLE);
  function handleChangeRole(e) {
    const { name, value } = e.target;
    setChangeRole((prev) => ({ ...prev, [name]: value }));
  }

  async function handleRoleChange(e) {
    e.preventDefault();
    try {
      const token = Cookies.get("token");
      if (changeRole.role === INITIAL_USER_ROLE.role) {
        setError("Role is already set to this value!!!");
        return;
      }
      if (changeRole.userId === changeRole.changeUserId) {
        setError("You can't change your own role!!!");
        return;
      }
      setLoading(true);
      const url = `http://localhost:8080/api/db/changeUserRole`;
      const payload = { ...changeRole };
      const response = await axios.post(url, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      getUserDataClient();
      setError(null);
      setMessage(response.data.message);
    } catch (err) {
      console.log(err.response);
      setMessage(null);
      if (err.response) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong!!!");
      }
    } finally {
      setLoading(false);
    }
  }

  const [removeUser, setRemoveUser] = useState(INITIAL_REMOVE_USER);

  async function handleRemoveSubmit(e) {
    e.preventDefault();
    try {
      const token = Cookies.get("token");
      setLoading(true);
      setError(null);
      const url = `http://localhost:8080/api/db/removeUser`;
      const payload = { ...removeUser };
      const response = await axios.post(url, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setError(null);
      setMessage(response.data.message);
      window.location.pathname = `/dashboard/tables/table/${dbId}/users`;
    } catch (err) {
      setMessage(null);
      if (err.response) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong!!!");
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getUser();
    getDb();
    getUserDataClient();
    getPosts();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {(user && users && (
        <div className="container-fluid">
          <h3 className="text-dark mb-4">Database Users</h3>
          {(!userData
            ? "No data found!!!"
            : userData && (
                <div className="card shadow">
                  <div className="card-header py-3">
                    <p
                      className="text-primary m-0 fw-bold"
                      style={{ float: "left" }}
                    >
                      User Info
                    </p>
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                      <Link
                        href={`/dashboard/tables/table/${dbId}/users`}
                        className="btn btn-primary"
                      >
                        {" "}
                        Go Back
                      </Link>
                    </div>
                  </div>
                  <div className="card-body">
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
                            <th>Total Posts</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr key={userData._id}>
                            <td>{userData.name}</td>
                            <td>{userData.dbRole}</td>
                            <td>{userData.email}</td>
                            <td>{posts}</td>
                            <td>
                              {/* change role functionality start */}
                              <button
                                className="btn btn-primary px-3 mx-2"
                                type="button"
                                data-bs-toggle="modal"
                                data-bs-target="#editRole"
                              >
                                Role
                              </button>
                              {/* new modal */}
                              <div
                                className="modal fade"
                                id="editRole"
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
                                        Change Role
                                      </h5>
                                      <button
                                        type="button"
                                        className="btn-close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                        onClick={() => {
                                          setError(null);
                                          setMessage(null);
                                        }}
                                      ></button>
                                    </div>
                                    <div className="modal-body">
                                      {error && (
                                        <div
                                          className="alert alert-danger"
                                          role="alert"
                                        >
                                          {error}
                                        </div>
                                      )}
                                      {message && (
                                        <div
                                          className="alert alert-success"
                                          role="alert"
                                        >
                                          {message}
                                        </div>
                                      )}
                                      <form onSubmit={handleRoleChange}>
                                        <div className="mb-3">
                                          <p>
                                            Change the role of the user from{" "}
                                            <b>{INITIAL_USER_ROLE.role}</b> to:
                                          </p>
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
                                            onChange={handleChangeRole}
                                            name="role"
                                            id="role"
                                            value={changeRole.role}
                                          >
                                            <option value="viewOnly">
                                              View Only
                                            </option>
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
                                        onClick={() => {
                                          setError(null);
                                          setMessage(null);
                                        }}
                                      >
                                        Close
                                      </button>
                                      <form onSubmit={handleRoleChange}>
                                        <button
                                          type="submit"
                                          className="btn btn-primary"
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
                                            "Change Role"}
                                        </button>
                                      </form>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {/* role modal close */}
                              {/* change role functionality end */}

                              {/* remove functionality start */}
                              <button
                                className="btn btn-danger px-3 mx-2"
                                type="button"
                                data-bs-toggle="modal"
                                data-bs-target="#remove"
                              >
                                Remove
                              </button>
                              {/* remove modal  */}
                              <div
                                className="modal fade"
                                id="remove"
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
                                        Remove
                                      </h5>
                                      <button
                                        type="button"
                                        className="btn-close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                        onClick={() => {
                                          setError(null);
                                          setMessage(null);
                                        }}
                                      ></button>
                                    </div>
                                    <div className="modal-body">
                                      <form onSubmit={handleRemoveSubmit}>
                                        {error && (
                                          <div
                                            className="alert alert-danger"
                                            role="alert"
                                          >
                                            {error}
                                          </div>
                                        )}
                                        <div className="mb-3">
                                          <p>
                                            Are you sure you want remove this
                                            user?
                                          </p>
                                        </div>
                                      </form>
                                    </div>
                                    <div className="modal-footer">
                                      <button
                                        type="button"
                                        className="btn btn-secondary"
                                        data-bs-dismiss="modal"
                                        onClick={() => {
                                          setError(null);
                                          setMessage(null);
                                        }}
                                      >
                                        Close
                                      </button>
                                      <form onSubmit={handleRemoveSubmit}>
                                        <button
                                          type="submit"
                                          className="btn btn-danger"
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
                                            "Remove User"}
                                        </button>
                                      </form>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {/* remove modal end  */}
                              {/* remove functionality end */}
                            </td>
                          </tr>
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
