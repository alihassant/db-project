"use client";

import "@/app/dashboard.min.css";
import Loading from "@/components/dashboard/Loading";
import axios from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import Script from "next/script";
import { useEffect, useState } from "react";

const INITIAL_EDIT_DETAILS = {
  username: "",
  email: "",
  name: "",
  userId: "",
};

const INITIAL_EDIT_ABOUT = {
  userId: "",
  about: "",
};

const INITIAL_PASSWORD = {
  oldPassword: "",
  newPassword: "",
  userId: "",
};

const INITIAL_NEW_PHOTO = {
  userId: "",
};

const defaultImage =
  "https://t4.ftcdn.net/jpg/00/64/67/27/360_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg";

export default function Profile() {
  const [user, setUser] = useState();
  const [userData, setUserData] = useState();

  const [error, setError] = useState();
  const [message, setMessage] = useState();
  const [loading, setLoading] = useState(false);

  const [newPhoto, setNewPhoto] = useState(INITIAL_NEW_PHOTO);
  const [photoPreview, setPhotoPreview] = useState();

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
          setUserData({ userId: user._id });
          INITIAL_EDIT_DETAILS.username = user.username;
          INITIAL_EDIT_DETAILS.email = user.email;
          INITIAL_EDIT_DETAILS.name = user.name;
          INITIAL_EDIT_DETAILS.userId = user._id;
          INITIAL_EDIT_ABOUT.userId = user._id;
          INITIAL_EDIT_ABOUT.about = user?.about;
          INITIAL_PASSWORD.userId = user._id;
          INITIAL_NEW_PHOTO.userId = user._id;
          INITIAL_NEW_PHOTO.profilePic = user?.profilePic;
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const [editAbout, setEditAbout] = useState(INITIAL_EDIT_ABOUT);
  const [editDetails, setEditDetails] = useState(INITIAL_EDIT_DETAILS);
  const [password, setPassword] = useState(INITIAL_PASSWORD);

  function handleAboutChange(e) {
    const { name, value } = e.target;
    setEditAbout((prev) => ({ ...prev, [name]: value }));
  }

  function handleDetailsChange(e) {
    const { name, value } = e.target;
    setEditDetails((prev) => ({ ...prev, [name]: value }));
  }

  function handlePasswordChange(e) {
    const { name, value } = e.target;
    setPassword((prev) => ({ ...prev, [name]: value }));
  }

  function handleNewPhotoChange(e) {
    const { name, value, files } = e.target;
    setNewPhoto((prev) => ({ ...prev, [name]: files[0] }));
    setPhotoPreview(URL.createObjectURL(files[0]));
  }

  async function handleImageUpload() {
    if (!newPhoto.profilePic) {
      throw new Error("Please select a photo first.");
    }
    if (newPhoto.profilePic.size > 1048576) {
      throw new Error("File size should be less than 1MB.");
    }
    const data = new FormData();
    data.append("file", newPhoto.profilePic);
    data.append("upload_preset", process.env.CLOUDINARY_UPLOAD_PRESET);
    data.append("cloud_name", process.env.CLOUDINARY_CLOUD_NAME);
    const response = await axios.post(process.env.CLOUDINARY_UPLOAD_URL, data);
    const images = {
      url: response.data.url,
      publicId: response.data.public_id,
    };
    console.log("Image Uploaded Successfully!!!", images);
    return images;
  }

  async function handlePhotoSubmit(e) {
    e.preventDefault();
    try {
      const token = Cookies.get("token");
      setLoading(true);
      setMessage(null);
      setError(null);

      const images = await handleImageUpload();
      const payload = { ...newPhoto, profilePic: images };
      const url = `http://localhost:8080/api/user/changeProfilePic`;
      const response = await axios.post(url, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage(response.data.message);

      getUser();
    } catch (err) {
      console.log(err);
      setMessage(null);
      if (err.response) {
        setError(err.response.data.message);
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
      setNewPhoto(INITIAL_NEW_PHOTO);
    }
  }

  async function handleAboutSubmit(e) {
    e.preventDefault();
    try {
      const token = Cookies.get("token");
      setLoading(true);
      setError(null);
      const url = "http://localhost:8080/api/user/editAbout";
      const payload = editAbout;
      const response = await axios.post(url, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response) {
        setMessage(response.data.message);
        getUser();
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

  async function handleDetailsSubmit(e) {
    e.preventDefault();
    try {
      const token = Cookies.get("token");
      setLoading(true);
      setError(null);
      const url = "http://localhost:8080/api/user/editUserDetails";
      const payload = editDetails;
      const response = await axios.post(url, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response) {
        setMessage(response.data.message);
        getUser();
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

  async function handlePasswordSubmit(e) {
    e.preventDefault();
    try {
      const token = Cookies.get("token");
      setLoading(true);
      setError(null);
      const url = "http://localhost:8080/api/user/editUserPassword";
      const payload = password;
      const response = await axios.post(url, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response) {
        setMessage(response.data.message);
      }
    } catch (err) {
      setMessage(null);
      if (err.response.data.message) {
        setError(err.response.data.message);
      }
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getUser();
  }, []);
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
                    // src="/dashboard/assets/img/avatars/avatar1.jpg"
                    src={`${user?.profilePic.url || defaultImage}`}
                    width={160}
                    height={160}
                  />
                  <div className="mb-4">
                    <button
                      className="btn btn-primary btn-sm"
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#changePhoto"
                      data-bs-whatever="@getbootstrap"
                    >
                      Change Photo
                    </button>
                  </div>

                  <h3>
                    {user.name}{" "}
                    {user.extraRole === "superAdmin" && (
                      <i
                        className="fa  fa-check-circle "
                        aria-hidden="true"
                        color="blue"
                        length="20"
                        width="10"
                        style={{ color: "#486cdc" }}
                      ></i>
                    )}
                  </h3>

                  <hr />
                  <div className="row">
                    <div className="col">
                      <h4>About</h4>
                    </div>
                  </div>

                  <p>{user.about || "No about added yet."}</p>
                  <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button
                      className="text-end"
                      style={{
                        textDecoration: "underline",
                        border: "none",
                        background: "none",
                      }}
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#aboutModal"
                      data-bs-whatever="@getbootstrap"
                    >
                      Edit
                    </button>
                  </div>
                  <hr />
                  <div className="col">
                    <div className="mb-3">
                      <label className="form-label" htmlFor="username">
                        <strong>Total Posts: {user.entries.length}</strong>
                        <br></br>
                      </label>
                    </div>
                  </div>
                  <div className="col">
                    <div className="mb-3">
                      <label className="form-label" htmlFor="username">
                        <strong>
                          Total Databases: {user.databases.length}
                        </strong>
                        <br></br>
                      </label>
                    </div>
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
                                <strong>Username: {user.username}</strong>
                                <br></br>
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
                              <label className="form-label">
                                <strong>
                                  First Name: {user.name.split(" ")[0]}
                                </strong>
                              </label>
                            </div>
                          </div>
                          <div className="col">
                            <div className="mb-3">
                              <label className="form-label">
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

                  <div className="card shadow mb-3">
                    <div className="card-header py-3">
                      <p className="text-primary m-0 fw-bold">Password</p>
                    </div>
                    <div className="card-body">
                      <div className="mb-3">
                        <button
                          className="btn btn-primary btn-sm me-md-2 "
                          style={{ color: "white" }}
                          type="button"
                          data-bs-toggle="modal"
                          data-bs-target="#passwordModal"
                          data-bs-whatever="@getbootstrap"
                        >
                          Change Password
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* <div className="card shadow">
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
                                    <label
                                      className="form-label"
                                      htmlFor="city"
                                    >
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
                                    <label
                                      className="form-label"
                                      htmlFor="country"
                                    >
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
                        </div> */}
                </div>
              </div>
            </div>
          </div>
          {/* <div className="card shadow mb-5">
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
                  </div>
                </div> */}
        </div>
      )) || <Loading />}

      {/* password change modal */}
      <div
        className="modal fade"
        id="passwordModal"
        tabIndex="-1"
        aria-labelledby="passwordModal"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Change Password
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
              <form onSubmit={handlePasswordSubmit}>
                <div className="mb-3">
                  <label htmlFor="oldPassword" className="col-form-label">
                    Old Password
                  </label>
                  <input
                    onChange={handlePasswordChange}
                    type="text"
                    className="form-control"
                    id="oldPassword"
                    name="oldPassword"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="newPassword" className="col-form-label">
                    New Password
                  </label>
                  <input
                    onChange={handlePasswordChange}
                    type="text"
                    className="form-control"
                    id="newPassword"
                    name="newPassword"
                  />
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
              <form onSubmit={handlePasswordSubmit}>
                <button type="submit" className="btn btn-primary">
                  {(loading && (
                    <div
                      className="spinner-border spinner-border-sm"
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  )) ||
                    "Change Password"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* password change modal close */}

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
                  <label htmlFor="username" className="col-form-label">
                    Username
                  </label>
                  <input
                    onChange={handleDetailsChange}
                    value={editDetails?.username}
                    type="text"
                    className="form-control"
                    id="username"
                    name="username"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="col-form-label">
                    Email
                  </label>
                  <input
                    onChange={handleDetailsChange}
                    value={editDetails?.email}
                    type="text"
                    className="form-control"
                    id="email"
                    name="email"
                  />
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
        id="aboutModal"
        tabIndex="-1"
        aria-labelledby="aboutModal"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit About
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
              <form onSubmit={handleAboutSubmit}>
                <div className="mb-3">
                  <label htmlFor="about" className="col-form-label">
                    About
                  </label>
                  <textarea
                    className="form-control"
                    placeholder="Add about yourself here..."
                    style={{ height: "100px" }}
                    onChange={handleAboutChange}
                    id="about"
                    name="about"
                    value={editAbout?.about}
                  ></textarea>
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
              <form onSubmit={handleAboutSubmit}>
                <button type="submit" className="btn btn-primary">
                  {(loading && (
                    <div
                      className="spinner-border spinner-border-sm"
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  )) ||
                    "Change About"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* about change modal close */}

      {/* change profile photo modal start */}
      {user && (
        <div
          className="modal fade"
          id="changePhoto"
          tabIndex="-1"
          aria-labelledby="changePhoto"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Change Profile Photo
                </h1>
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
                <div className="card mb-3">
                  <div className="card-body text-center shadow">
                    <Image
                      priority
                      alt="User Avatar"
                      className="rounded-circle mb-3 mt-4"
                      // src="/dashboard/assets/img/avatars/avatar1.jpg"
                      src={photoPreview || user?.profilePic.url || defaultImage}
                      width={160}
                      height={160}
                    />
                    <div className="mb-4">
                      <input
                        type="file"
                        className="form-control"
                        id="inputGroupFile02"
                        name="profilePic"
                        onChange={handleNewPhotoChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <form onSubmit={handlePhotoSubmit}>
                  <button type="submit" className="btn btn-primary">
                    {(loading && (
                      <div
                        className="spinner-border spinner-border-sm"
                        role="status"
                      >
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    )) ||
                      "Change Photo"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* change profile photo modal end */}

      <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></Script>
      {/* <Script src="/dashboard/assets/js/bs-init.js"></Script>
      <Script src="/dashboard/assets/js/theme.js"></Script> */}
    </>
  );
}
