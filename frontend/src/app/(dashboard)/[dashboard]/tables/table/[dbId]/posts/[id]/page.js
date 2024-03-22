"use client";

import "@/app/dashboard.min.css";
import Loading from "@/components/dashboard/Loading";
import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";
import getData from "@/app/api/table/tableData/[id]/route";
import Link from "next/link";
import Cookies from "js-cookie";

const INITIAL_UPDATE_ENTRY = {
  dbId: "",
};

const INITIAL_REMOVE_ENTRY = {
  dbId: "",
  userId: "",
  postId: "",
};

export default function Post({ params }) {
  // const router = useRouter();

  const [successMessage, setSuccessMessage] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [totalHeaders, setTotalHeaders] = useState();
  const [updatedEntry, setUpdatedEntry] = useState(INITIAL_UPDATE_ENTRY);
  const [username, setUsername] = useState();
  const [images, setImages] = useState();
  const [photoPreview, setPhotoPreview] = useState();
  const [db, setDb] = useState();

  let userId = "";

  // const path = usePathname();
  const dbId = params.dbId;
  const postId = params.id;
  INITIAL_UPDATE_ENTRY.dbId = dbId;
  INITIAL_REMOVE_ENTRY.dbId = dbId;
  INITIAL_REMOVE_ENTRY.postId = postId;

  const [post, setPost] = useState();
  const [tHeaders, setTHeaders] = useState();

  const getPost = async () => {
    try {
      const token = Cookies.get("token");
      const response = await axios.get(
        `http://localhost:8080/api/db/getPost/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response) {
        const { post } = response.data;
        const { tData } = post;
        const { username: creator } = response.data;
        const { images } = post;
        if (images) {
          setImages(images);
        }

        setUsername(creator);

        if (post) {
          setPost(post);
          setUpdatedEntry((prev) => ({ ...prev, ...tData }));
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getDb = async () => {
    try {
      const response = await getData(dbId);

      if (response) {
        const posts = response.db.posts;
        const { tHeaders } = response.db;
        const { totalHeaders } = response.db;
        const { media } = response.db;

        if (posts) {
          setDb(response.db);
          setTHeaders(tHeaders);
          setTotalHeaders(totalHeaders);
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
          userId = user._id;
          setUpdatedEntry((prev) => ({ ...prev, userId: user._id }));
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  INITIAL_REMOVE_ENTRY.userId = user?._id;

  function handleChange(e) {
    const { name, value, files } = e.target;
    if (files) {
      setUpdatedEntry((prev) => ({ ...prev, [name]: files[0] }));
      setPhotoPreview(URL.createObjectURL(files[0]));
    } else {
      setUpdatedEntry((prev) => ({ ...prev, [name]: value }));
    }
  }

  async function handleImageUpload() {
    const data = new FormData();
    data.append("file", updatedEntry.images);
    data.append("upload_preset", process.env.CLOUDINARY_UPLOAD_PRESET);
    data.append("cloud_name", process.env.CLOUDINARY_CLOUD_NAME);
    const response = await axios.post(process.env.CLOUDINARY_UPLOAD_URL, data);
    const images = {
      url: response.data.url,
      publicId: response.data.public_id,
    };

    setUpdatedEntry((prev) => ({ ...prev, images }));
    return images;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const token = Cookies.get("token");
      setLoading(true);
      setSuccessMessage(null);
      setError(null);
      if (db.media) {
        const images = await handleImageUpload();
        const url = `http://localhost:8080/api/post/updateData/${postId}`;
        const payload = { ...updatedEntry, images };
        const response = await axios.post(url, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        getPost();
        setSuccessMessage(response.data.message);
        console.log("Entry Updated Successfully!!!");
      } else {
        const url = `http://localhost:8080/api/post/updateData/${postId}`;
        const payload = { ...updatedEntry, images: null };
        const response = await axios.post(url, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        getPost();
        setSuccessMessage(response.data.message);
        console.log("Entry Updated Successfully!!!");
      }

    } catch (err) {
      setSuccessMessage(null);
      setError(err.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  const [removeEntry, setRemoveEntry] = useState(INITIAL_REMOVE_ENTRY);

  async function handleRemoveSubmit(e) {
    e.preventDefault();
    try {
      const token = Cookies.get("token");
      setLoading(true);
      setError(null);


      const url = `http://localhost:8080/api/post/deletePost`;
      const payload = { ...removeEntry };
      const response = await axios.post(url, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setError(null);
      setSuccessMessage(response.data.message);
      window.location.pathname = `/dashboard/tables/table/${dbId}/posts`;
    } catch (err) {
      setSuccessMessage(null);
      if (err.response) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong!!!");
      }
    } finally {
      setLoading(false);
    }
  }

  async function handlePDF(e) {
    e.preventDefault();
    try {
      const token = Cookies.get("token");
      setLoading(true);
      setError(null);
      const url = `http://localhost:8080/api/db/getPostPDF/${dbId}/${postId}`;
      const response = await axios.get(url, {
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const pdfBlob = new Blob([response.data], {
        type: "application/pdf",
      });

      // Assuming you want to display the PDF in the browser
      const url1 = window.URL.createObjectURL(pdfBlob);
      window.open(url1, "_blank");

      setSuccessMessage(response.data.message);
    } catch (err) {
      setSuccessMessage(null);
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
    getPost();
    getUser();
    getDb();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {(user && (
        <div className="container-fluid">
          <h3 className="text-dark mb-4">Database Entries</h3>
          {(post && (
            <div className="card">
              <div className="card-header">
                <h5
                  className="text-primary d-md-flex justify-content-md-end m-0 fw-bold"
                  style={{ float: "left" }}
                >
                  Data{" "}
                  <span className="badge bg-info ms-2">
                    {(post.modified && "Updated") || "Original"}
                  </span>
                </h5>

                <div className="d-grid gap-2 d-md-flex justify-content-md-end d-sm-flex justify-content-sm-end ">
                  <button
                    className="btn btn-primary me-md-2 "
                    style={{ color: "white" }}
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    data-bs-whatever="@getbootstrap"
                  >
                    Update Entry
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

                {/* update modal */}
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
                          New Entry
                        </h5>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                          onClick={() => {
                            setError(null);
                            setSuccessMessage(null);
                          }}
                        ></button>
                      </div>
                      <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                          {error && (
                            <div className="alert alert-danger" role="alert">
                              {error}
                            </div>
                          )}
                          {successMessage && (
                            <div className="alert alert-success" role="alert">
                              {successMessage}
                            </div>
                          )}

                          {Array.from({ length: totalHeaders }).map(
                            (_, index) => (
                              <div className="mb-3" key={index}>
                                <label className="col-form-label">
                                  {tHeaders[0][`tH${index + 1}`]}
                                </label>
                                <input
                                  onChange={handleChange}
                                  type="text"
                                  className="form-control"
                                  name={`tD${index + 1}`}
                                  value={updatedEntry[`tD${index + 1}`]}
                                />
                              </div>
                            )
                          )}
                          {db.media && (
                            <div className="card-body text-center shadow">
                              <Image
                                priority
                                alt="User Avatar"
                                className=" mb-3 mt-4"
                                // src="/dashboard/assets/img/avatars/avatar1.jpg"
                                src={photoPreview || images[0].url}
                                width={160}
                                height={160}
                              />

                              <div className="mb-4">
                                <input
                                  type="file"
                                  className="form-control"
                                  id="inputGroupFile02"
                                  name="images"
                                  onChange={handleChange}
                                />
                              </div>
                            </div>
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
                            setSuccessMessage(null);
                          }}
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
                              "Update Entry"}
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                {/* update modal close */}
              </div>

              <div className="card-body">
                {(images &&
                  images.map((image) => {
                    return (
                      <Image
                        height={200}
                        width={200}
                        alt="image"
                        priority={true}
                        key={image}
                        src={`${image.url}`}
                      />
                    );
                  })) || <Loading />}
                <h5 className="card-title mb-3">
                  {tHeaders[0].tH1}: {post.tData.tD1}
                </h5>

                {/* {Array.from({ length: totalHeaders }).map((_, index) => {
                        <p className="card-text" key={index}>
                          {tHeaders[0].tH[index + 1]}: {post.tData.tD[index]}
                        </p>;
                      })} */}

                {Array.from({ length: totalHeaders - 1 }).map((_, index) => (
                  <p className="card-text" key={index}>
                    {tHeaders[0][`tH${index + 2}`]}:{" "}
                    {post.tData[`tD${index + 2}`]}
                  </p>
                ))}

                <p className="card-text">
                  Created At: {new Date(post.createdAt).toString()}
                </p>
                <p className="card-text">
                  Updated At: {new Date(post.updatedAt).toString()}
                </p>
                <p className="card-text ">Created By: {username}</p>
                <Link
                  href={`/dashboard/tables/table/${dbId}/posts`}
                  className="btn btn-primary"
                >
                  Go Back
                </Link>
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
                        <h5 className="modal-title" id="exampleModalLabel">
                          Remove
                        </h5>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                          onClick={() => {
                            setError(null);
                            setSuccessMessage(null);
                          }}
                        ></button>
                      </div>
                      <div className="modal-body">
                        <form onSubmit={handleRemoveSubmit}>
                          {error && (
                            <div className="alert alert-danger" role="alert">
                              {error}
                            </div>
                          )}
                          <div className="mb-3">
                            <p>Are you sure you want remove this entry?</p>
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
                            setSuccessMessage(null);
                          }}
                        >
                          Close
                        </button>
                        <form onSubmit={handleRemoveSubmit}>
                          <button type="submit" className="btn btn-danger">
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
                              "Remove Entry"}
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                {/* remove modal end  */}
                {/* remove functionality end */}
              </div>
            </div>
          )) || <Loading />}
        </div>
      )) || <Loading />}
    </>
  );
}
