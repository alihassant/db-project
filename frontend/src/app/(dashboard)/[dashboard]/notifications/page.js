"use client";

import "@/app/dashboard.min.css";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function Notifications() {
  const [user, setUser] = useState();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getUser = async () => {
    try {
      setLoading(true);
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
      // console.log(err);
    }
  };

  const getUserNotifications = async () => {
    if (user) {
      try {
        const token = Cookies.get("token");
        const response = await axios.get(
          `http://localhost:8080/api/user/getNotifications/${user._id}`,
          {
            method: "GET",
            next: {
              revalidate: 60,
            },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response) {
          const { notifications } = response.data;
          if (notifications) {
            setNotifications(notifications);
          }
        }
      } catch (err) {
        // console.log(err);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (user) {
      getUserNotifications();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <>
      <div className="col-lg-12 ">
        <div className="row mx-3">
          <div className="col">
            <div className="card shadow mb-3">
              <div className="card-header py-3">
                <h2>Notifications</h2>
              </div>
              <div className="card-body">
                {loading && (
                  <>
                    <div className="d-flex justify-content-center text-center">
                      <div
                        className="spinner-border text-primary"
                        role="status"
                      >
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  </>
                )}
                {notifications &&
                  notifications.toReversed().map((notification, index) => (
                    <div key={index} className="row mb-3">
                      <div className="col">
                        {/* <p className="fs-6 fw-lighter">
                          {notification.message}
                        </p> */}
                        <p className="fs-5 mb-0">{notification.message}</p>
                        <p className="fs-6 fw-lighter">
                          {notification.createdAt &&
                            new Date(notification.createdAt).toTimeString()}
                        </p>
                        <hr />
                      </div>
                    </div>
                  ))}
                {!loading && notifications.length === 0 && (
                  <div className="row">
                    <p className="fs-6 fw-lighter">No new notifications</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
