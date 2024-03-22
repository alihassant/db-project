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

let INITIAL_NEW_ENTRY = {
  dbId: "",
  userId: "",
};

export default function Table() {
  const [successMessage, setSuccessMessage] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  // getting and setting the databases

  let tDs;

  const [posts, setPosts] = useState();
  const [tHeaders, setTHeaders] = useState();
  const [headersNumber, setHeadersNumber] = useState(0);
  const [media, setMedia] = useState(false);
  const [db, setDb] = useState();
  const path = usePathname();
  const dbId = path.split("/")[4];
  INITIAL_NEW_ENTRY.dbId = dbId;

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
          setPosts(posts);
          setTHeaders(tHeaders);
          setHeadersNumber(totalHeaders);
          setMedia(media);

          if (totalHeaders) {
            for (let i = 1; i <= totalHeaders; i++) {
              tDs = `tD${i}`;
              INITIAL_NEW_ENTRY[tDs] = "";
            }
          }
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
  INITIAL_NEW_ENTRY.userId = user?._id;

  const [newEntry, setNewEntry] = useState(INITIAL_NEW_ENTRY);
  function handleChange(e) {
    const { name, value, files } = e.target;
    if (files) {
      setNewEntry((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setNewEntry((prev) => ({ ...prev, [name]: value }));
    }
  }

  async function handleImageUpload() {
    const data = new FormData();
    data.append("file", newEntry.image);
    data.append("upload_preset", process.env.CLOUDINARY_UPLOAD_PRESET);
    data.append("cloud_name", process.env.CLOUDINARY_CLOUD_NAME);
    const response = await axios.post(process.env.CLOUDINARY_UPLOAD_URL, data);
    const images = {
      imageUrl: response.data.url,
      publicId: response.data.public_id,
    };
    console.log("Image Uploaded Successfully!!!", images);
    return images;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const token = Cookies.get("token");
      setLoading(true);
      setSuccessMessage(null);
      setError(null);

      if (media) {
        const imageUrl = await handleImageUpload();
        const payload = {
          ...newEntry,
          images: { url: imageUrl.imageUrl, publicId: imageUrl.publicId },
        };
        const url = `http://localhost:8080/api/post/postData`;
        const response = await axios.post(url, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSuccessMessage(response.data.message);
      } else {
        const url = `http://localhost:8080/api/post/postData`;
        const payload = { ...newEntry };
        const response = await axios.post(url, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSuccessMessage(response.data.message);
        setNewEntry(INITIAL_NEW_ENTRY);
      }

      getDb();

      console.log("New Entry Added Successfully!!!");
    } catch (err) {
      console.log(err);
      setSuccessMessage(null);
      if (err.response) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong!!!");
      }
    } finally {
      setLoading(false);
      setNewEntry(INITIAL_NEW_ENTRY);
    }
  }

  async function handlePDF(e) {
    e.preventDefault();
    try {
      const token = Cookies.get("token");
      setLoading(true);
      const url = `http://localhost:8080/api/db/getPostsPDF/${dbId}`;
      const response = await axios.get(url, { responseType: "blob" });
      const pdfBlob = new Blob([response.data], {
        type: "application/pdf",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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
      {(user && posts && (
        <div className="container-fluid">
          <h3 className="text-dark mb-4">Database Entries</h3>
          {(!posts
            ? "No data found!!!"
            : posts && (
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
                        Add Entry
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
                              New Entry
                            </h5>
                            <button
                              type="submit"
                              className="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                              onClick={() => {
                                setSuccessMessage(null);
                                setError(null);
                              }}
                            ></button>
                          </div>
                          <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                              {error && (
                                <div
                                  className="alert alert-danger"
                                  role="alert"
                                >
                                  {error}
                                </div>
                              )}
                              {successMessage && (
                                <div
                                  className="alert alert-success"
                                  role="alert"
                                >
                                  {successMessage}
                                </div>
                              )}
                              {Array.from({ length: headersNumber }).map(
                                (_, index) => (
                                  <div key={index} className="mb-3">
                                    <label className="form-label">
                                      {tHeaders[0][`tH${index + 1}`]}
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      id={`tD${index + 1}`}
                                      aria-describedby="emailHelp"
                                      onChange={handleChange}
                                      name={`tD${index + 1}`}
                                      value={newEntry[`tD${index + 1}`]}
                                    />
                                  </div>
                                )
                              )}
                              {media && (
                                <div className="input-group mb-3">
                                  <input
                                    type="file"
                                    className="form-control"
                                    id="inputGroupFile02"
                                    name="image"
                                    onChange={handleChange}
                                  />
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
                                setSuccessMessage(null);
                                setError(null);
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
                                  "Add Entry"}
                              </button>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* new modal close */}
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
                            <th>{tHeaders[0].tH1}</th>
                            <th>{tHeaders[0].tH2}</th>
                            <th>Created At</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {posts.map((post) => {
                            return (
                              <tr key={post._id}>
                                <td>{post.tData.tD1}</td>
                                <td>{post.tData.tD2}</td>
                                <td>{new Date(post.createdAt).toString()}</td>
                                <td>
                                  <Link
                                    href={`/dashboard/tables/table/${dbId}/posts/${post._id}`}
                                    className="btn btn-primary"
                                  >
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
