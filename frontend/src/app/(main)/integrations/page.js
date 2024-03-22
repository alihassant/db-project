import Footer from "@/components/main/Footer";
import Navigation from "@/components/main/Navigation";
import Script from "next/script";
import "@/app/bootstrap.min.css";
import Image from "next/image";

export default function Integrations() {
  return (
    <>
      <Navigation />
      {/* Start: Hero Grid */}
      <section className="py-5 mt-5">
        {/* Start: Hero Clean Reverse */}
        <div className="container py-4 py-xl-5">
          <div className="row gy-4 gy-md-0">
            <div className="col-md-6 text-center text-md-start d-flex d-sm-flex d-md-flex justify-content-center align-items-center justify-content-md-start align-items-md-center justify-content-xl-center">
              <div style={{ maxWidth: 350 }}>
                <h1 className="display-5 fw-bold mb-4">
                  Skyrocket your productivity with our&nbsp;
                  <span className="underline">tools</span>.
                </h1>
                <p className="text-muted my-4">
                  Tincidunt laoreet leo, adipiscing taciti tempor. Primis
                  senectus sapien, risus donec ad fusce augue interdum.
                </p>
                <a
                  className="btn btn-primary btn-lg me-2"
                  role="button"
                  href="#"
                >
                  Button
                </a>
                <a className="btn btn-light btn-lg" role="button" href="#">
                  Button
                </a>
              </div>
            </div>
            <div className="col-md-6">
              <div>
                <Image
                  alt="Image placeholder"
                  className="rounded img-fluid w-100 fit-cover"
                  // style={{ minHeight: 300 }}
                  src="/main/assets/img/illustrations/startup.svg"
                  priority={true}
                  width={500}
                  height={500}
                />
              </div>
            </div>
          </div>
        </div>
        {/* End: Hero Clean Reverse */}
      </section>
      {/* End: Hero Grid */}
      <section className="py-5">
        {/* Start: Features Cards */}
        <div className="container py-5">
          <div
            className="row row-cols-1 row-cols-md-2 mx-auto"
            style={{ maxWidth: 900 }}
          >
            <div className="col mb-5">
              <Image
                className="rounded img-fluid"
                src="/main/assets/img/illustrations/data-management.svg"
                alt="Image placeholder"
                width={500}
                height={500}
              />
            </div>
            <div className="col d-md-flex align-items-md-end align-items-lg-center mb-5">
              <div>
                <h5 className="fs-3 fw-bold mb-4">
                  Data management&nbsp;tools
                </h5>
                <p className="text-muted mb-4">
                  Erat netus est hendrerit, nullam et quis ad cras porttitor
                  iaculis. Bibendum vulputate cras aenean.
                </p>
                <a className="fw-bold mb-3" href="#">
                  Browse tools&nbsp;
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
                    className="icon icon-tabler icon-tabler-arrow-narrow-right fs-3"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M5 12l14 0" />
                    <path d="M15 16l4 -4" />
                    <path d="M15 8l4 4" />
                  </svg>
                </a>
                <div className="d-flex">
                  <div className="bs-icon-sm bs-icon-rounded bs-icon-secondary d-flex flex-shrink-0 justify-content-center align-items-center d-inline-block bs-icon me-2">
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
                      className="icon icon-tabler icon-tabler-school"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M22 9l-10 -4l-10 4l10 4l10 -4v6" />
                      <path d="M6 10.6v5.4a6 3 0 0 0 12 0v-5.4" />
                    </svg>
                  </div>
                  <div className="bs-icon-sm bs-icon-rounded bs-icon-secondary d-flex flex-shrink-0 justify-content-center align-items-center d-inline-block bs-icon me-2">
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
                      className="icon icon-tabler icon-tabler-school"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M22 9l-10 -4l-10 4l10 4l10 -4v6" />
                      <path d="M6 10.6v5.4a6 3 0 0 0 12 0v-5.4" />
                    </svg>
                  </div>
                  <div className="bs-icon-sm bs-icon-rounded bs-icon-secondary d-flex flex-shrink-0 justify-content-center align-items-center d-inline-block bs-icon me-2">
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
                      className="icon icon-tabler icon-tabler-school"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M22 9l-10 -4l-10 4l10 4l10 -4v6" />
                      <path d="M6 10.6v5.4a6 3 0 0 0 12 0v-5.4" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="row row-cols-1 row-cols-md-2 mx-auto"
            style={{ maxWidth: 900 }}
          >
            <div className="col order-md-last mb-5">
              <Image
                alt="Image placeholder"
                className="rounded img-fluid"
                src="/main/assets/img/illustrations/javascript.svg"
                width={500}
                height={500}
              />
            </div>
            <div className="col d-md-flex align-items-md-end align-items-lg-center mb-5">
              <div className="ms-md-3">
                <h5 className="fs-3 fw-bold mb-4">
                  Data management&nbsp;tools
                </h5>
                <p className="text-muted mb-4">
                  Erat netus est hendrerit, nullam et quis ad cras porttitor
                  iaculis. Bibendum vulputate cras aenean.
                </p>
                <a className="fw-bold" href="#">
                  Browse tools&nbsp;
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
                    className="icon icon-tabler icon-tabler-arrow-narrow-right fs-3"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M5 12l14 0" />
                    <path d="M15 16l4 -4" />
                    <path d="M15 8l4 4" />
                  </svg>
                </a>
                <div className="d-flex">
                  <div className="bs-icon-sm bs-icon-rounded bs-icon-secondary d-flex flex-shrink-0 justify-content-center align-items-center d-inline-block bs-icon me-2">
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
                      className="icon icon-tabler icon-tabler-school"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M22 9l-10 -4l-10 4l10 4l10 -4v6" />
                      <path d="M6 10.6v5.4a6 3 0 0 0 12 0v-5.4" />
                    </svg>
                  </div>
                  <div className="bs-icon-sm bs-icon-rounded bs-icon-secondary d-flex flex-shrink-0 justify-content-center align-items-center d-inline-block bs-icon me-2">
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
                      className="icon icon-tabler icon-tabler-school"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M22 9l-10 -4l-10 4l10 4l10 -4v6" />
                      <path d="M6 10.6v5.4a6 3 0 0 0 12 0v-5.4" />
                    </svg>
                  </div>
                  <div className="bs-icon-sm bs-icon-rounded bs-icon-secondary d-flex flex-shrink-0 justify-content-center align-items-center d-inline-block bs-icon me-2">
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
                      className="icon icon-tabler icon-tabler-school"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M22 9l-10 -4l-10 4l10 4l10 -4v6" />
                      <path d="M6 10.6v5.4a6 3 0 0 0 12 0v-5.4" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="row row-cols-1 row-cols-md-2 mx-auto"
            style={{ maxWidth: 900 }}
          >
            <div className="col mb-5">
              <Image
                alt="Image placeholder"
                className="rounded img-fluid"
                src="/main/assets/img/illustrations/report.svg"
                width={500}
                height={500}
              />
            </div>
            <div className="col d-md-flex align-items-md-end align-items-lg-center mb-5">
              <div>
                <h5 className="fs-3 fw-bold mb-4">
                  Data management&nbsp;tools
                </h5>
                <p className="text-muted mb-4">
                  Erat netus est hendrerit, nullam et quis ad cras porttitor
                  iaculis. Bibendum vulputate cras aenean.
                </p>
                <a className="fw-bold" href="#">
                  Browse tools&nbsp;
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
                    className="icon icon-tabler icon-tabler-arrow-narrow-right fs-3"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M5 12l14 0" />
                    <path d="M15 16l4 -4" />
                    <path d="M15 8l4 4" />
                  </svg>
                </a>
                <div className="d-flex">
                  <div className="bs-icon-sm bs-icon-rounded bs-icon-secondary d-flex flex-shrink-0 justify-content-center align-items-center d-inline-block bs-icon me-2">
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
                      className="icon icon-tabler icon-tabler-school"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M22 9l-10 -4l-10 4l10 4l10 -4v6" />
                      <path d="M6 10.6v5.4a6 3 0 0 0 12 0v-5.4" />
                    </svg>
                  </div>
                  <div className="bs-icon-sm bs-icon-rounded bs-icon-secondary d-flex flex-shrink-0 justify-content-center align-items-center d-inline-block bs-icon me-2">
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
                      className="icon icon-tabler icon-tabler-school"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M22 9l-10 -4l-10 4l10 4l10 -4v6" />
                      <path d="M6 10.6v5.4a6 3 0 0 0 12 0v-5.4" />
                    </svg>
                  </div>
                  <div className="bs-icon-sm bs-icon-rounded bs-icon-secondary d-flex flex-shrink-0 justify-content-center align-items-center d-inline-block bs-icon me-2">
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
                      className="icon icon-tabler icon-tabler-school"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M22 9l-10 -4l-10 4l10 4l10 -4v6" />
                      <path d="M6 10.6v5.4a6 3 0 0 0 12 0v-5.4" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End: Features Cards */}
      </section>
      <Footer />

      <Script defer src="/main/assets/bootstrap/js/bootstrap.min.js" />
      <Script defer src="/main/assets/js/startup-modern.js" />
    </>
  );
}
