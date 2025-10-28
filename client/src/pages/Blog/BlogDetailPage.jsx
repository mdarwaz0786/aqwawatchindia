import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const BlogDetailPage = () => {
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
                  <h1>Blog Details</h1>
                  <ul>
                    <li><Link to="/"><i className="fal fa-home-lg" /> Home</Link></li>
                    <li><Link to="/blogs">Blog</Link></li>
                    <li><Link to="#">Blog Details</Link></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*PAGE BANNER END*/}

      {/*BLOG DETAILS START*/}
      <section className="blog_details blog_2 mt_75 mb_100">
        <div className="container">
          <div className="row">
            <div className="col-xl-9 col-lg-8 wow fadeInUp">
              <div className="blog_details_left">
                <div className="blog_details_img_1">
                  <img src="assets/images/blog_details_1_img.jpg" alt="img" className="img-fluid w-100" />
                </div>
                <ul className="blog_details_top d-flex flex-wrap">
                  <li>
                    <span><img src="assets/images/calender.png" alt="icon" className="img-fluid w-100" /></span>
                    March 28,2024
                  </li>
                  <li>
                    <span><img src="assets/images/user_icon_black.svg" alt="icon" className="img-fluid w-100" /></span>
                    By Douglas Lyphe
                  </li>
                  <li>
                    <span><img src="assets/images/massage.png" alt="icon" className="img-fluid w-100" /></span>
                    3 Comment
                  </li>
                </ul>
                <h2>Maximize Room in Petite Bedroom Spaces.</h2>
                <p>Many individuals and institutions invest in real estate for potential appreciation in
                  value,
                  rental income combination both. Real estate investment can be done directly by buying
                  properties or indirectly through real estate investment trusts (REITs) and other
                  investment
                  vehicles.</p>
                <ul>
                  <li>Real estate development involves the process of purchasing, improving.</li>
                  <li>Real estate markets can experience fluctuations in property values &amp; demand.</li>
                  <li>Real estate development involves the process of purchasing, improving.</li>
                </ul>
                <div className="blog_details_review">
                  <p>"Partnering with Interior was a delightful experience. Their designers showcased
                    immense
                    skill, ensuring I was always in the loop and actively participating in
                    decision-making.
                    I look forward to the opportunity to work with them again."</p>
                </div>
                <div className="row mt_20">
                  <div className="col-sm-6">
                    <div className="blog_details_center_img">
                      <img src="assets/images/blog_details_2_img.jpg" alt="img" className="img-fluid w-100" />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="blog_details_center_img">
                      <img src="assets/images/blog_details_3_img.jpg" alt="img" className="img-fluid w-100" />
                    </div>
                  </div>
                </div>
                <h4>Embracing a sophisticated yet minimalist aesthetic.</h4>
                <p>This includes single-family homes, condominiums, townhouses, and apartment buildings.
                  Residential real estate is often classified by the number of dwelling units, such as
                  single-family (one unit), duplex (two units), triplex (three units), or multi-family (four
                  or more units). This includes single-family homes, condominiums, townhouses, and apartment
                  buildings.</p>
                <ul className="blog_explaine">
                  <li>Real estate development involves the process of purchasing, improving.</li>
                  <li>This can include constructing buildings, roads, utilities, and other infrastructure.
                  </li>
                  <li>Real estate markets can experience fluctuations in property values &amp; demand.</li>
                  <li>Real estate development involves the process of purchasing, improving.</li>
                </ul>
                <h4>Embracing a sophisticated yet minimalist aesthetic.</h4>
                <p>This includes single-family homes, condominiums, townhouses, and apartment buildings.
                  Residential real estate is often classified by the number of dwelling units, such as
                  single-family (one unit), duplex (two units), triplex (three units), or multi-family (four
                  or more units). This includes single-family homes, condominiums, townhouses, and apartment
                  buildings.</p>
              </div>
              <div className="blog_shear_area">
                <div className="row">
                  <div className="col-xl-7">
                    <div className="blog_shear_area_left d-flex flex-wrap">
                      <h5>Post Tags:</h5>
                      <ul className="blog_details_tag d-flex flex-wrap">
                        <li><a href="#">Cleansing</a></li>
                        <li><a href="#">Make up</a></li>
                        <li><a href="#">eye cream</a></li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-xl-5">
                    <div className="blog_shear_area_right d-flex flex-wrap">
                      <h5>Share:</h5>
                      <ul className="d-flex flex-wrap">
                        <li><a href="#"><i className="fab fa-facebook-f" aria-hidden="true" /></a></li>
                        <li><a href="#"><i className="fab fa-twitter" aria-hidden="true" /></a></li>
                        <li><a href="#"><i className="fab fa-linkedin-in" aria-hidden="true" /></a></li>
                        <li><a href="#"><i className="fab fa-pinterest" /></a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-md-8 wow fadeInRight">
              <div id="sticky_sidebar">
                <div className="blog_details_right">
                  <form action="#">
                    <input type="text" placeholder="Search..." />
                    <button type="submit"><i className="far fa-search" aria-hidden="true" /></button>
                  </form>
                  <div className="blog_details_right_header sidebar_blog">
                    <h3>Popular Blog</h3>
                    <div className="popular_blog d-flex flex-wrap">
                      <div className="popular_blog_img">
                        <img src="assets/images/blog_img_1.png" alt="img" className="img-fluid w-100" />
                      </div>
                      <div className="popular_blog_text">
                        <p>
                          <span><img src="assets/images/calender.png" alt="icon" className="img-fluid w-100" /></span>
                          March 23, 2024
                        </p>
                        <a className="title" href="blog_details.html">The Best Delicious Coffee Shop In
                          Bangkok
                          China.</a>
                      </div>
                    </div>
                    <div className="popular_blog d-flex flex-wrap">
                      <div className="popular_blog_img">
                        <img src="assets/images/blog_img_2.png" alt="img" className="img-fluid w-100" />
                      </div>
                      <div className="popular_blog_text">
                        <p>
                          <span><img src="assets/images/calender.png" alt="icon" className="img-fluid w-100" /></span>
                          March 24, 2024
                        </p>
                        <a className="title" href="blog_details.html">Luxury top-floor properties
                          available for
                          purchase.</a>
                      </div>
                    </div>
                    <div className="popular_blog d-flex flex-wrap">
                      <div className="popular_blog_img">
                        <img src="assets/images/blog_img_3.png" alt="img" className="img-fluid w-100" />
                      </div>
                      <div className="popular_blog_text">
                        <p>
                          <span><img src="assets/images/calender.png" alt="icon" className="img-fluid w-100" /></span>
                          March 25, 2024
                        </p>
                        <a className="title" href="blog_details.html">Skills that you can learn the
                          Real Estate
                          Market.</a>
                      </div>
                    </div>
                  </div>
                  <div className="blog_details_right_header">
                    <h3> Categories</h3>
                    <ul className="sidebar_blog_category">
                      <li>
                        <a href="blog_classic.html">
                          <p>Make up</p>
                          <span>(07)</span>
                        </a>
                      </li>
                      <li>
                        <a href="blog_classic.html">
                          <p>Skin care</p>
                          <span>(14)</span>
                        </a>
                      </li>
                      <li>
                        <a href="blog_classic.html">
                          <p>Fashion and beauty</p>
                          <span>(34)</span>
                        </a>
                      </li>
                      <li>
                        <a href="blog_classic.html">
                          <p>Cosnetics</p>
                          <span>(05)</span>
                        </a>
                      </li>
                      <li>
                        <a href="blog_classic.html">
                          <p>Body care</p>
                          <span>(18)</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*BLOG DETAILS END*/}
      <Footer />
    </>
  );
};

export default BlogDetailPage;