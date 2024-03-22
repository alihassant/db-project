import Footer from "@/components/main/Footer";
import Navigation from "@/components/main/Navigation";
import "@/app/bootstrap.min.css";
import Script from "next/script";
import Image from "next/image";

export default function Features() {
  return (
    <>
      {/* Start: Navbar Centered Links */}
      <Navigation />
      {/* End: Navbar Centered Links */}
      {/* Start: Hero With Brands */}
      <section className="py-5 mt-5">
        {/* Start: Hero Clean Reverse */}
        <div className="container py-4 py-xl-5">
          <div className="row gy-4 gy-md-0">
            <div className="col-md-6 text-center text-md-start d-flex d-sm-flex d-md-flex justify-content-center align-items-center justify-content-md-start align-items-md-center justify-content-xl-center">
              <div style={{ maxWidth: 350 }}>
                <h1 className="display-6 fw-bold mb-4">
                  Everything your team needs in one&nbsp;
                  <span className="underline">platform</span>.
                </h1>
                <p className="my-4">
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
                  priority={true}
                  className="rounded img-fluid w-100 fit-cover"
                  // style={{ minHeight: 300 }}
                  alt="Image placeholder"
                  src="/main/assets/img/illustrations/ranking.svg"
                  height={300}
                  width={500}
                />
              </div>
            </div>
          </div>
          <div className="text-center mt-5">
            <p className="mb-4" style={{ fontSize: "1.6rem" }}>
              Used by{" "}
              <span className="text-primary bg-warning p-1">
                <strong>2400+</strong>
              </span>
              &nbsp;of the best companies in the world.
            </p>
            <a href="#">
              {" "}
              <Image
                className="m-3"
                src="/main/assets/img/brands/instacart.png"
                width={130}
                alt="image"
                height={30}
              />
            </a>
            <a href="#">
              {" "}
              <Image
                className="m-3"
                src="/main/assets/img/brands/kickstarter.png"
                width={140}
                alt="Image placeholder"
                height={30}
              />
            </a>
            <a href="#">
              {" "}
              <Image
                className="m-3"
                src="/main/assets/img/brands/lyft.png"
                width={50}
                alt="Image placeholder"
                height={30}
              />
            </a>
            <a href="#">
              {" "}
              <Image
                className="m-3"
                src="/main/assets/img/brands/shopify.png"
                width={100}
                alt="Image placeholder"
                height={30}
              />
            </a>
            <a href="#">
              {" "}
              <Image
                className="m-3"
                src="/main/assets/img/brands/pinterest.png"
                width={110}
                alt="Image placeholder"
                height={30}
              />
            </a>
            <a href="#">
              {" "}
              <Image
                className="m-3"
                src="/main/assets/img/brands/twitter.png"
                width={40}
                alt="Image placeholder"
                height={30}
              />
            </a>
          </div>
        </div>
        {/* End: Hero Clean Reverse */}
      </section>
      {/* End: Hero With Brands */}
      <section>
        {/* Start: Features Centered Icons */}
        <div className="container py-4 py-xl-5">
          <div className="row mb-5">
            <div className="col-md-8 col-xl-6">
              <h3 className="display-6 fw-bold pb-4 mb-4">
                Features that make your team more&nbsp;
                <span className="underline">productive</span>
              </h3>
            </div>
            <div className="col-md-8 col-xl-6 pt-4">
              <p className="text-muted">
                Libero tincidunt magna, leo tempus aenean. Adipiscing vestibulum
                vehicula vel donec pulvinar aliquam, blandit lorem.
              </p>
            </div>
          </div>
          <div className="row gy-4 row-cols-1 row-cols-md-2 row-cols-xl-3">
            <div className="col">
              <div className="card border-light border-1 d-flex justify-content-center p-4">
                <div className="card-body">
                  <div>
                    <div className="bs-icon-lg bs-icon-rounded bs-icon-secondary d-flex flex-shrink-0 justify-content-center align-items-center d-inline-block mb-4 bs-icon">
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
                    <h4 className="fw-bold">Title</h4>
                    <p className="text-muted">
                      Erat netus est hendrerit, nullam et quis ad cras porttitor
                      iaculis. Bibendum vulputate cras aenean.
                    </p>
                    <a className="fw-bold" href="#">
                      Learn more&nbsp;
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
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card border-light border-1 d-flex justify-content-center p-4">
                <div className="card-body">
                  <div>
                    <div className="bs-icon-lg bs-icon-rounded bs-icon-secondary d-flex flex-shrink-0 justify-content-center align-items-center d-inline-block mb-4 bs-icon">
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
                    <h4 className="fw-bold">Title</h4>
                    <p className="text-muted">
                      Erat netus est hendrerit, nullam et quis ad cras porttitor
                      iaculis. Bibendum vulputate cras aenean.
                    </p>
                    <a className="fw-bold" href="#">
                      Learn more&nbsp;
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
                  </div>
                </div>
              </div>
            </div>
            <div className="col d-flex justify-content-between flex-xl-column">
              <div className="card border-light border-1 d-flex flex-grow-1 justify-content-center p-2 me-3 me-xl-0 mb-xl-4">
                <div className="card-body">
                  <div className="bs-icon-md bs-icon-rounded bs-icon-secondary d-flex flex-shrink-0 justify-content-center align-items-center d-inline-block mb-4 bs-icon">
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
                  <div className="d-flex justify-content-between align-items-center">
                    <h4 className="fw-bold mb-0">Title</h4>
                    <a className="fw-bold" href="#">
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
                  </div>
                </div>
              </div>
              <div className="card border-light border-1 d-flex flex-grow-1 justify-content-center p-2">
                <div className="card-body">
                  <div className="bs-icon-md bs-icon-rounded bs-icon-secondary d-flex flex-shrink-0 justify-content-center align-items-center d-inline-block mb-4 bs-icon">
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
                  <div className="d-flex justify-content-between align-items-center">
                    <h4 className="fw-bold mb-0">Title</h4>
                    <a className="fw-bold" href="#">
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End: Features Centered Icons */}
      </section>
      <section className="py-5">
        {/* Start: Features Cards */}
        <div className="container">
          <div className="row">
            <div className="col-md-4 mb-5">
              <Image
                className="rounded img-fluid"
                src="/main/assets/img/illustrations/presentation-2.svg"
                width={500}
                height={500}
                alt="Image placeholder"
              />
            </div>
            <div className="col d-md-flex align-items-md-end align-items-lg-center mb-5">
              <div className="row gy-4 row-cols-1 row-cols-md-2 flex-grow-1">
                <div className="col">
                  <div className="card border-light border-1 d-flex justify-content-center p-4">
                    <div className="card-body">
                      <div>
                        <h4 className="fw-bold">Title</h4>
                        <p className="text-muted d-none d-xl-block">
                          Erat netus est hendrerit, nullam et quis ad cras
                          porttitor iaculis. Bibendum vulputate cras aenean.
                        </p>
                        <a className="fw-bold" href="#">
                          Learn more&nbsp;
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
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="card border-light border-1 d-flex justify-content-center p-4">
                    <div className="card-body">
                      <div>
                        <h4 className="fw-bold">Title</h4>
                        <p className="text-muted d-none d-xl-block">
                          Erat netus est hendrerit, nullam et quis ad cras
                          porttitor iaculis. Bibendum vulputate cras aenean.
                        </p>
                        <a className="fw-bold" href="#">
                          Learn more&nbsp;
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
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col d-md-flex align-items-md-end align-items-lg-center mb-5">
              <div className="row gy-4 row-cols-1 row-cols-md-2 flex-grow-1">
                <div className="col">
                  <div className="card border-light border-1 d-flex justify-content-center p-4">
                    <div className="card-body">
                      <div>
                        <h4 className="fw-bold">Title</h4>
                        <p className="text-muted d-none d-xl-block">
                          Erat netus est hendrerit, nullam et quis ad cras
                          porttitor iaculis. Bibendum vulputate cras aenean.
                        </p>
                        <a className="fw-bold" href="#">
                          Learn more&nbsp;
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
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="card border-light border-1 d-flex justify-content-center p-4">
                    <div className="card-body">
                      <div>
                        <h4 className="fw-bold">Title</h4>
                        <p className="text-muted d-none d-xl-block">
                          Erat netus est hendrerit, nullam et quis ad cras
                          porttitor iaculis. Bibendum vulputate cras aenean.
                        </p>
                        <a className="fw-bold" href="#">
                          Learn more&nbsp;
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
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 order-first order-md-last mb-5">
              <Image
                className="rounded img-fluid"
                src="/main/assets/img/illustrations/video-call.svg"
                width={500}
                height={500}
                alt="Image placeholder"
              />
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
