import { Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import useFetch from "../../hooks/useFetch";
import apis from "../../api/apis";

const BlogPage = () => {
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
                  <h1>Blog Classic</h1>
                  <ul>
                    <li><Link to="/"><i className="fal fa-home-lg" /> Home</Link></li>
                    <li><Link to="/blogs">Blog Classic</Link></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*PAGE BANNER START*/}

      {/*BLOG CLASSIC START*/}
      <section className="blog_classic blog_2 mt_75 mb_100">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-xxl-3 col-md-6 wow fadeInUp">
              <div className="blog_item">
                <Link to="/blog-detail" className="blog_img">
                  <img src="assets/images/blog_img_12.png" alt="blog" className="img-fluid w-100" />
                </Link>
                <div className="blog_text">
                  <ul className="top">
                    <li>
                      <span>
                        <img src="assets/images/user_icon_black.svg" alt="user" className="img-fluid w-100" />
                      </span>
                      Jhon Deo
                    </li>
                    <li>
                      <span>
                        <img src="assets/images/calender.png" alt="Message" className="img-fluid w-100" />
                      </span>
                      24 Apr 2025
                    </li>
                  </ul>
                  <Link className="title" to="/blog-detail">How To Choose The Right Sofa for your home</Link>
                  <ul className="bottom">
                    <li><Link to="/blog-detail">read more <i className="fas fa-long-arrow-right" /></Link>
                    </li><li><span><i className="far fa-comment-dots" /> 15 Comments</span></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-xxl-3 col-md-6 wow fadeInUp">
              <div className="blog_item">
                <Link to="/blog-detail" className="blog_img">
                  <img src="assets/images/blog_img_5.png" alt="blog" className="img-fluid w-100" />
                </Link>
                <div className="blog_text">
                  <ul className="top">
                    <li>
                      <span>
                        <img src="assets/images/user_icon_black.svg" alt="user" className="img-fluid w-100" />
                      </span>
                      Adnan Alvi
                    </li>
                    <li>
                      <span>
                        <img src="assets/images/calender.png" alt="Message" className="img-fluid w-100" />
                      </span>
                      12 Mar 2025
                    </li>
                  </ul>
                  <Link className="title" to="/blog-detail">How to Plop Hair for Bouncy, Beautiful Curls</Link>
                  <ul className="bottom">
                    <li><Link to="/blog-detail">read more <i className="fas fa-long-arrow-right" /></Link>
                    </li><li><span><i className="far fa-comment-dots" /> 15 Comments</span></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-xxl-3 col-md-6 wow fadeInUp">
              <div className="blog_item">
                <Link to="/blog-detail" className="blog_img">
                  <img src="assets/images/blog_img_1.png" alt="blog" className="img-fluid w-100" />
                </Link>
                <div className="blog_text">
                  <ul className="top">
                    <li>
                      <span>
                        <img src="assets/images/user_icon_black.svg" alt="user" className="img-fluid w-100" />
                      </span>
                      Adnan Alvi
                    </li>
                    <li>
                      <span>
                        <img src="assets/images/calender.png" alt="Message" className="img-fluid w-100" />
                      </span>
                      12 Mar 2025
                    </li>
                  </ul>
                  <Link className="title" to="/blog-detail">How to Plop Hair for Bouncy, Beautiful Curls</Link>
                  <ul className="bottom">
                    <li><Link to="/blog-detail">read more <i className="fas fa-long-arrow-right" /></Link>
                    </li><li><span><i className="far fa-comment-dots" /> 15 Comments</span></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-xxl-3 col-md-6 wow fadeInUp">
              <div className="blog_item">
                <a href="blog_details.php" className="blog_img">
                  <img src="assets/images/blog_img_6.png" alt="blog" className="img-fluid w-100" />
                </a>
                <div className="blog_text">
                  <ul className="top">
                    <li>
                      <span>
                        <img src="assets/images/user_icon_black.svg" alt="user" className="img-fluid w-100" />
                      </span>
                      Hasib Sing
                    </li>
                    <li>
                      <span>
                        <img src="assets/images/calender.png" alt="Message" className="img-fluid w-100" />
                      </span>
                      20 Apr 2025
                    </li>
                  </ul>
                  <a className="title" href="blog_details.php">Fast fashion: How clothes are linked to climate change</a>
                  <ul className="bottom">
                    <li><a href="blogs_details.html">read more <i className="fas fa-long-arrow-right" /></a>
                    </li><li><span><i className="far fa-comment-dots" /> 42 Comments</span></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-xxl-3 col-md-6 wow fadeInUp">
              <div className="blog_item">
                <a href="blog_details.php" className="blog_img">
                  <img src="assets/images/blog_img_2.png" alt="blog" className="img-fluid w-100" />
                </a>
                <div className="blog_text">
                  <ul className="top">
                    <li>
                      <span>
                        <img src="assets/images/user_icon_black.svg" alt="user" className="img-fluid w-100" />
                      </span>
                      Hasib Sing
                    </li>
                    <li>
                      <span>
                        <img src="assets/images/calender.png" alt="Message" className="img-fluid w-100" />
                      </span>
                      20 Apr 2025
                    </li>
                  </ul>
                  <a className="title" href="blog_details.php">Fast fashion: How clothes are linked to climate change</a>
                  <ul className="bottom">
                    <li><a href="blogs_details.html">read more <i className="fas fa-long-arrow-right" /></a>
                    </li><li><span><i className="far fa-comment-dots" /> 42 Comments</span></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-xxl-3 col-md-6 wow fadeInUp">
              <div className="blog_item">
                <a href="blog_details.php" className="blog_img">
                  <img src="assets/images/blog_img_3.png" alt="blog" className="img-fluid w-100" />
                </a>
                <div className="blog_text">
                  <ul className="top">
                    <li>
                      <span>
                        <img src="assets/images/user_icon_black.svg" alt="user" className="img-fluid w-100" />
                      </span>
                      Smith Jhon
                    </li>
                    <li>
                      <span>
                        <img src="assets/images/calender.png" alt="Message" className="img-fluid w-100" />
                      </span>
                      07 Mar 2025
                    </li>
                  </ul>
                  <a className="title" href="blog_details.php">Which foundation formula is right for your skin?</a>
                  <ul className="bottom">
                    <li><a href="blogs_details.html">read more <i className="fas fa-long-arrow-right" /></a>
                    </li><li><span><i className="far fa-comment-dots" /> 36 Comments</span></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-xxl-3 col-md-6 wow fadeInUp">
              <div className="blog_item">
                <a href="blog_details.php" className="blog_img">
                  <img src="assets/images/blog_img_4.png" alt="blog" className="img-fluid w-100" />
                </a>
                <div className="blog_text">
                  <ul className="top">
                    <li>
                      <span>
                        <img src="assets/images/user_icon_black.svg" alt="user" className="img-fluid w-100" />
                      </span>
                      Jhon Deo
                    </li>
                    <li>
                      <span>
                        <img src="assets/images/calender.png" alt="Message" className="img-fluid w-100" />
                      </span>
                      24 Apr 2025
                    </li>
                  </ul>
                  <a className="title" href="blog_details.php">How To Choose The Right Sofa for your home</a>
                  <ul className="bottom">
                    <li><a href="blogs_details.html">read more <i className="fas fa-long-arrow-right" /></a>
                    </li><li><span><i className="far fa-comment-dots" /> 15 Comments</span></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-xxl-3 col-md-6 wow fadeInUp">
              <div className="blog_item">
                <a href="blog_details.php" className="blog_img">
                  <img src="assets/images/blog_img_7.png" alt="blog" className="img-fluid w-100" />
                </a>
                <div className="blog_text">
                  <ul className="top">
                    <li>
                      <span>
                        <img src="assets/images/user_icon_black.svg" alt="user" className="img-fluid w-100" />
                      </span>
                      Smith Jhon
                    </li>
                    <li>
                      <span>
                        <img src="assets/images/calender.png" alt="Message" className="img-fluid w-100" />
                      </span>
                      07 Mar 2025
                    </li>
                  </ul>
                  <a className="title" href="blog_details.php">Which foundation formula is right for your skin?</a>
                  <ul className="bottom">
                    <li><a href="blogs_details.html">read more <i className="fas fa-long-arrow-right" /></a>
                    </li><li><span><i className="far fa-comment-dots" /> 36 Comments</span></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-xxl-3 col-md-6 wow fadeInUp">
              <div className="blog_item">
                <a href="blog_details.php" className="blog_img">
                  <img src="assets/images/blog_img_8.png" alt="blog" className="img-fluid w-100" />
                </a>
                <div className="blog_text">
                  <ul className="top">
                    <li>
                      <span>
                        <img src="assets/images/user_icon_black.svg" alt="user" className="img-fluid w-100" />
                      </span>
                      Jhon Deo
                    </li>
                    <li>
                      <span>
                        <img src="assets/images/calender.png" alt="Message" className="img-fluid w-100" />
                      </span>
                      24 Apr 2025
                    </li>
                  </ul>
                  <a className="title" href="blog_details.php">How To Choose The Right Sofa for your home</a>
                  <ul className="bottom">
                    <li><a href="blogs_details.html">read more <i className="fas fa-long-arrow-right" /></a>
                    </li><li><span><i className="far fa-comment-dots" /> 15 Comments</span></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-xxl-3 col-md-6 wow fadeInUp">
              <div className="blog_item">
                <a href="blog_details.php" className="blog_img">
                  <img src="assets/images/blog_img_9.png" alt="blog" className="img-fluid w-100" />
                </a>
                <div className="blog_text">
                  <ul className="top">
                    <li>
                      <span>
                        <img src="assets/images/user_icon_black.svg" alt="user" className="img-fluid w-100" />
                      </span>
                      Adnan Alvi
                    </li>
                    <li>
                      <span>
                        <img src="assets/images/calender.png" alt="Message" className="img-fluid w-100" />
                      </span>
                      12 Mar 2025
                    </li>
                  </ul>
                  <a className="title" href="blog_details.php">How to Plop Hair for Bouncy, Beautiful Curls</a>
                  <ul className="bottom">
                    <li><a href="blogs_details.html">read more <i className="fas fa-long-arrow-right" /></a>
                    </li><li><span><i className="far fa-comment-dots" /> 15 Comments</span></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-xxl-3 col-md-6 wow fadeInUp">
              <div className="blog_item">
                <a href="blog_details.php" className="blog_img">
                  <img src="assets/images/blog_img_10.png" alt="blog" className="img-fluid w-100" />
                </a>
                <div className="blog_text">
                  <ul className="top">
                    <li>
                      <span>
                        <img src="assets/images/user_icon_black.svg" alt="user" className="img-fluid w-100" />
                      </span>
                      Hasib Sing
                    </li>
                    <li>
                      <span>
                        <img src="assets/images/calender.png" alt="Message" className="img-fluid w-100" />
                      </span>
                      20 Apr 2025
                    </li>
                  </ul>
                  <a className="title" href="blog_details.php">Fast fashion: How clothes are linked to climate change</a>
                  <ul className="bottom">
                    <li><a href="blogs_details.html">read more <i className="fas fa-long-arrow-right" /></a>
                    </li><li><span><i className="far fa-comment-dots" /> 42 Comments</span></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-xxl-3 col-md-6 wow fadeInUp">
              <div className="blog_item">
                <a href="blog_details.php" className="blog_img">
                  <img src="assets/images/blog_img_11.png" alt="blog" className="img-fluid w-100" />
                </a>
                <div className="blog_text">
                  <ul className="top">
                    <li>
                      <span>
                        <img src="assets/images/user_icon_black.svg" alt="user" className="img-fluid w-100" />
                      </span>
                      Smith Jhon
                    </li>
                    <li>
                      <span>
                        <img src="assets/images/calender.png" alt="Message" className="img-fluid w-100" />
                      </span>
                      07 Mar 2025
                    </li>
                  </ul>
                  <a className="title" href="blog_details.php">Which foundation formula is right for your skin?</a>
                  <ul className="bottom">
                    <li><a href="blogs_details.html">read more <i className="fas fa-long-arrow-right" /></a>
                    </li><li><span><i className="far fa-comment-dots" /> 36 Comments</span></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="pagination_area">
              <nav aria-label="...">
                <ul className="pagination justify-content-center mt_50">
                  <li className="page-item">
                    <a className="page-link" href="blog_details.php">
                      <i className="far fa-arrow-left" />
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link active" href="blog_details.php">01</a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="blog_details.php">02</a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="blog_details.php">03</a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="blog_details.php">
                      <i className="far fa-arrow-right" />
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </section>
      {/*BLOG CLASSIC START*/}
      <Footer />
    </>
  );
};

export default BlogPage;