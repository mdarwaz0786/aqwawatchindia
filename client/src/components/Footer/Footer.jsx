import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      {/*FOOTER 2 START*/}
      <div className="footer_info">
        <div className="container">
          <div className="row wow fadeInUp" style={{ visibility: 'visible', animationName: 'fadeInUp' }}>
            <div className="col-lg-3 col-sm-6">
              <div className="footer_info_item">
                <div className="icon">
                  <img src="assets/images/feature-icon_1.svg" alt="Icon" className="img-fluid w-100" />
                </div>
                <div className="text">
                  <h3>Trusted by 50k+ Customers</h3>
                  <p>Because quality builds trust — one customer at a time.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6">
              <div className="footer_info_item">
                <div className="icon">
                  <img src="assets/images/feature-icon_2.svg" alt="Icon" className="img-fluid w-100" />
                </div>
                <div className="text">
                  <h3>Verified Professionals</h3>
                  <p>Certified experts you can rely on, every single visit.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6">
              <div className="footer_info_item">
                <div className="icon">
                  <img src="assets/images/feature-icon_3.svg" alt="Icon" className="img-fluid w-100" />
                </div>
                <div className="text">
                  <h3>After Sales &amp; Support</h3>
                  <p> We’re with you even after the purchase — always.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6">
              <div className="footer_info_item">
                <div className="icon">
                  <img src="assets/images/feature-icon_4.svg" alt="Icon" className="img-fluid w-100" />
                </div>
                <div className="text">
                  <h3>Hassle-Free Booking</h3>
                  <p>Book your service in seconds — no calls, no chaos.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="footer_2">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-xl-5 col-md-6 col-lg-3 wow fadeInUp" data-wow-delay=".7s">
              <div className="footer_link">
                <h3>About Us</h3>
                <p>At Aquawatch India, we are committed to redefining purity, innovation, and sustainability. With years of expertise in water and air purification systems, we provide advanced solutions that ensure healthier living and cleaner environments — from households to industries.</p>
                <p>Our product range includes Water Purifiers, Softeners, Ionizers, Storage Tanks, Air Purifiers, Industrial WTP/STP/ETP systems, Chimneys, Organic Waste Composting Machines, and Cleaning Essentials — all designed to deliver efficiency, reliability, and long-term performance.</p>
                <p>We believe that clean water and pure air are not luxuries, but essentials. That’s why every Aquawatch product is built with cutting-edge technology, verified quality, and eco-conscious design to make everyday living smarter, safer, and more sustainable.</p>
              </div>
            </div>
            <div className="col-xl-2 col-sm-6 col-md-4 col-lg-2 wow fadeInUp" data-wow-delay="1.3s">
              <div className="footer_link">
                <h3>Quick Links</h3>
                <ul>
                  <li><Link to="/"> Home</Link></li>
                  <li><Link to="/about-us"> About Us </Link></li>
                  <li><Link to="/products"> Products</Link></li>
                  <li><Link to="/blogs"> Blogs</Link></li>
                  <li><Link to="/contact-us"> Contact Us</Link></li>
                  <li><Link to="/become-vendor">Become a Trade Partner</Link></li>
                </ul>
              </div>
            </div>
            <div className="col-xl-2 col-sm-6 col-md-4 col-lg-2 wow fadeInUp" data-wow-delay="1.6s">
              <div className="footer_link">
                <h3>Company Policies</h3>
                <ul>
                  <li><Link to="/terms-conditions">Terms &amp;  Conditions</Link></li>
                  <li><Link to="/return-refund-policy">Return and Refund Policy </Link></li>
                  <li><Link to="/billing-shipping-policy">Billing and Shipping Policy</Link></li>
                  <li><Link to="/cookie-policy">Cookie Policy</Link></li>
                  <li><Link to="/privacy-policy">Privacy  Policies</Link></li>
                  <li><a href="disclaimer.php">Disclaimer</a></li>
                </ul>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6 col-md-4 col-lg-3 wow fadeInUp" data-wow-delay="1.9s">
              <div className="footer_link footer_logo_area">
                <h3>Contact Us</h3>
                <p>Have questions or need support? Our team is always ready to help you find the perfect solution for your home or business.</p>
                <span>
                  <b><img src="assets/images/location_icon_white.png" alt="Map" className="img-fluid" /></b>
                  Plot No: 2000, Street No: 03, Industrial Area Laxman Vihar Phase : II , Gurugram , Haryana (122001)</span>
                <span>
                  <b><img src="assets/images/phone_icon_white.png" alt="Call" className="img-fluid" /></b>
                  <a href="callto:7011781706">7011781706, 9212627964</a>
                </span>
                <span>
                  <b><img src="assets/images/mail_icon_white.png" alt="Mail" className="img-fluid" /></b>
                  <a href="mailto:support@mail.com">info@aquawatchindia.com</a>
                </span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="footer_copyright">
                <p>Copyright @ <b>Aquawatch India</b> 2025. All right reserved.</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
      {/*FOOTER 2 END*/}

      {/*SCROLL BUTTON START*/}
      <div className="progress-wrap">
        <svg className="progress-circle svg-content" width="100%" height="100%" viewBox="-1 -1 102 102">
          <path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98" />
        </svg>
      </div>
      {/*SCROLL BUTTON END*/}
    </>
  );
};

export default Footer;