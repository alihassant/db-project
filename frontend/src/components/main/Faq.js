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
                      Aenean arcu euismod aliquam, volutpat consequat?
                    </button>
                  </h2>
                  <div
                    className="accordion-collapse collapse show item-1"
                    role="tabpanel"
                    data-bs-parent="#accordion-1"
                  >
                    <div className="accordion-body">
                      <p>
                        Maecenas diam volutpat, erat quis enim cras lobortis
                        vivamus donec tempor. Congue ultrices donec turpis
                        vivamus. Laoreet aenean metus, mi nunc massa feugiat
                        duis. Pharetra erat consequat purus curae quisque, etiam
                        accumsan class.
                      </p>
                      <p className="mb-0">
                        Commodo rutrum quisque curabitur habitasse, suspendisse
                        etiam.
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
                      data-bs-target="#accordion-1 .item-2"
                      aria-expanded="false"
                      aria-controls="accordion-1 .item-2"
                    >
                      Lorem quam erat placerat mollis, rhoncus senectus?
                    </button>
                  </h2>
                  <div
                    className="accordion-collapse collapse item-2"
                    role="tabpanel"
                    data-bs-parent="#accordion-1"
                  >
                    <div className="accordion-body">
                      <p className="mb-0">
                        Nullam id dolor id nibh ultricies vehicula ut id elit.
                        Cras justo odio, dapibus ac facilisis in, egestas eget
                        quam. Donec id elit non mi porta gravida at eget metus.
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
                      Iaculis accumsan id, facilisis proin ipsum velit neque?
                    </button>
                  </h2>
                  <div
                    className="accordion-collapse collapse item-3"
                    role="tabpanel"
                    data-bs-parent="#accordion-1"
                  >
                    <div className="accordion-body">
                      <p className="mb-0">
                        Nullam id dolor id nibh ultricies vehicula ut id elit.
                        Cras justo odio, dapibus ac facilisis in, egestas eget
                        quam. Donec id elit non mi porta gravida at eget metus.
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
