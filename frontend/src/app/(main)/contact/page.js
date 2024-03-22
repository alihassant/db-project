import Footer from "@/components/main/Footer";
import Navigation from "@/components/main/Navigation";
import Script from "next/script";
import "@/app/bootstrap.min.css";
import Faq from "@/components/main/Faq";

export default function Contact() {
  return (
    <>
      <Navigation />

      {/* Start: Contact Details */}
      <section className="py-5 mt-5">
        <div className="container py-5">
          <div className="row">
            <div className="col-md-8 col-xl-6 text-center mx-auto">
              <h2 className="display-6 fw-bold mb-4">
                Got any <span className="underline">questions</span>?
              </h2>
              <p className="text-muted">
                Our team is always here to help. Send us a message and we will get
                back to you shortly.
              </p>
            </div>
          </div>
          <div className="row d-flex justify-content-center">
            <div className="col-md-6">
              <div>
                <form
                  className="p-3 p-xl-4"
                  method="post"
                  data-bs-theme="light"
                >
                  {/* Start: Success Example */}
                  <div className="mb-3">
                    <input
                      className="shadow form-control"
                      type="text"
                      id="name-1"
                      name="name"
                      placeholder="Name"
                    />
                  </div>
                  {/* End: Success Example */}
                  {/* Start: Error Example */}
                  <div className="mb-3">
                    <input
                      className="shadow form-control"
                      type="email"
                      id="email-1"
                      name="email"
                      placeholder="Email"
                    />
                  </div>
                  {/* End: Error Example */}
                  <div className="mb-3">
                    <textarea
                      className="shadow form-control"
                      id="message-1"
                      name="message"
                      rows={6}
                      placeholder="Message"
                      defaultValue={""}
                    />
                  </div>
                  <div>
                    <button
                      className="btn btn-primary shadow d-block w-100"
                      type="submit"
                    >
                      Send{" "}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End: Contact Details */}

      <Faq />
      <Footer />

      <Script defer src="/main/assets/bootstrap/js/bootstrap.min.js" />
      <Script defer src="/main/assets/js/startup-modern.js" />
    </>
  );
}
