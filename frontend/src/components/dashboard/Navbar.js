import { handleLogout } from "@/utils/auth";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { useEffect, useState } from "react";

const defaultImage =
  "https://t4.ftcdn.net/jpg/00/64/67/27/360_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg";

export default function Navbar({ user, notifications }) {
  const router = useRouter();
  const [unreadNotifications, setUnreadNotifications] = useState(notifications);
  const [unreadCount, setUnreadCount] = useState(0); // Track unread count

  useEffect(() => {
    // Update unreadNotifications state when notifications prop changes
    setUnreadNotifications(notifications);

    // Check if there are new notifications
    const newNotifications = notifications.filter(
      (notification) => !unreadNotifications.includes(notification)
    );

    // Increment unread count if there are new notifications
    if (newNotifications.length > 0) {
      setUnreadCount((prevCount) => prevCount + newNotifications.length);
    }
  }, [notifications, unreadNotifications]);

  const logout = () => {
    handleLogout();
    router.push("/login");
  };

  const handleNotificationsClick = () => {
    // Reset unread count to zero
    setUnreadCount(0);
  };

  return (
    <>
      <nav className="navbar navbar-expand bg-white shadow mb-4 topbar static-top navbar-light">
        <div className="container-fluid">
          <button
            className="btn btn-link d-md-none rounded-circle me-3"
            id="sidebarToggleTop"
            type="button"
          >
            <i className="fa fa-bars " />
          </button>
          <form className="d-none d-sm-inline-block me-auto ms-md-3 my-2 my-md-0 mw-100 navbar-search">
            <div className="input-group">
              <input
                className="bg-light form-control border-0 small"
                type="text"
                placeholder="Search for ..."
              />
              <button className="btn btn-primary py-0" type="button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="white"
                  className="bi bi-search"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                </svg>
              </button>
            </div>
          </form>
          <ul className="navbar-nav flex-nowrap ms-auto">
            {/* <li className="nav-item dropdown d-sm-none no-arrow">
              <a
                className="dropdown-toggle nav-link"
                aria-expanded="false"
                data-bs-toggle="dropdown"
                href="#"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  className="bi bi-search"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                </svg>
              </a>
              <div
                className="dropdown-menu dropdown-menu-end p-3 animated--grow-in"
                aria-labelledby="searchDropdown"
              >
                <form className="me-auto navbar-search w-100">
                  <div className="input-group">
                    <input
                      className="bg-light form-control border-0 small"
                      type="text"
                      placeholder="Search for ..."
                    />
                    <div className="input-group-append">
                      <button className="btn btn-primary py-0" type="button">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-search"
                          viewBox="0 0 16 16"
                        >
                          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </li> */}
            <li className="nav-item dropdown no-arrow mx-1">
              <div className="nav-item dropdown no-arrow">
                <a
                  className="dropdown-toggle nav-link"
                  aria-expanded="false"
                  data-bs-toggle="dropdown"
                  href="#"
                  onClick={handleNotificationsClick}
                >
                  {unreadCount !== 0 ? (
                    <span className="badge bg-danger badge-counter">
                      {unreadCount}
                    </span>
                  ) : null}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-bell"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6" />
                  </svg>
                </a>
                <div className="dropdown-menu dropdown-menu-end dropdown-list animated--grow-in">
                  <h6 className="dropdown-header">Notifications</h6>
                  {unreadNotifications
                    .toReversed()
                    .slice(0, 5)
                    .map((notification, index) => (
                      <a
                        key={index}
                        className="dropdown-item d-flex align-items-center"
                        href="#"
                      >
                        <div className="fw-bold">
                          <div className="">
                            <span>{notification.message || ""}</span>
                          </div>
                          <p className="small text-gray-500 mb-0">
                            {new Date(notification.createdAt).toTimeString()}
                          </p>
                        </div>
                      </a>
                    ))}
                  <Link
                    href="/dashboard/notifications"
                    className="dropdown-item text-center small text-gray-500"
                  >
                    Show All Notifications
                  </Link>
                </div>
              </div>
            </li>
            <div className="d-none d-sm-block topbar-divider" />
            <li className="nav-item dropdown no-arrow">
              <div className="nav-item dropdown no-arrow">
                <a
                  className="dropdown-toggle nav-link"
                  aria-expanded="false"
                  data-bs-toggle="dropdown"
                  href="#"
                >
                  <span className="d-none d-lg-inline me-2 text-gray-600 small">
                    {user.name}
                  </span>
                  <Image
                    alt="dog"
                    width={60}
                    height={60}
                    className="border rounded-circle img-profile"
                    src={`${user?.profilePic.url || defaultImage}`}
                  />
                </a>
                <div className="dropdown-menu shadow dropdown-menu-end animated--grow-in">
                  <Link href="/dashboard/profile" className="dropdown-item">
                    <i className="fas fa-user fa-sm fa-fw me-2 text-gray-400" />
                    &nbsp;Profile
                  </Link>
                  <a className="dropdown-item" href="/dashboard/settings">
                    <i className="fas fa-cogs fa-sm fa-fw me-2 text-gray-400" />
                    &nbsp;Settings
                  </a>
                  <a className="dropdown-item" href="#">
                    <i className="fas fa-list fa-sm fa-fw me-2 text-gray-400" />
                    &nbsp;Activity log
                  </a>
                  <div className="dropdown-divider" />
                  <button className="dropdown-item" onClick={logout}>
                    <i className="fas fa-sign-out-alt fa-sm fa-fw me-2 text-gray-400" />
                    &nbsp;Logout
                  </button>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </nav>
      <Script defer src="/dashboard/assets/js/bs-init.js" />
      <Script defer src="/dashboard/assets/js/theme.js" />
    </>
  );
}
