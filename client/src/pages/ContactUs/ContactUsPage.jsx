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
                <span><img src="assets/images/call_icon_black.png" alt="call" className="img-fluid" /></span>
                <h3>Call Us</h3>
                <a href="callto:7011781706">+91-7011781706</a>
                <a href="callto:9212627964">+91-9212627964</a>
              </div>
            </div>
            <div className="col-xl-4 col-md-6">
              <div className="contact_info wow fadeInUp">
                <span><img src="assets/images/mail_icon_black.png" alt="Mail" className="img-fluid" /></span>
                <h3>Email Us</h3>
                <a href="mailto:info@aquawatchindia.com">info@aquawatchindia.com</a>
                <a href="mailto:help@aquawatchindia.com">help@aquawatchindia.com</a>
              </div>
            </div>
            <div className="col-xl-4 col-md-6">
              <div className="contact_info wow fadeInUp">
                <span><img src="assets/images/location_icon_black.png" alt="Map" className="img-fluid" /></span>
                <h3>Our Location</h3>
                <p>Plot No: 2000, Street No: 03, Industrial Area Laxman Vihar Phase : II , Gurugram , Haryana (122001)</p>
              </div>
            </div>
          </div>
          <div className="row mt_75">
            <div className="col-lg-5">
              <div className="contact_img wow fadeInLeft">
                <img src="assets/images/contact_message.jpg" alt="contact" className="img-fluid w-100" />
                <div className="contact_hotline">
                  <h3>Hotline</h3>
                  <a href="callto:7011781706">+91-7011781706</a>
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
          {/* <iframe src="https://www.google.com/maps/place/Phase+II,+Laxman+Vihar,+Gurgaon+Rural,+Gurugram,+Haryana+122006/@28.4825046,76.9717847,5092m/data=!3m2!1e3!4b1!4m10!1m2!2m1!1sPlot+No:+2000,+Street+No:+03,+Industrial+Area+Laxman+Vihar+Phase+:+II+,+Gurugram+,+Haryana+(122001)!3m6!1s0x390d176223c34423:0x2202f30a14a9102e!8m2!3d28.4824723!4d77.0086937!15sCmNQbG90IE5vOiAyMDAwLCBTdHJlZXQgTm86IDAzLCBJbmR1c3RyaWFsIEFyZWEgTGF4bWFuIFZpaGFyIFBoYXNlIDogSUkgLCBHdXJ1Z3JhbSAsIEhhcnlhbmEgKDEyMjAwMSmSAQxzdWJsb2NhbGl0eTPgAQA!16s%2Fg%2F11byxf8n3q?entry=ttu&g_ep=EgoyMDI1MTExNy4wIKXMDSoASAFQAw%3D%3D" width={600} height={450} style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" /> */}
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d22173.847687040714!2d76.9717846701945!3d28.482504589743144!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d176223c34423%3A0x2202f30a14a9102e!2sPhase%20II%2C%20Laxman%20Vihar%2C%20Gurgaon%20Rural%2C%20Gurugram%2C%20Haryana%20122006!5e1!3m2!1sen!2sin!4v1763720493556!5m2!1sen!2sin" width={600} height={450} style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </section>
      {/*CONTACT US END*/}
      <Footer />
    </>
  );
};

export default ContactUsPage;