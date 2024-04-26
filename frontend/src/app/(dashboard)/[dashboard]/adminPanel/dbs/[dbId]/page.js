"use client";

import "@/app/dashboard.min.css";
import Loading from "@/components/dashboard/Loading";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const INITIAL_TH = {
  ownerId: "",
  totalHeaders: 0,
  dbId: "",
};

const INITIAL_EDIT_DETAILS = {
  ownerId: "",
  dbId: "",
  name: "",
  media: false,
  notifications: false,
  emails: false,
};

export default function DbProfile({ params }) {
  const { dbId } = params;

  INITIAL_TH.dbId = dbId;
  INITIAL_EDIT_DETAILS.dbId = dbId;

  const token = Cookies.get("token");

  const [db, setDb] = useState();
  const [dbOwner, setDbOwner] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const [changeTH, setChangeTH] = useState(INITIAL_TH);
  const [editDetails, setEditDetails] = useState(INITIAL_EDIT_DETAILS);

  const getUserDb = async () => {
    try {
      const url = `http://localhost:8080/api/superAdmin/getUserDatabase/${dbId}`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response) {
        const { db } = response.data;
        if (db) {
          const owner = db.users.find((user) => user.role === "owner");
          INITIAL_EDIT_DETAILS.ownerId = owner.userId;
          INITIAL_TH.ownerId = owner.userId;
          setDbOwner(owner);
          setChangeTH((prev) => ({
            ...prev,
            ...db.tHeaders[0],
          }));
          setDb(db);
          INITIAL_TH.totalHeaders = db.totalHeaders;
          INITIAL_EDIT_DETAILS.name = db.name;
          INITIAL_EDIT_DETAILS.media = db.media;
          INITIAL_EDIT_DETAILS.notifications = db.notifications;
          INITIAL_EDIT_DETAILS.emails = db.emails;
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  function handleTHSubmit(e) {
    const { name, value } = e.target;
    setChangeTH((prev) => ({ ...prev, [name]: value }));
  }

  function handleDetailsChange(e) {
    const { name, value } = e.target;
    setEditDetails((prev) => ({ ...prev, [name]: value }));
  }

  async function handleDetailsSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      setMessage(null);
      const url = "http://localhost:8080/api/superAdmin/changeTableDetails";
      const payload = editDetails;
      const response = await axios.patch(url, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response) {
        setMessage(response.data.message);
        getUserDb();
      }
    } catch (err) {
      if (err.response.data.message) {
        setError(err.response.data.message);
      }
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  async function handletHeadersSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      setMessage(null);
      const url = `http://localhost:8080/api/superAdmin/changeTableHeaders/${dbId}`;
      const payload = changeTH;
      const response = await axios.patch(url, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response) {
        const { message } = response.data;
        if (message) {
          setError(null);
          setMessage(message);
          getUserDb();
        }
      }
    } catch (err) {
      console.log(err);
      setError("Could not change the headers");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getUserDb();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="container-fluid">
        <h3 className="text-dark mb-4">Database Super Admin View</h3>

        {loading && <Loading />}

        {db && (
          <>
            <div className="row mb-3">
              <div className="col-lg">
                <div className="row">
                  <div className="col-md-6">
                    <div className="card h-100 shadow mb-3">
                      <div className="card-header py-3">
                        <p className="text-primary m-0 fw-bold">
                          Owner Details
                        </p>
                      </div>
                      <div className="card-body">
                        <form>
                          <div className="row">
                            <div className="col">
                              <div className="mb-3">
                                <label className="form-label">
                                  <strong>Name: {dbOwner?.name}</strong>
                                  <br></br>
                                </label>
                              </div>
                            </div>
                            <div className="col">
                              <div className="mb-3">
                                <label className="form-label">
                                  <strong>
                                    Email Address: {dbOwner?.email}
                                  </strong>
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col">
                              <div className="mb-3">
                                <label className="form-label">
                                  <strong>User Id: {dbOwner?.userId}</strong>
                                </label>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="card h-100 shadow mb-3">
                      <div className="card-header py-3">
                        <p className="text-primary m-0 fw-bold">
                          Database Info
                        </p>
                      </div>
                      <div className="card-body">
                        <form>
                          <div className="row">
                            <div className="col">
                              <div className="mb-3">
                                <label className="form-label">
                                  <strong>DB ID: {db?._id}</strong>
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col">
                              <div className="mb-3">
                                <label className="form-label">
                                  <strong>
                                    Total Users: {(db?.users).length}
                                  </strong>
                                </label>
                              </div>
                            </div>
                            <div className="col">
                              <div className="mb-3">
                                <label className="form-label">
                                  <strong>
                                    Total Posts: {(db?.posts).length}
                                  </strong>
                                </label>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-lg">
                <div className="row">
                  <div className="col">
                    <div className="card h-100 shadow mb-3">
                      <div className="card-header py-3">
                        <p className="text-primary m-0 fw-bold">
                          Database Details
                        </p>
                      </div>
                      <div className="card-body">
                        <form>
                          <div className="row">
                            <div className="col">
                              <div className="mb-3">
                                <label className="form-label">
                                  <strong>Name: {db?.name}</strong>
                                  <br></br>
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col">
                              <div className="mb-3">
                                <label className="form-label">
                                  <strong>
                                    Has Media: {db?.media.toString()}
                                  </strong>
                                </label>
                              </div>
                            </div>
                            <div className="col">
                              <div className="mb-3">
                                <label className="form-label">
                                  <strong>
                                    Has Notifications:{" "}
                                    {db?.notifications.toString()}
                                  </strong>
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col">
                              <div className="mb-3">
                                <label className="form-label">
                                  <strong>
                                    Has Emails: {db?.emails.toString()}
                                  </strong>
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className="mb-3">
                            <button
                              className="btn btn-primary btn-sm"
                              type="button"
                              data-bs-toggle="modal"
                              data-bs-target="#detailsModal"
                              data-bs-whatever="@getbootstrap"
                            >
                              Edit Details
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <div className="card h-100 shadow mb-3">
                      <div className="card-header py-3">
                        <p className="text-primary m-0 fw-bold">
                          Table Headers
                        </p>
                      </div>
                      <div className="card-body">
                        <form>
                          <div className="row">
                            <div className="col">
                              <div className="mb-3">
                                <label className="form-label">
                                  <strong>
                                    Total Headers: {db?.totalHeaders}
                                  </strong>
                                  <br></br>
                                </label>
                              </div>
                            </div>
                            <div className="col">
                              <div className="mb-3">
                                <label className="form-label">
                                  <strong>
                                    Email Address: {dbOwner?.email}
                                  </strong>
                                </label>
                              </div>
                            </div>
                          </div>
                          {Array.from({ length: db?.totalHeaders }).map(
                            (_, index) => (
                              <div key={index} className="row">
                                <div className="col">
                                  <div className="mb-3">
                                    <label className="form-label">
                                      <strong>
                                        Header {index + 1}:{" "}
                                        {db?.tHeaders[0][`tH${index + 1}`]}
                                      </strong>
                                    </label>
                                  </div>
                                </div>
                              </div>
                            )
                          )}
                          <div className="mb-3">
                            <button
                              className="btn btn-primary btn-sm"
                              type="button"
                              data-bs-toggle="modal"
                              data-bs-target="#tHeadersModal"
                              data-bs-whatever="@getbootstrap"
                            >
                              Edit Headers
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* details change modal */}
      <div
        className="modal fade"
        id="detailsModal"
        tabIndex="-1"
        aria-labelledby="detailsModal"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Details
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
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
              {message && (
                <div className="alert alert-success" role="alert">
                  {message}
                </div>
              )}
              <form onSubmit={handleDetailsSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="col-form-label">
                    Name
                  </label>
                  <input
                    onChange={handleDetailsChange}
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={editDetails.name}
                  />
                </div>
                <div className="mb-3">
                  <label className="col-form-label">Has Media?</label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    onChange={handleDetailsChange}
                    name="media"
                    id="media"
                    value={editDetails?.media}
                  >
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="col-form-label">Has Notifications?</label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    onChange={handleDetailsChange}
                    name="notifications"
                    id="notifications"
                    value={editDetails?.notifications}
                  >
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="col-form-label">Has Emails?</label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    onChange={handleDetailsChange}
                    name="emails"
                    id="emails"
                    value={editDetails?.emails}
                  >
                    <option value="true">Yes</option>
                    <option value="false">No</option>
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
              <form onSubmit={handleDetailsSubmit}>
                <button type="submit" className="btn btn-primary">
                  {(loading && (
                    <div
                      className="spinner-border spinner-border-sm"
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  )) ||
                    "Change Details"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* details change modal close */}

      {/* about change modal */}
      <div
        className="modal fade"
        id="tHeadersModal"
        tabIndex="-1"
        aria-labelledby="tHeadersModal"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Change Headers
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
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
              {message && (
                <div className="alert alert-success" role="alert">
                  {message}
                </div>
              )}
              <form onSubmit={handletHeadersSubmit}>
                <div className="mb-3">
                  <label className="col-form-label">Total Headers</label>
                  <input
                    type="number"
                    className="form-control"
                    name="totalHeaders"
                    value={changeTH.totalHeaders}
                    onChange={handleTHSubmit}
                  />

                  {(changeTH.totalHeaders < 3 ||
                    changeTH.totalHeaders > 10) && (
                    <p className="text-danger">
                      Total Headers should be between 3 and 10
                    </p>
                  )}
                </div>
                {changeTH.totalHeaders >= 3 &&
                  changeTH.totalHeaders <= 10 &&
                  Array.from({ length: changeTH.totalHeaders }).map(
                    (_, index) => (
                      <div key={index} className="mb-3">
                        <label className="col-form-label">
                          Header {index + 1}
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name={`tH${index + 1}`}
                          value={changeTH[`tH${index + 1}`] || ""}
                          onChange={handleTHSubmit}
                        />
                      </div>
                    )
                  )}
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
              <form onSubmit={handletHeadersSubmit}>
                <button type="submit" className="btn btn-primary">
                  {(loading && (
                    <div
                      className="spinner-border spinner-border-sm"
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  )) ||
                    "Change Headers"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* about change modal close */}
    </>
  );
}
