import { Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import apis, { API_BASE_URL } from "../../api/apis";
import useFetchData from "../../hooks/useFetchData";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useCreate from "../../hooks/useCreate";

const ContactUsPage = () => {
  const { data } = useFetchData(apis.contactus.get);

  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    subject: "",
    message: "",
    from: "Contact",
  });

  const { postData, response, postError } = useCreate(apis.contactEnquiry.create);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.mobile) {
      toast.error("Name and mobile are required");
      return;
    }

    await postData(form);
  };

  useEffect(() => {
    if (response?.success) {
      toast.success("Message sent successfully ✔");
      setForm({ name: "", email: "", mobile: "", subject: "", message: "" });
    }
    if (postError) toast.error(postError);
  }, [response, postError]);

  return (
    <>
      <Header />
      {/*PAGE BANNER START*/}
      <section className="page_banner" style={{ background: 'url(assets/images/page_banner_bg.jpg)' }}>
        <div className="page_banner_overlay">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="page_banner_text wow fadeInUp">
                  <h1>Contact Us</h1>
                  <ul>
                    <li><Link to="/"><i className="fal fa-home-lg" /> Home</Link></li>
                    <li><Link to="#">Contact Us</Link></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*PAGE BANNER START*/}

      {/*CONTACT US START*/}
      <section className="contact_us mt_75">
        <div className="container">
          <div className="row">
            <div className="col-xl-4 col-md-6">
              <div className="contact_info wow fadeInUp">
                <span><img src="/assets/images/call_icon_black.png" alt="call" className="img-fluid" /></span>
                <h3>Call Us</h3>
                <a href={`callto:${data?.data?.primaryMobile}`}>{data?.data?.primaryMobile}</a>
                <a href={`callto:${data?.data?.secondaryMobile}`}>{data?.data?.secondaryMobile}</a>
              </div>
            </div>
            <div className="col-xl-4 col-md-6">
              <div className="contact_info wow fadeInUp">
                <span><img src="/assets/images/mail_icon_black.png" alt="Mail" className="img-fluid" /></span>
                <h3>Email Us</h3>
                <a href={`mailto:${data?.data?.primaryEmail}`}>{data?.data?.primaryEmail}</a>
                <a href={`mailto:${data?.data?.secondaryEmail}`}>{data?.data?.secondaryEmail}</a>
              </div>
            </div>
            <div className="col-xl-4 col-md-6">
              <div className="contact_info wow fadeInUp">
                <span><img src="/assets/images/location_icon_black.png" alt="Map" className="img-fluid" /></span>
                <h3>Our Location</h3>
                <p>{data?.data?.location}</p>
              </div>
            </div>
          </div>
          <div className="row mt_75">
            <div className="col-lg-5">
              <div className="contact_img wow fadeInLeft">
                <img src={`${API_BASE_URL}/${data?.data?.image}`} alt="contact" className="img-fluid w-100" />
                <div className="contact_hotline">
                  <h3>Hotline</h3>
                  <a href={`callto:${data?.data?.primaryMobile}`}>{data?.data?.primaryMobile}</a>
                  <div className="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-7">
              <div className="contact_form wow fadeInRight">
                <h2>Get In Touch 👋</h2>
                <form onSubmit={handleSubmit}>
                  <div className="row">

                    <div className="col-md-6">
                      <div className="single_input">
                        <label>Name</label>
                        <input
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Enter name"
                          required
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="single_input">
                        <label>Email</label>
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="Enter email"
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="single_input">
                        <label>Mobile</label>
                        <input
                          type="text"
                          name="mobile"
                          value={form.mobile}
                          onChange={handleChange}
                          placeholder="Enter mobile"
                          required
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="single_input">
                        <label>Subject</label>
                        <input
                          type="text"
                          name="subject"
                          value={form.subject}
                          onChange={handleChange}
                          placeholder="Enter subject"
                        />
                      </div>
                    </div>

                    <div className="col-md-12">
                      <div className="single_input">
                        <label>Message</label>
                        <textarea
                          name="message"
                          rows={7}
                          value={form.message}
                          onChange={handleChange}
                          placeholder="Message..."
                        ></textarea>
                      </div>

                      <button type="submit" className="common_btn">
                        send message <i className="fas fa-long-arrow-right"></i>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="contact_map mt_100 wow fadeInUp">
          <iframe src={`${data?.data?.mapLink}`} width={600} height={450} style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </section>
      {/*CONTACT US END*/}
      <Footer />
    </>
  );
};

export default ContactUsPage;