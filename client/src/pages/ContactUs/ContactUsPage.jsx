import { Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import useFetch from "../../hooks/useFetch";
import apis from "../../api/apis";

const ContactUsPage = () => {
  const { data } = useFetch(apis.home.getAll);
  const categories = data?.data?.category;

  return (
    <>
      <Header categories={categories} />
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
                    <li><Link to="/contact-us">Contact Us</Link></li>
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
                <span><img src="assets/images/call_icon_black.png" alt="call" className="img-fluid" /></span>
                <h3>Call Us</h3>
                <a href="callto:12345678901">+44 20 9994 7740</a>
                <a href="callto:12345678901">+44 30 7772 8830</a>
              </div>
            </div>
            <div className="col-xl-4 col-md-6">
              <div className="contact_info wow fadeInUp">
                <span><img src="assets/images/mail_icon_black.png" alt="Mail" className="img-fluid" /></span>
                <h3>Email Us</h3>
                <a href="mailto:example@gmail.com">support@yourdomain.com</a>
                <a href="mailto:example@gmail.com">hellow@yourdomain.com</a>
              </div>
            </div>
            <div className="col-xl-4 col-md-6">
              <div className="contact_info wow fadeInUp">
                <span><img src="assets/images/location_icon_black.png" alt="Map" className="img-fluid" /></span>
                <h3>Our Location</h3>
                <p>37 W 24th St, Blackwell Street Creek,
                  10th Avenue, New York</p>
              </div>
            </div>
          </div>
          <div className="row mt_75">
            <div className="col-lg-5">
              <div className="contact_img wow fadeInLeft">
                <img src="assets/images/contact_message.jpg" alt="contact" className="img-fluid w-100" />
                <div className="contact_hotline">
                  <h3>Hotline</h3>
                  <a href="callto:+123324587939">+123 324 5879 39</a>
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
                <form action="#">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="single_input">
                        <label>name</label>
                        <input type="text" placeholder="Jhon Deo" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="single_input">
                        <label>email</label>
                        <input type="email" placeholder="example@Zenis.com" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="single_input">
                        <label>phone</label>
                        <input type="text" placeholder={+96512344854475} />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="single_input">
                        <label>Subject</label>
                        <input type="text" placeholder="Subject" />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="single_input">
                        <label>Message</label>
                        <textarea rows={7} placeholder="Message..." defaultValue={""} />
                      </div>
                      <button className="common_btn">send message <i className="fas fa-long-arrow-right" /></button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="contact_map mt_100 wow fadeInUp">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3104.8776746534986!2d-77.027541687759!3d38.903912546200644!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b7b7931d95b707%3A0x16e85cf5a8a5fdce!2sMarriott%20Marquis%20Washington%2C%20DC!5e0!3m2!1sen!2sbd!4v1700767199965!5m2!1sen!2sbd" width={600} height={450} style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </div>
      </section>
      {/*CONTACT US END*/}
      <Footer />
    </>
  );
};

export default ContactUsPage;