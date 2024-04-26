"use client";

import "@/app/dashboard.min.css";
import Loading from "@/components/dashboard/Loading";
import { PLANS } from "@/config/stripe";
import axios from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import { useRouter } from "next/navigation";
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

const INITIAL_SUB_CHANGE = {
  priceId: "",
};

const defaultImage =
  "https://t4.ftcdn.net/jpg/00/64/67/27/360_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg";

export default function Profile() {
  const router = useRouter();

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

  const [priceId, setPriceId] = useState();
  const freePlan = PLANS.find((plan) => plan.name === "Free");
  const basicPlan = PLANS.find((plan) => plan.name === "Basic");
  const proPlan = PLANS.find((plan) => plan.name === "Pro");

  const token = Cookies.get("token");

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
    //ml_default is my upload preset name
    data.append("upload_preset", "ml_default");
    //davfhdzxx is my personal cloud name
    data.append("cloud_name", "davfhdzxx");
    const url = "https://api.cloudinary.com/v1_1/davfhdzxx/image/upload";
    const response = await axios.post(url, data);
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

  async function handleSubscriptionSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      const url = "http://localhost:8080/api/subscription/changeSubscription";
      const payload = { userId: user._id, priceId };
      const response = await axios.post(url, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response) {
        getUser();
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubCancel(e) {
    e.preventDefault();
    try {
      const token = Cookies.get("token");
      setLoading(true);
      setError(null);
      const url = "http://localhost:8080/api/subscription/cancelSubscription";
      const response = await axios.post(
        url,
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response) {
        getUser();
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubInfoChange(e) {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      const url = "http://localhost:8080/api/subscription/changePaymentMethod";
      const payload = { userId: user._id };
      const response = await axios.post(url, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response) {
        router.push(response.data.url);
      }
    } catch (err) {
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
                                  Last Name:{" "}
                                  {user.name.split(" ")[1] || "No Last Name."}
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

                  <div className="card shadow mb-3">
                    <div className="card-header py-3">
                      <p className="text-primary m-0 fw-bold">Subscription</p>
                    </div>
                    <div className="card-body">
                      {user.payments.subscription !== "" && (
                        <>
                          <div className="mb-3">
                            <label className="form-label" htmlFor="username">
                              <strong>
                                Current Plan:{" "}
                                {user.extraRole === "superAdmin"
                                  ? "Admin".toUpperCase()
                                  : user.currentPlan.toUpperCase()}
                              </strong>
                              <br></br>
                            </label>
                          </div>
                          <div className="mb-3">
                            <label className="form-label" htmlFor="username">
                              <strong>
                                Subscription Status:{" "}
                                {(user.currentPlan === "free" && "Free") ||
                                  user.payments.subscription?.status.toUpperCase()}
                              </strong>
                              <br></br>
                            </label>
                          </div>
                          <div className="mb-3">
                            <label className="form-label" htmlFor="username">
                              <strong>
                                Subscription Expires:{" "}
                                {((user.currentPlan === "free" ||
                                  user.extraRole === "superAdmin") &&
                                  "NEVER") ||
                                  new Date(
                                    user.payments.subscription.validTill * 1000
                                  ).toDateString()}
                              </strong>
                              <br></br>
                            </label>
                          </div>
                          <div className="mb-3">
                            {user.payments.paymentMethod.hasCard &&
                              (user.payments.subscription.status ===
                                "canceled" ||
                                user.payments.subscription.status ===
                                  "expired" ||
                                user.currentPlan === "free") && (
                                <button
                                  className="btn btn-primary btn-sm"
                                  type="submit"
                                  data-bs-toggle="modal"
                                  data-bs-target="#subscriptionModal"
                                >
                                  Upgrade Plan
                                </button>
                              )}

                            {user.payments.paymentMethod.hasCard &&
                              user.payments.subscription.status === "active" &&
                              user.currentPlan !== "free" && (
                                <>
                                  <button
                                    className="btn btn-primary btn-sm"
                                    type="button"
                                    onClick={handleSubInfoChange}
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
                                      "Change Plan"}
                                  </button>
                                  <button
                                    className="btn btn-danger btn-sm mx-2"
                                    type="submit"
                                    onClick={handleSubCancel}
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
                                      "Cancel Subscription"}
                                  </button>
                                </>
                              )}
                            {user.payments.paymentMethod.hasCard || (
                              <p>Add payment method to change plan.</p>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="card shadow mb-3">
                    <div className="card-header py-3">
                      <p className="text-primary m-0 fw-bold">Payment Method</p>
                    </div>
                    <div className="card-body">
                      {user.payments.paymentMethod.hasCard && (
                        <>
                          <div className="mb-3">
                            <label className="form-label" htmlFor="username">
                              <strong>
                                Card Number:{" "}
                                {user.extraRole === "superAdmin"
                                  ? "Admin".toUpperCase()
                                  : `xxxx xxxx xxxx ${user.payments.paymentMethod.card.last4}`}
                              </strong>
                              <br></br>
                            </label>
                          </div>
                          <div className="mb-3">
                            <label className="form-label" htmlFor="username">
                              <strong>
                                Expiry Date:{" "}
                                {`${user.payments.paymentMethod.card.exp_month}/${user.payments.paymentMethod.card.exp_year}`}
                              </strong>
                              <br></br>
                            </label>
                          </div>
                          <div className="mb-3">
                            <label className="form-label">
                              <strong>
                                Card Brand:{" "}
                                {user.payments.paymentMethod.card.brand}
                              </strong>
                              <br></br>
                            </label>
                          </div>
                          <div className="mb-3">
                            <button
                              className="btn btn-primary btn-sm"
                              type="submit"
                              onClick={handleSubInfoChange}
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
                                "Change Payment Method"}
                            </button>
                          </div>
                        </>
                      )}
                      {!user.payments.paymentMethod.hasCard && (
                        <>
                          <div className="mb-3">
                            <label className="form-label" htmlFor="username">
                              <strong>
                                You do not have a payment method added yet.
                              </strong>
                              <br></br>
                            </label>
                          </div>
                          <div className="mb-3">
                            <button
                              className="btn btn-primary btn-sm"
                              type="submit"
                              onClick={handleSubInfoChange}
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
                                "Add Payment Method"}
                            </button>
                          </div>
                        </>
                      )}
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

      {/* subscription change modal */}
      <div
        className="modal modal-lg fade"
        id="subscriptionModal"
        tabIndex="-1"
        aria-labelledby="subscriptionModal"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Change Subscription
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
            <div
              className="modal-body"
              style={{
                backgroundColor: "#f5f6f8",
                color: "black",
              }}
            >
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
              <section className="py-4 ">
                {/* Start: Pricing Clean */}
                <div className="container py-4 py-xl-5">
                  <div className="row mb-5">
                    <div className="col-md-8 col-xl-6 text-center mx-auto">
                      <h2 className="display-6 fw-bold mb-4">Plans</h2>
                      <p className="text-muted fs-5">
                        Select 1 of the plans below to get started.
                      </p>
                    </div>
                  </div>
                  <div className="row gy-4 row-cols-1 row-cols-md-2 row-cols-lg-3">
                    <div className="col">
                      <div
                        className="card border border-secondary border-2 h-100"
                        style={{ color: "black" }}
                      >
                        <div className="card-body d-flex flex-column justify-content-between p-4">
                          <div>
                            <h6 className="fw-bold text-muted">Free</h6>
                            <h4 className="display-5 fw-bold mb-1">$0</h4>
                            <label className="form-text mb-4">per month</label>
                            <ul className="list-unstyled">
                              <li className="d-flex mb-2">
                                <span className="bs-icon-xs bs-icon-rounded bs-icon me-2">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="1em"
                                    height="1em"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="currentColor"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="icon icon-tabler icon-tabler-check fs-5 text-primary-emphasis"
                                  >
                                    <path
                                      stroke="none"
                                      d="M0 0h24v24H0z"
                                      fill="none"
                                    />
                                    <path d="M5 12l5 5l10 -10" />
                                  </svg>
                                </span>
                                <span>
                                  <b>Three</b> Basic Databases
                                </span>
                              </li>
                              <li className="d-flex mb-2">
                                <span className="bs-icon-xs bs-icon-rounded bs-icon me-2">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="1em"
                                    height="1em"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="currentColor"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="icon icon-tabler icon-tabler-check fs-5 text-primary-emphasis"
                                  >
                                    <path
                                      stroke="none"
                                      d="M0 0h24v24H0z"
                                      fill="none"
                                    />
                                    <path d="M5 12l5 5l10 -10" />
                                  </svg>
                                </span>
                                <span>
                                  <b>5</b> Users per Database.
                                </span>
                              </li>
                            </ul>
                          </div>
                          <a
                            className="btn btn-primary"
                            role="button"
                            onClick={() => setPriceId("free")}
                          >
                            {(priceId === freePlan.price.priceIds.test &&
                              "Selected") ||
                              "Select"}
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="col">
                      <div
                        className="card border border-warning border-2 h-100"
                        style={{ color: "black" }}
                      >
                        <div className="card-body d-flex flex-column justify-content-between p-4">
                          <span
                            className="badge bg-warning position-absolute top-0 end-0  text-uppercase "
                            style={{ color: "black" }}
                          >
                            Most Popular
                          </span>
                          <div>
                            <h6 className="fw-bold text-muted">Basic</h6>
                            <h4 className="display-5 fw-bold mb-1">$20</h4>
                            <label className="form-text mb-4">per month</label>

                            <ul className="list-unstyled">
                              <li className="d-flex mb-2">
                                <span className="bs-icon-xs bs-icon-rounded bs-icon me-2">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="1em"
                                    height="1em"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="currentColor"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="icon icon-tabler icon-tabler-check fs-5 text-primary-emphasis"
                                  >
                                    <path
                                      stroke="none"
                                      d="M0 0h24v24H0z"
                                      fill="none"
                                    />
                                    <path d="M5 12l5 5l10 -10" />
                                  </svg>
                                </span>
                                <span>
                                  <b>TEN</b> Advance Databases
                                </span>
                              </li>
                              <li className="d-flex mb-2">
                                <span className="bs-icon-xs bs-icon-rounded bs-icon me-2">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="1em"
                                    height="1em"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="currentColor"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="icon icon-tabler icon-tabler-check fs-5 text-primary-emphasis"
                                  >
                                    <path
                                      stroke="none"
                                      d="M0 0h24v24H0z"
                                      fill="none"
                                    />
                                    <path d="M5 12l5 5l10 -10" />
                                  </svg>
                                </span>
                                <span>
                                  <b>15</b> Users per Database
                                </span>
                              </li>
                              <li className="d-flex mb-2">
                                <span className="bs-icon-xs bs-icon-rounded bs-icon me-2">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="1em"
                                    height="1em"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="currentColor"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="icon icon-tabler icon-tabler-check fs-5 text-primary-emphasis"
                                  >
                                    <path
                                      stroke="none"
                                      d="M0 0h24v24H0z"
                                      fill="none"
                                    />
                                    <path d="M5 12l5 5l10 -10" />
                                  </svg>
                                </span>
                                <span>PDF Generation</span>
                              </li>
                            </ul>
                          </div>
                          <a
                            className="btn btn-warning"
                            role="button"
                            name="plan"
                            onClick={() =>
                              setPriceId(basicPlan.price.priceIds.test)
                            }
                          >
                            {(priceId === basicPlan.price.priceIds.test &&
                              "Selected") ||
                              "Select"}
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="col">
                      <div
                        className="card border border-secondary border-2 h-100"
                        style={{ color: "black" }}
                      >
                        <div className="card-body d-flex flex-column justify-content-between p-4">
                          <div className="pb-4">
                            <h6 className="fw-bold text-muted">Pro</h6>
                            <h4 className="display-5 fw-bold mb-1">$50</h4>
                            <label className="form-text mb-4">per month</label>
                            <ul className="list-unstyled">
                              <li className="d-flex mb-2">
                                <span className="bs-icon-xs bs-icon-rounded bs-icon me-2">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="1em"
                                    height="1em"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="currentColor"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="icon icon-tabler icon-tabler-check fs-5 text-primary-emphasis"
                                  >
                                    <path
                                      stroke="none"
                                      d="M0 0h24v24H0z"
                                      fill="none"
                                    />
                                    <path d="M5 12l5 5l10 -10" />
                                  </svg>
                                </span>
                                <span>
                                  <b>Unlimited</b> Advance Databases
                                </span>
                              </li>
                              <li className="d-flex mb-2">
                                <span className="bs-icon-xs bs-icon-rounded bs-icon me-2">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="1em"
                                    height="1em"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="currentColor"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="icon icon-tabler icon-tabler-check fs-5 text-primary-emphasis"
                                  >
                                    <path
                                      stroke="none"
                                      d="M0 0h24v24H0z"
                                      fill="none"
                                    />
                                    <path d="M5 12l5 5l10 -10" />
                                  </svg>
                                </span>
                                <span>
                                  <b>30</b> Users per Database
                                </span>
                              </li>
                              <li className="d-flex mb-2">
                                <span className="bs-icon-xs bs-icon-rounded bs-icon me-2">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="1em"
                                    height="1em"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="currentColor"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="icon icon-tabler icon-tabler-check fs-5 text-primary-emphasis"
                                  >
                                    <path
                                      stroke="none"
                                      d="M0 0h24v24H0z"
                                      fill="none"
                                    />
                                    <path d="M5 12l5 5l10 -10" />
                                  </svg>
                                </span>
                                <span>PDF Generation</span>
                              </li>
                              <li className="d-flex mb-2">
                                <span className="bs-icon-xs bs-icon-rounded bs-icon me-2">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="1em"
                                    height="1em"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="currentColor"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="icon icon-tabler icon-tabler-check fs-5 text-primary-emphasis"
                                  >
                                    <path
                                      stroke="none"
                                      d="M0 0h24v24H0z"
                                      fill="none"
                                    />
                                    <path d="M5 12l5 5l10 -10" />
                                  </svg>
                                </span>
                                <span>Real Time Notifications and Emails</span>
                              </li>
                            </ul>
                          </div>
                          <a
                            className="btn btn-primary"
                            role="button"
                            onClick={() =>
                              setPriceId(proPlan.price.priceIds.test)
                            }
                          >
                            {(priceId === proPlan.price.priceIds.test &&
                              "Selected") ||
                              "Select"}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* End: Pricing Clean */}
              </section>
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
              <form onSubmit={handleSubscriptionSubmit}>
                <button type="submit" className="btn btn-primary">
                  {(loading && (
                    <div
                      className="spinner-border spinner-border-sm"
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  )) ||
                    "Change Subscription"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* subscription change modal close */}

      <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></Script>
      {/* <Script src="/dashboard/assets/js/bs-init.js"></Script>
      <Script src="/dashboard/assets/js/theme.js"></Script> */}
    </>
  );
}
