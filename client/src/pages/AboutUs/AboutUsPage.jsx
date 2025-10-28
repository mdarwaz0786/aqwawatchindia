import { Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";

const AboutUsPage = () => {
  return (
    <>
      <Header />
      <section className="page_banner" style={{ background: 'url(assets/images/page_banner_bg.jpg)' }}>
        <div className="page_banner_overlay">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="page_banner_text wow fadeInUp">
                  <h1>About Us</h1>
                  <ul>
                    <li><Link to="/"><i className="fal fa-home-lg" /> Home</Link></li>
                    <li><Link to="/about-us">About</Link></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*PAGE BANNER START*/}

      {/*ABOUT US PAGE START*/}
      <section className="about_us mt_100">
        <div className="container">
          <div className="row justify-content-between align-items-center">
            <div className="col-xxl-5 col-md-10 col-lg-6 wow fadeInLeft">
              <div className="about_us_img">
                <div className="img">
                  <img src="assets/images/about_img.jpg" alt="about us" className="img-fluid w-100" />
                </div>
                <h3>12+ <span>Years experience</span></h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate
                  officiis architecto
                  reiciendis.
                  <span>jhon deo</span>
                </p>
              </div>
            </div>
            <div className="col-xxl-6 col-lg-6 wow fadeInRight">
              <div className="about_us_text">
                <h6>About Company</h6>
                <h2>Well-coordinated Teamwork Speaks About Us</h2>
                <p className="description">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cupiditate
                  aspernatur molestiae
                  minima pariatur consequatur voluptate sapiente deleniti soluta.</p>
                <ul>
                  <li>
                    <h4>trusted partner</h4>
                    <p>Lorem Ipsum Dolor Sit Amet Consectetur, Adipisicing Elit. Minus, Officiis Placeat
                      Iusto Quasi Adipisci Impedit Delectus Beatae Ab Maxime. Lorem Ipsum Dolor Sit Amet
                      Consectetur, Adipisicing Elit. </p>
                  </li>
                  <li>
                    <h4>quality products</h4>
                    <p>Lorem Ipsum Dolor Sit Amet Consectetur, Adipisicing Elit. Minus, Officiis Placeat
                      Iusto Quasi Adipisci Impedit Delectus Beatae Ab Maxime. Lorem Ipsum Dolor Sit Amet
                      Consectetur, </p>
                  </li>
                  <li>
                    <h4>first Delivery</h4>
                    <p>Lorem Ipsum Dolor Sit Amet Consectetur, Adipisicing Elit. Minus, Officiis Placeat
                      Iusto Quasi Adipisci Impedit Delectus Beatae Ab Maxime. Lorem Ipsum Dolor Sit Amet
                      Consectetur Adipisicing Elit Minus Officiis.</p>
                  </li>
                  <li>
                    <h4>secure payment</h4>
                    <p>Lorem Ipsum Dolor Sit Amet Consectetur, Adipisicing Elit. Minus, Officiis Placeat
                      Iusto Quasi Adipisci Impedit Delectus Beatae Ab Maxime. Lorem Ipsum Dolor Sit Amet
                      Consectetur</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about_choose mt_95 pt_100 pb_100">
        <div className="container">
          <div className="row">
            <div className="col-xxl-8 col-lg-7">
              <div className="about_choose_text">
                <div className="row">
                  <div className="col-12">
                    <div className="section_heading_2 section_heading mb_15">
                      <h3>Why we are the <span>best</span></h3>
                    </div>
                  </div>
                  <div className="col-xl-6 col-md-6 wow fadeInUp">
                    <div className="about_choose_text_box">
                      <span><i className="fal fa-tshirt" /></span>
                      <h4>quality products</h4>
                      <p>Objectively pontificate quality models before intuitive information.</p>
                    </div>
                  </div>
                  <div className="col-xl-6 col-md-6 wow fadeInUp">
                    <div className="about_choose_text_box">
                      <span><i className="fal fa-truck" /></span>
                      <h4>Fast Delivery</h4>
                      <p>Objectively pontificate quality models before intuitive information.</p>
                    </div>
                  </div>
                  <div className="col-xl-6 col-md-6 wow fadeInUp">
                    <div className="about_choose_text_box">
                      <span><i className="far fa-undo-alt" /></span>
                      <h4>return policy</h4>
                      <p>Objectively pontificate quality models before intuitive information.</p>
                    </div>
                  </div>
                  <div className="col-xl-6 col-md-6 wow fadeInUp">
                    <div className="about_choose_text_box">
                      <span><i className="fas fa-headset" /></span>
                      <h4>24/7 Service</h4>
                      <p>Objectively pontificate quality models before intuitive information.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xxl-4 col-lg-5 wow fadeInRight" data-wow-duration="1s" style={{ visibility: 'visible', animationDuration: '1s', animationName: 'fadeInRight' }}>
              <div className="about_choose_img">
                <img src="assets/images/why_choose_img.jpg" alt="about us" className="img-fluid w-100" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="counter_part ">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="counter_area">
                <ul>
                  <li className="wow fadeInUp">
                    <div className="icon">
                      <img src="assets/images/counter_icon_1.png" alt="counter" className="img-fluid w-100" />
                    </div>
                    <h2><span className="counter">950</span>+</h2>
                    <p>Happy customers</p>
                  </li>
                  <li className="wow fadeInUp">
                    <div className="icon">
                      <img src="assets/images/counter_icon_2.png" alt="counter" className="img-fluid w-100" />
                    </div>
                    <h2><span className="counter">350</span>+</h2>
                    <p>Expert Team</p>
                  </li>
                  <li className="wow fadeInUp">
                    <div className="icon">
                      <img src="assets/images/counter_icon_3.png" alt="counter" className="img-fluid w-100" />
                    </div>
                    <h2><span className="counter">35</span>+</h2>
                    <p>Award Wining</p>
                  </li>
                  <li className="wow fadeInUp">
                    <div className="icon">
                      <img src="assets/images/counter_icon_4.png" alt="counter" className="img-fluid w-100" />
                    </div>
                    <h2><span className="counter">4.9</span></h2>
                    <p>Avarage Rating</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default AboutUsPage;