import Image from "next/image";
import "./bootstrap.min.css";
import Navigation from "@/components/main/Navigation";
import Footer from "@/components/main/Footer";
import Script from "next/script";
import Faq from "@/components/main/Faq";

export default function Home() {
  return (
    <>
      <Navigation />
      {/* End: Navbar Centered Links */}
      <header className="pt-5">
        {/* Start: Hero Clean Reverse */}
        <div className="container pt-4 pt-xl-5">
          <div className="row pt-5">
            <div className="col-md-8 text-center text-md-start mx-auto">
              <div className="text-center">
                <h1 className="display-4 fw-bold mb-5">
                  Tools for teams that work&nbsp;
                  <span className="underline">together</span>.
                </h1>
                <p className="fs-5 text-muted mb-5">
                  Your daily database helper.
                </p>
                <form
                  className="d-flex justify-content-center flex-wrap"
                  method="post"
                  data-bs-theme="light"
                >
                  <div className="shadow-lg mb-3">
                    <input
                      className="form-control"
                      type="email"
                      name="email"
                      placeholder="Your Email (Newsletter)"
                    />
                  </div>
                  <div className="shadow-lg mb-3">
                    <button className="btn btn-primary" type="submit">
                      Subscribe{" "}
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-12 col-lg-10 mx-auto">
              <div className="text-center position-relative">
                <Image
                  className="img-fluid"
                  src="/main/assets/img/illustrations/meeting.svg"
                  // style={{ width: 800 }}
                  style={{ height: "auto" }}
                  alt="Image"
                  priority={true}
                  width={800}
                  height={600}
                />
              </div>
            </div>
          </div>
        </div>
        {/* End: Hero Clean Reverse */}
      </header>
      <section>
        {/* Start: Features Centered Icons */}
        <div className="container py-4 py-xl-5">
          <div className="row gy-4 row-cols-1 row-cols-md-2 row-cols-lg-3">
            <div className="col">
              <div className="card border-light border-1 d-flex justify-content-center p-4">
                <div className="card-body">
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
                  <div>
                    <h4 className="fw-bold">Tailored to Your Needs</h4>
                    <p className="text-muted">
                      Whether you are a small startup or a large enterprise,
                      Vortaps offers subscription plans tailored to your
                      specific requirements. Choose from our range of plans to
                      access advanced features such as real-time notifications,
                      PDF generation, and more, all designed to enhance your
                      data management experience.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card border-light border-1 d-flex justify-content-center p-4">
                <div className="card-body">
                  <div className="bs-icon-lg bs-icon-rounded bs-icon-secondary d-flex flex-shrink-0 justify-content-center align-items-center d-inline-block mb-4 bs-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width={2}
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="icon icon-tabler icons-tabler-outline icon-tabler-shield-lock"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M12 3a12 12 0 0 0 8.5 3a12 12 0 0 1 -8.5 15a12 12 0 0 1 -8.5 -15a12 12 0 0 0 8.5 -3" />
                      <path d="M12 11m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                      <path d="M12 12l0 2.5" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="fw-bold">Robust Security Measures</h4>
                    <p className="text-muted">
                      At Vortaps, the security of your data is our top priority.
                      We employ state-of-the-art encryption protocols and
                      industry best practices to safeguard your information at
                      every step. Rest assured, your data remains secure and
                      protected with Vortaps.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card border-light border-1 d-flex justify-content-center p-4">
                <div className="card-body">
                  <div className="bs-icon-lg bs-icon-rounded bs-icon-secondary d-flex flex-shrink-0 justify-content-center align-items-center d-inline-block mb-4 bs-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width={2}
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="icon icon-tabler icons-tabler-outline icon-tabler-help"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                      <path d="M12 17l0 .01" />
                      <path d="M12 13.5a1.5 1.5 0 0 1 1 -1.5a2.6 2.6 0 1 0 -3 -4" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="fw-bold">Dedicated Support</h4>
                    <p className="text-muted">
                      Have questions or need assistance? Our dedicated support
                      team is here to help. Whether you are a seasoned user or
                      just getting started, we are committed to providing you
                      with the assistance you need to make the most of our
                      platform.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End: Features Centered Icons */}
      </section>
      <section>
        {/* Start: Hero Clean Reverse */}
        <div className="container py-4 py-xl-5">
          <div className="row">
            <div className="col-md-6">
              <h3 className="display-6 fw-bold pb-md-4">
                Features that make your team more&nbsp;
                <span className="underline">productive</span>
              </h3>
            </div>
            <div className="col-md-6 pt-4">
              <p className="text-muted mb-4">
                Libero tincidunt magna, leo tempus aenean. Adipiscing vestibulum
                vehicula vel donec pulvinar aliquam, blandit lorem.
              </p>
            </div>
          </div>
          <div className="row gy-4 gy-md-0">
            <div className="col-md-6 d-flex d-sm-flex d-md-flex justify-content-center align-items-center justify-content-md-start align-items-md-center justify-content-xl-center">
              <div>
                <div className="row gy-2 row-cols-1 row-cols-sm-2">
                  <div className="col text-center text-md-start">
                    <div className="d-flex justify-content-center align-items-center justify-content-md-start">
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
                        className="icon icon-tabler icon-tabler-sun fs-3 text-primary bg-secondary"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
                        <path d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7" />
                      </svg>
                      <h5 className="fw-bold mb-0 ms-2">Heading</h5>
                    </div>
                    <p className="text-muted my-3">
                      Auctor nisi et, habitant gravida ad lectus posuere.
                    </p>
                  </div>
                  <div className="col text-center text-md-start">
                    <div className="d-flex justify-content-center align-items-center justify-content-md-start">
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
                        className="icon icon-tabler icon-tabler-sun fs-3 text-primary bg-secondary"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
                        <path d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7" />
                      </svg>
                      <h5 className="fw-bold mb-0 ms-2">Heading</h5>
                    </div>
                    <p className="text-muted my-3">
                      Auctor nisi et, habitant gravida ad lectus posuere.
                    </p>
                  </div>
                  <div className="col text-center text-md-start">
                    <div className="d-flex justify-content-center align-items-center justify-content-md-start">
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
                        className="icon icon-tabler icon-tabler-sun fs-3 text-primary bg-secondary"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
                        <path d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7" />
                      </svg>
                      <h5 className="fw-bold mb-0 ms-2">Heading</h5>
                    </div>
                    <p className="text-muted my-3">
                      Auctor nisi et, habitant gravida ad lectus posuere.
                    </p>
                  </div>
                  <div className="col text-center text-md-start">
                    <div className="d-flex justify-content-center align-items-center justify-content-md-start">
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
                        className="icon icon-tabler icon-tabler-sun fs-3 text-primary bg-secondary"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
                        <path d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7" />
                      </svg>
                      <h5 className="fw-bold mb-0 ms-2">Heading</h5>
                    </div>
                    <p className="text-muted my-3">
                      Auctor nisi et, habitant gravida ad lectus posuere.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 order-first order-md-last">
              <div>
                <Image
                  className="rounded img-fluid w-100 fit-cover"
                  // style={{ minHeight: 300 }}
                  alt="Image"
                  height={300}
                  width={800}
                  src="/main/assets/img/illustrations/teamwork.svg"
                />
              </div>
            </div>
          </div>
        </div>
        {/* End: Hero Clean Reverse */}
      </section>
      <section>
        {/* Start: Hero Clean Reverse */}
        <div className="container py-4 py-xl-5">
          <div className="row gy-4 gy-md-0">
            <div className="col-md-6 text-center text-md-start d-flex d-sm-flex d-md-flex justify-content-center align-items-center justify-content-md-start align-items-md-center justify-content-xl-center">
              <div>
                <Image
                  className="rounded img-fluid fit-cover"
                  // style={{ minHeight: 300 }}
                  alt="Image"
                  src="/main/assets/img/illustrations/presentation.svg"
                  width={800}
                  height={600}
                />
              </div>
            </div>
            <div className="col">
              <div style={{ maxWidth: 450 }}>
                <h3 className="fw-bold pb-md-4">
                  Features that make your team more&nbsp;
                  <span className="underline">productive</span>
                </h3>
                <p className="text-muted py-4 py-md-0">
                  Venenatis leo imperdiet magna enim eu quisque, metus gravida
                  pulvinar morbi.
                </p>
                <div className="row gy-4 row-cols-2 row-cols-md-2">
                  <div className="col">
                    <div>
                      <span className="fs-2 fw-bold text-primary bg-secondary">
                        40+
                      </span>
                      <p className="fw-normal text-muted">Amazing plugins</p>
                    </div>
                  </div>
                  <div className="col">
                    <div>
                      <span className="fs-2 fw-bold text-primary bg-secondary">
                        100+
                      </span>
                      <p className="fw-normal text-muted">
                        Ready-to use templates
                      </p>
                    </div>
                  </div>
                  <div className="col">
                    <div>
                      <span className="fs-2 fw-bold text-primary bg-secondary">
                        123+
                      </span>
                      <p className="fw-normal text-muted">
                        Years of experience
                      </p>
                    </div>
                  </div>
                  <div className="col">
                    <div>
                      <span className="fs-2 fw-bold text-primary bg-secondary">
                        123+
                      </span>
                      <p className="fw-normal text-muted">
                        Years of experience
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End: Hero Clean Reverse */}
      </section>
      {/* Start: Banner Heading Image */}
      <section className="py-4 py-xl-5">
        {/* Start: 1 Row 2 Columns */}
        <div className="container">
          <div className="bg-primary border rounded border-0 border-primary overflow-hidden">
            <div className="row g-0">
              <div className="col-md-6 d-flex flex-column justify-content-center">
                <div className="text-white p-4 p-md-5">
                  <h2 className="fw-bold mb-3">
                    Ut semper sed, aptent taciti conubia.
                  </h2>
                  <p className="mb-4">
                    Tincidunt laoreet leo, adipiscing taciti tempor. Primis
                    senectus sapien, risus donec ad fusce augue interdum.
                  </p>
                  <div className="my-3">
                    <a
                      className="btn btn-secondary me-2 mt-2"
                      role="button"
                      href="#"
                    >
                      Button
                    </a>
                    <a className="btn btn-light mt-2" role="button" href="#">
                      Button
                    </a>
                  </div>
                </div>
              </div>
              <div
                className="col-md-6 order-first order-md-last"
                style={{ minHeight: 250 }}
              >
                <Image
                  className="w-100 h-100 fit-contain pt-5 pt-md-0"
                  alt="Image"
                  height={600}
                  width={800}
                  src="/main/assets/img/illustrations/web-development.svg"
                />
              </div>
            </div>
          </div>
        </div>
        {/* End: 1 Row 2 Columns */}
      </section>
      {/* End: Banner Heading Image */}
      <section className="py-5">
        {/* Start: Pricing Clean */}
        <div className="container py-4 py-xl-5">
          <div className="row mb-5">
            <div className="col-md-8 col-xl-6 text-center mx-auto">
              <h2 className="display-6 fw-bold mb-4">
                Check out
                <br />
                our <span className="underline">amazing plans</span>
              </h2>
              <p className="text-muted">
                Curae hendrerit donec commodo hendrerit egestas tempus, turpis
                facilisis nostra nunc. Vestibulum dui eget ultrices.
              </p>
            </div>
          </div>
          <div className="row gy-4 row-cols-1 row-cols-md-2 row-cols-lg-3">
            <div className="col">
              <div className="card border-0 h-100">
                <div className="card-body d-flex flex-column justify-content-between p-4">
                  <div>
                    <h6 className="fw-bold text-muted">Standard</h6>
                    <h4 className="display-5 fw-bold mb-4">$15</h4>
                    <ul className="list-unstyled">
                      <li className="d-flex mb-2">
                        <span className="bs-icon-xs bs-icon-rounded bs-icon me-2">
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
                            className="icon icon-tabler icon-tabler-check fs-5 text-primary-emphasis"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M5 12l5 5l10 -10" />
                          </svg>
                        </span>
                        <span>Lectus ut nibh quam, felis porttitor.</span>
                      </li>
                      <li className="d-flex mb-2">
                        <span className="bs-icon-xs bs-icon-rounded bs-icon me-2">
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
                            className="icon icon-tabler icon-tabler-check fs-5 text-primary-emphasis"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M5 12l5 5l10 -10" />
                          </svg>
                        </span>
                        <span>Ante nec venenatis etiam lacinia.</span>
                      </li>
                      <li className="d-flex mb-2">
                        <span className="bs-icon-xs bs-icon-rounded bs-icon me-2">
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
                            className="icon icon-tabler icon-tabler-check fs-5 text-primary-emphasis"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M5 12l5 5l10 -10" />
                          </svg>
                        </span>
                        <span>Porta suscipit netus ad ac.</span>
                      </li>
                    </ul>
                  </div>
                  <a className="btn btn-primary" role="button" href="#">
                    Button
                  </a>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card border-secondary border-2 h-100">
                <div className="card-body d-flex flex-column justify-content-between p-4">
                  <span className="badge bg-secondary position-absolute top-0 end-0 rounded-bottom-left text-uppercase text-primary">
                    Most Popular
                  </span>
                  <div>
                    <h6 className="fw-bold text-muted">Pro</h6>
                    <h4 className="display-5 fw-bold mb-4">$38</h4>
                    <ul className="list-unstyled">
                      <li className="d-flex mb-2">
                        <span className="bs-icon-xs bs-icon-rounded bs-icon me-2">
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
                            className="icon icon-tabler icon-tabler-check fs-5 text-primary-emphasis"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M5 12l5 5l10 -10" />
                          </svg>
                        </span>
                        <span>Lectus ut nibh quam, felis porttitor.</span>
                      </li>
                      <li className="d-flex mb-2">
                        <span className="bs-icon-xs bs-icon-rounded bs-icon me-2">
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
                            className="icon icon-tabler icon-tabler-check fs-5 text-primary-emphasis"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M5 12l5 5l10 -10" />
                          </svg>
                        </span>
                        <span>Ante nec venenatis etiam lacinia.</span>
                      </li>
                      <li className="d-flex mb-2">
                        <span className="bs-icon-xs bs-icon-rounded bs-icon me-2">
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
                            className="icon icon-tabler icon-tabler-check fs-5 text-primary-emphasis"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M5 12l5 5l10 -10" />
                          </svg>
                        </span>
                        <span>Porta suscipit netus ad ac.</span>
                      </li>
                    </ul>
                  </div>
                  <a className="btn btn-warning" role="button" href="#">
                    Button
                  </a>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card border-0 h-100">
                <div className="card-body d-flex flex-column justify-content-between p-4">
                  <div className="pb-4">
                    <h6 className="fw-bold text-muted">Enterprise</h6>
                    <h4 className="display-5 fw-bold mb-4">$70</h4>
                    <ul className="list-unstyled">
                      <li className="d-flex mb-2">
                        <span className="bs-icon-xs bs-icon-rounded bs-icon me-2">
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
                            className="icon icon-tabler icon-tabler-check fs-5 text-primary-emphasis"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M5 12l5 5l10 -10" />
                          </svg>
                        </span>
                        <span>Lectus ut nibh quam, felis porttitor.</span>
                      </li>
                      <li className="d-flex mb-2">
                        <span className="bs-icon-xs bs-icon-rounded bs-icon me-2">
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
                            className="icon icon-tabler icon-tabler-check fs-5 text-primary-emphasis"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M5 12l5 5l10 -10" />
                          </svg>
                        </span>
                        <span>Ante nec venenatis etiam lacinia.</span>
                      </li>
                      <li className="d-flex mb-2">
                        <span className="bs-icon-xs bs-icon-rounded bs-icon me-2">
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
                            className="icon icon-tabler icon-tabler-check fs-5 text-primary-emphasis"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M5 12l5 5l10 -10" />
                          </svg>
                        </span>
                        <span>Porta suscipit netus ad ac.</span>
                      </li>
                      <li className="d-flex mb-2">
                        <span className="bs-icon-xs bs-icon-rounded bs-icon me-2">
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
                            className="icon icon-tabler icon-tabler-check fs-5 text-primary-emphasis"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M5 12l5 5l10 -10" />
                          </svg>
                        </span>
                        <span>Morbi praesent aptent integer.</span>
                      </li>
                    </ul>
                  </div>
                  <a className="btn btn-primary" role="button" href="#">
                    Button
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End: Pricing Clean */}
      </section>

      <Faq />

      {/* Start: Contact Us Banner */}
      <section className="py-4 py-xl-5">
        <div className="container">
          <div className="text-white bg-primary border rounded border-0 border-primary d-flex flex-column justify-content-between flex-lg-row p-4 p-md-5">
            <div className="pb-2 pb-lg-1">
              <h2 className="fw-bold text-secondary mb-2">
                Not sure which plan suits you?
              </h2>
              <p className="mb-0">
                Imperdiet consectetur dolor, tristique himenaeos ultrices
                tristique neque.
              </p>
            </div>
            <div className="my-2">
              <a
                className="btn btn-light fs-5 py-2 px-4"
                role="button"
                href="/contact"
              >
                Contact us
              </a>
            </div>
          </div>
        </div>
      </section>
      {/* End: Contact Us Banner */}
      <Footer />
      <Script defer src="/main/assets/bootstrap/js/bootstrap.min.js" />
      <Script defer src="/main/assets/js/startup-modern.js" />
    </>
  );
}
