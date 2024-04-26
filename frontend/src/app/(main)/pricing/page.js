import Footer from "@/components/main/Footer";
import Navigation from "@/components/main/Navigation";
import Script from "next/script";
import "@/app/bootstrap.min.css";
import { PLANS } from "@/config/stripe";

export default function Pricing() {
  const freePlan = PLANS.find((plan) => plan.name === "Free");
  const basicPlan = PLANS.find((plan) => plan.name === "Basic");
  const proPlan = PLANS.find((plan) => plan.name === "Pro");

  return (
    <>
      <>
        <Navigation />

        <section className="py-5 mt-5">
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
                  Subscribe to one of the following plans and get access to all
                  the features and benefits.
                </p>
              </div>
            </div>
            <div className="row gy-4 row-cols-1 row-cols-md-2 row-cols-lg-3">
              <div className="col">
                <div className="card border-0 h-100">
                  <div className="card-body d-flex flex-column justify-content-between p-4">
                    <div>
                      <h6 className="fw-bold text-muted">Free</h6>
                      <h4 className="display-5 fw-bold mb-1">$0</h4>
                      <label className="form-text mb-4">per month</label>
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
                              <path
                                stroke="none"
                                d="M0 0h24v24H0z"
                                fill="none"
                              />
                              <path d="M5 12l5 5l10 -10" />
                            </svg>
                          </span>
                          <span>
                            <b>Three</b> Basic Databases
                          </span>
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
                              <path
                                stroke="none"
                                d="M0 0h24v24H0z"
                                fill="none"
                              />
                              <path d="M5 12l5 5l10 -10" />
                            </svg>
                          </span>
                          <span>
                            <b>Five</b> Users per Database.
                          </span>
                        </li>
                      </ul>
                    </div>
                    <a
                      className="btn btn-primary"
                      role="button"
                      href={`/signup?priceId=${freePlan.price.priceIds.test}`}
                    >
                      Sign Up
                    </a>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card border-warning border-2 h-100">
                  <div className="card-body d-flex flex-column justify-content-between p-4">
                    <span className="badge bg-warning position-absolute top-0 end-0 rounded-bottom-left text-uppercase text-primary">
                      Most Popular
                    </span>
                    <div>
                      <h6 className="fw-bold text-muted">Basic</h6>
                      <h4 className="display-5 fw-bold mb-1">$20</h4>
                      <label className="form-text mb-4">per month</label>

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
                              <path
                                stroke="none"
                                d="M0 0h24v24H0z"
                                fill="none"
                              />
                              <path d="M5 12l5 5l10 -10" />
                            </svg>
                          </span>
                          <span>
                            <b>TEN</b> Advance Databases
                          </span>
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
                              <path
                                stroke="none"
                                d="M0 0h24v24H0z"
                                fill="none"
                              />
                              <path d="M5 12l5 5l10 -10" />
                            </svg>
                          </span>
                          <span>
                            <b>15</b> Users per Database
                          </span>
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
                              <path
                                stroke="none"
                                d="M0 0h24v24H0z"
                                fill="none"
                              />
                              <path d="M5 12l5 5l10 -10" />
                            </svg>
                          </span>
                          <span>PDF Generation</span>
                        </li>
                      </ul>
                    </div>
                    <a
                      className="btn btn-warning"
                      role="button"
                      href={`/signup?priceId=${basicPlan.price.priceIds.test}`}
                    >
                      Sign Up
                    </a>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card border-0 h-100">
                  <div className="card-body d-flex flex-column justify-content-between p-4">
                    <div className="pb-4">
                      <h6 className="fw-bold text-muted">Pro</h6>
                      <h4 className="display-5 fw-bold mb-1">$50</h4>
                      <label className="form-text mb-4">per month</label>
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
                              <path
                                stroke="none"
                                d="M0 0h24v24H0z"
                                fill="none"
                              />
                              <path d="M5 12l5 5l10 -10" />
                            </svg>
                          </span>
                          <span>
                            <b>Unlimited</b> Advance Databases
                          </span>
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
                              <path
                                stroke="none"
                                d="M0 0h24v24H0z"
                                fill="none"
                              />
                              <path d="M5 12l5 5l10 -10" />
                            </svg>
                          </span>
                          <span>
                            <b>30</b> Users per Database
                          </span>
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
                              <path
                                stroke="none"
                                d="M0 0h24v24H0z"
                                fill="none"
                              />
                              <path d="M5 12l5 5l10 -10" />
                            </svg>
                          </span>
                          <span>PDF Generation</span>
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
                              <path
                                stroke="none"
                                d="M0 0h24v24H0z"
                                fill="none"
                              />
                              <path d="M5 12l5 5l10 -10" />
                            </svg>
                          </span>
                          <span>Real Time Notifications and Emails</span>
                        </li>
                      </ul>
                    </div>
                    <a
                      className="btn btn-primary"
                      role="button"
                      href={`/signup?priceId=${proPlan.price.priceIds.test}`}
                    >
                      Sign Up
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* End: Pricing Clean */}
        </section>
        {/* Start: Contact Us Banner */}
        <section className="py-4 py-xl-5">
          <div className="container">
            <div className="text-white bg-primary border rounded border-0 border-primary d-flex flex-column justify-content-between flex-lg-row p-4 p-md-5">
              <div className="pb-2 pb-lg-1">
                <h2 className="fw-bold text-warning mb-2">
                  Not sure which plan suits you?
                </h2>
                <p className="mb-0">
                  Contact us and we will help you choose the best plan for your
                  needs.
                </p>
              </div>
              <div className="my-2">
                <a
                  className="btn btn-light fs-5 py-2 px-4"
                  role="button"
                  href="contact"
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
    </>
  );
}
