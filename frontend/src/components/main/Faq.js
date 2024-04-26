export default function Faq() {
  return (
    <>
      {/* Start: FAQ */}
      <section className="py-4 py-xl-5 mb-5">
        <div className="container">
          <div className="row mb-2">
            <div className="col-md-8 col-xl-6 text-center mx-auto">
              <h2 className="display-6 fw-bold mb-5">
                <span className="pb-3 underline">
                  FAQ
                  <br />
                </span>
              </h2>
              <p className="text-muted mb-5">
                Curae hendrerit donec commodo hendrerit egestas tempus, turpis
                facilisis nostra nunc. Vestibulum dui eget ultrices.
              </p>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-md-8 mx-auto">
              <div
                className="accordion text-muted"
                role="tablist"
                id="accordion-1"
              >
                <div className="accordion-item">
                  <h2 className="accordion-header" role="tab">
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#accordion-1 .item-1"
                      aria-expanded="true"
                      aria-controls="accordion-1 .item-1"
                    >
                      What is Vortaps?
                    </button>
                  </h2>
                  <div
                    className="accordion-collapse collapse show item-1"
                    role="tabpanel"
                    data-bs-parent="#accordion-1"
                  >
                    <div className="accordion-body">
                      <p>
                        Vortaps is a powerful SaaS platform that empowers users
                        to create dynamic databases and manage their data
                        efficiently. With features like customizable database
                        creation, PDF generation, real-time notifications, and
                        more, Vortaps is designed to streamline data management
                        tasks for businesses and organizations of all sizes.
                      </p>
                      {/* <p className="mb-0">
                        Commodo rutrum quisque curabitur habitasse, suspendisse
                        etiam.
                      </p> */}
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" role="tab">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#accordion-1 .item-2"
                      aria-expanded="false"
                      aria-controls="accordion-1 .item-2"
                    >
                      How does Vortaps work?
                    </button>
                  </h2>
                  <div
                    className="accordion-collapse collapse item-2"
                    role="tabpanel"
                    data-bs-parent="#accordion-1"
                  >
                    <div className="accordion-body">
                      <p className="mb-0">
                        Vortaps provides users with an intuitive dashboard where
                        they can create and customize databases according to
                        their specific needs. Users can add fields, upload data,
                        set up notifications, and more, all within the
                        platform&apos;s user-friendly interface. Additionally,
                        Vortaps offers subscription plans with varying features
                        and benefits to cater to different user requirements.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" role="tab">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#accordion-1 .item-3"
                      aria-expanded="false"
                      aria-controls="accordion-1 .item-3"
                    >
                      Is my data secure with Vortaps?
                    </button>
                  </h2>
                  <div
                    className="accordion-collapse collapse item-3"
                    role="tabpanel"
                    data-bs-parent="#accordion-1"
                  >
                    <div className="accordion-body">
                      <p className="mb-0">
                        Absolutely. At Vortaps, safeguarding your data is
                        paramount. We employ stringent security measures,
                        including industry-standard encryption protocols and
                        best practices, to ensure the confidentiality and
                        integrity of your data. Rest assured, your information
                        remains protected at all times. Moreover, we do not
                        store any sensitive payment details ourselves;
                        subscription management is securely handled by Stripe, a
                        trusted payment processor renowned for its robust
                        security measures.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" role="tab">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#accordion-1 .item-4"
                      aria-expanded="false"
                      aria-controls="accordion-1 .item-4"
                    >
                      What subscription plans does Vortaps offer?
                    </button>
                  </h2>
                  <div
                    className="accordion-collapse collapse item-4"
                    role="tabpanel"
                    data-bs-parent="#accordion-1"
                  >
                    <div className="accordion-body">
                      <p className="mb-0">
                        Vortaps offers three subscription plans: Free, Basic,
                        and Pro. The Free plan allows users to create a limited
                        number of basic databases with a maximum number of users
                        per database. The Basic and Pro plans offer more
                        advanced features such as PDF generation, real-time
                        notifications, and increased database and user limits.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" role="tab">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#accordion-1 .item-5"
                      aria-expanded="false"
                      aria-controls="accordion-1 .item-5"
                    >
                      Can I upgrade or downgrade my subscription plan?
                    </button>
                  </h2>
                  <div
                    className="accordion-collapse collapse item-5"
                    role="tabpanel"
                    data-bs-parent="#accordion-1"
                  >
                    <div className="accordion-body">
                      <p className="mb-0">
                        Yes, you can upgrade or downgrade your subscription plan
                        at any time. Simply log in to your Vortaps account,
                        navigate to the subscription settings, and select the
                        plan that best suits your current needs. Your billing
                        will be adjusted accordingly, and you will have access
                        to the new plan&apos;s features immediately.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="accordion-item">
                  <h2 className="accordion-header" role="tab">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#accordion-1 .item-6"
                      aria-expanded="false"
                      aria-controls="accordion-1 .item-6"
                    >
                      Does Vortaps offer customer support?
                    </button>
                  </h2>
                  <div
                    className="accordion-collapse collapse item-6"
                    role="tabpanel"
                    data-bs-parent="#accordion-1"
                  >
                    <div className="accordion-body">
                      <p className="mb-0">
                        Yes, we provide comprehensive customer support to assist
                        you with any questions or issues you may encounter while
                        using Vortaps. Our support team is available via email
                        and will respond to your inquiries promptly to ensure
                        that you have a smooth and enjoyable experience with our
                        platform.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="accordion-item">
                  <h2 className="accordion-header" role="tab">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#accordion-1 .item-7"
                      aria-expanded="false"
                      aria-controls="accordion-1 .item-7"
                    >
                      What kind of databases can I create with Vortaps?
                    </button>
                  </h2>
                  <div
                    className="accordion-collapse collapse item-7"
                    role="tabpanel"
                    data-bs-parent="#accordion-1"
                  >
                    <div className="accordion-body">
                      <p className="mb-0">
                        Vortaps offers users the flexibility to manage a wide
                        range of data types based on their specific needs. With
                        customizable input fields, users have the freedom to
                        input and organize data according to their requirements.
                        Whether it&apos;s text, numbers, dates, or other custom
                        formats, Vortaps accommodates diverse data types to
                        facilitate comprehensive data management and analysis.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End: FAQ */}
    </>
  );
}
