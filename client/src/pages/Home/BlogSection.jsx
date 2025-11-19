import { Link } from "react-router-dom";

const BlogSection = () => {
  return (
    <>
      <section className="blog_2 secpd">
        <div className="container">
          <div className="row">
            <div className="col-xl-6 col-sm-9">
              <div className="section_heading_2 section_heading">
                <h3>Our <span>News</span> &amp; Articles</h3>
              </div>
            </div>
            <div className="col-xl-6 col-sm-3">
              <div className="view_all_btn_area">
                <a className="view_all_btn" href="blog_classic.php">View all</a>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-xxl-3 col-md-6 wow fadeInUp">
              <div className="blog_item">
                <Link to="/blog-detail" className="blog_img">
                  <img src="assets/graphics/blog1.webp" alt="blog" className="img-fluid w-100" />
                </Link>
                <div className="blog_text">
                  <ul className="top">
                    <li>
                      <span>
                        <img src="assets/images/calender.png" alt="Message" className="img-fluid w-100" />
                      </span>
                      12 Mar 2025
                    </li>
                  </ul>
                  <Link className="title" to="/blog-detail">Why Every Home Needs a Water Purifier Today</Link>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat. </p>
                  <ul className="bottom">
                    <li><a href="blog_details.php">read more <i className="fas fa-long-arrow-right" /></a>
                    </li></ul>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-xxl-3 col-md-6 wow fadeInUp">
              <div className="blog_item">
                <a href="blog_details.php" className="blog_img">
                  <img src="assets/graphics/blog1.webp" alt="blog" className="img-fluid w-100" />
                </a>
                <div className="blog_text">
                  <ul className="top">
                    <li>
                      <span>
                        <img src="assets/images/calender.png" alt="Message" className="img-fluid w-100" />
                      </span>
                      12 Mar 2025
                    </li>
                  </ul>
                  <a className="title" href="blog_details.php">Breathe Easy: The Power of Modern Air Purifiers</a>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat. </p>
                  <ul className="bottom">
                    <li><a href="blog_details.php">read more <i className="fas fa-long-arrow-right" /></a>
                    </li></ul>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-xxl-3 col-md-6 wow fadeInUp">
              <div className="blog_item">
                <a href="blog_details.php" className="blog_img">
                  <img src="assets/graphics/blog1.webp" alt="blog" className="img-fluid w-100" />
                </a>
                <div className="blog_text">
                  <ul className="top">
                    <li>
                      <span>
                        <img src="assets/images/calender.png" alt="Message" className="img-fluid w-100" />
                      </span>
                      12 Mar 2025
                    </li>
                  </ul>
                  <a className="title" href="blog_details.php">Smart Ways to Maintain Your Water Purifier</a>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat. </p>
                  <ul className="bottom">
                    <li><a href="blog_details.php">read more <i className="fas fa-long-arrow-right" /></a>
                    </li></ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogSection;