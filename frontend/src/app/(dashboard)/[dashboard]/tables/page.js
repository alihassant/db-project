"use client";

import "@/app/dashboard.min.css";
import Script from "next/script";
import { useEffect, useState } from "react";
import Loading from "@/components/dashboard/Loading";
import Link from "next/link";
import axios from "axios";
import Cookies from "js-cookie";

export default function Table() {
  // getting and setting the databases
  const [dbs, setDb] = useState();
  const [error, setError] = useState();

  const token = Cookies.get("token");

  const getDbs = async () => {
    try {
      const response = await axios.get("/api/database/userDatabases", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response) {
        const { dbs } = response.data;
        if (dbs.length === 0) {
          setError("Could not retrieve the databases for the user");
        }
        if (dbs) {
          setDb(dbs);
        }
      }
    } catch (err) {
      console.log(err);
      setError("No database found for the user!!!");
    }
  };

  // setting and getting the user
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
    getDbs();
  }, []);

  return (
    <>
      {(user && (
        <div className="container-fluid">
          <h3 className="text-dark mb-4">Databases</h3>
          {/* {error && <h1>{error}</h1>} */}
          {(dbs && (
            <div className="card shadow">
              <div className="card-header py-3">
                <p className="text-primary m-0 fw-bold">Database Info</p>
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
                  <table className="table my-0" id="dataTable">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Role</th>
                        <th>Posts</th>
                        <th>Users</th>
                        <th>Created At</th>
                        <th>More</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dbs.map((db) => {
                        return (
                          <tr key={db._id}>
                            <td>{db.dbId.name}</td>
                            <td>{db.dbRole}</td>
                            <td>{db.dbId.posts.length}</td>
                            <td>{db.dbId.users.length}</td>
                            <td>{new Date(db.dbId.createdAt).toString()}</td>
                            <td>
                              <Link
                                href={`/dashboard/tables/table/${db.dbId._id}`}
                                className="btn btn-primary"
                              >
                                More
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
          )) ||
            (error && <h1>{error}</h1>) || <Loading />}
        </div>
      )) || <Loading />}
      <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></Script>
      {/* <Script src="/dashboard/assets/js/bs-init.js"></Script>
      <Script src="/dashboard/assets/js/theme.js"></Script> */}
    </>
  );
}
