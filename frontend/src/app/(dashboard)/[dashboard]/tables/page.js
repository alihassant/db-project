"use client";

import "@/app/dashboard.min.css";
import Script from "next/script";
import { useEffect, useState } from "react";
import Loading from "@/components/dashboard/Loading";
import axios from "axios";
import Cookies from "js-cookie";
import DbsTable from "@/components/dashboard/tables/DbsTable";

export default function Table() {
  // getting and setting the databases
  const [dbs, setDb] = useState();
  // const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const token = Cookies.get("token");
  console.log();

  const getDbs = async () => {
    try {
      const response = await axios.get("/api/database/userDatabases");
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
              <DbsTable dbs={dbs} />
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
