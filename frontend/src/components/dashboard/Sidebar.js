import { handleLogout } from "@/utils/auth";
import axios from "axios";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Script from "next/script";

export default function Sidebar({ user }) {
  const router = useRouter();
  const pathname = usePathname();

  const logout = () => {
    handleLogout();
    router.push("/login");
  };

  return (
    <>
      <nav className="navbar align-items-start sidebar sidebar-dark accordion bg-gradient-primary p-0 navbar-dark">
        <div className="container-fluid d-flex flex-column p-0">
          <Link
            className="navbar-brand d-flex justify-content-center align-items-center sidebar-brand m-0"
            href="/"
          >
            <div className="sidebar-brand-icon rotate-n-15">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="currentColor"
                className="bi bi-database-fill"
                viewBox="0 0 16 16"
              >
                <path d="M3.904 1.777C4.978 1.289 6.427 1 8 1s3.022.289 4.096.777C13.125 2.245 14 2.993 14 4s-.875 1.755-1.904 2.223C11.022 6.711 9.573 7 8 7s-3.022-.289-4.096-.777C2.875 5.755 2 5.007 2 4s.875-1.755 1.904-2.223" />
                <path d="M2 6.161V7c0 1.007.875 1.755 1.904 2.223C4.978 9.71 6.427 10 8 10s3.022-.289 4.096-.777C13.125 8.755 14 8.007 14 7v-.839c-.457.432-1.004.751-1.49.972C11.278 7.693 9.682 8 8 8s-3.278-.307-4.51-.867c-.486-.22-1.033-.54-1.49-.972" />
                <path d="M2 9.161V10c0 1.007.875 1.755 1.904 2.223C4.978 12.711 6.427 13 8 13s3.022-.289 4.096-.777C13.125 11.755 14 11.007 14 10v-.839c-.457.432-1.004.751-1.49.972-1.232.56-2.828.867-4.51.867s-3.278-.307-4.51-.867c-.486-.22-1.033-.54-1.49-.972" />
                <path d="M2 12.161V13c0 1.007.875 1.755 1.904 2.223C4.978 15.711 6.427 16 8 16s3.022-.289 4.096-.777C13.125 14.755 14 14.007 14 13v-.839c-.457.432-1.004.751-1.49.972-1.232.56-2.828.867-4.51.867s-3.278-.307-4.51-.867c-.486-.22-1.033-.54-1.49-.972" />
              </svg>
            </div>
            <div className="sidebar-brand-text mx-3">
              <span>Vortaps</span>
            </div>
          </Link>
          <hr className="sidebar-divider my-0" />
          <ul className="navbar-nav text-light " id="accordionSidebar">
            <li className="nav-item">
              <div className=" nav-link" href="/dashboard/profile">
                <span style={{ fontSize: 16 }}>
                  {/* {user ? user.name : "Profile"} */}Welcome,{" "}
                  {user ? user.username : "User"}
                </span>
              </div>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  pathname === "/dashboard" ? "active" : ""
                }`}
                href="/dashboard"
              >
                <span style={{ fontSize: 16 }}>Dashboard</span>
              </Link>
            </li>
            {user.extraRole === "superAdmin" && (
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    pathname === "/adminPanel" ? "active" : ""
                  }`}
                  href="/dashboard/adminPanel"
                >
                  <span style={{ fontSize: 16 }}>Admin Panel</span>
                </Link>
              </li>
            )}
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  pathname === "/dashboard/profile" ? "active" : ""
                }`}
                href="/dashboard/profile"
              >
                <span style={{ fontSize: 16 }}>
                  {/* {user ? user.name : "Profile"} */}Profile
                </span>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  pathname === "/dashboard/tables" ? "active" : ""
                }`}
                href="/dashboard/tables"
              >
                <span style={{ fontSize: 16 }}>Tables</span>
              </Link>
            </li>
            <li className="nav-item">
              <button className="nav-link" onClick={logout}>
                <span style={{ fontSize: 16 }}>Logout</span>
              </button>
            </li>
          </ul>
          <div className="text-center d-none d-md-inline">
            <button
              className="btn rounded-circle border-0"
              id="sidebarToggle"
              type="button"
            ></button>
          </div>
        </div>
      </nav>
      <Script defer src="/dashboard/assets/js/bs-init.js" />
      <Script defer src="/dashboard/assets/js/theme.js" />
    </>
  );
}
