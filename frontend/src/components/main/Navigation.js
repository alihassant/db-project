"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();

  return (
    <>
      {/* Start: Navbar Centered Links */}
      <div>
        <nav
          className="navbar navbar-expand-md fixed-top navbar-shrink py-3 navbar-light"
          id="mainNav"
        >
          <div className="container">
            <Link className="navbar-brand d-flex align-items-center" href="/">
              <span>Vortaps</span>
            </Link>
            <button
              data-bs-toggle="collapse"
              className="navbar-toggler"
              data-bs-target="#navcol-1"
            >
              <span className="visually-hidden">Toggle navigation</span>
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navcol-1">
              <ul className="navbar-nav mx-auto">
                <li className="nav-item">
                  <Link
                    className={`nav-link ${pathname === "/" ? "active" : ""}`}
                    href="/"
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      pathname === "/features" ? "active" : ""
                    }`}
                    href="/features"
                  >
                    Features
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      pathname === "/integrations" ? "active" : ""
                    }`}
                    href="/integrations"
                  >
                    Integrations
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      pathname === "/pricing" ? "active" : ""
                    }`}
                    href="/pricing"
                  >
                    Pricing
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      pathname === "/contact" ? "active" : ""
                    }`}
                    href="/contact"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
              <Link
                className="btn btn-primary shadow"
                role="button"
                href="/signup"
              >
                Sign up
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
