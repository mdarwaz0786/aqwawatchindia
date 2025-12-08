import { Link, useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useApp } from "../../context/app.context";
import useFetchData from "../../hooks/useFetchData";
import apis, { API_BASE_URL } from "../../api/apis";
import formatDate from "../../helpers/formatDate";
import { useEffect } from "react";

const BlogDetailPage = () => {
  const { slug } = useParams();
  const { categories } = useApp();
  const { data } = useFetchData(`${apis.blog.get}/${slug}`);
  const shareUrl = encodeURIComponent(window.location.href);
  const title = encodeURIComponent(data?.data?.title);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug]);

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
      <section className="blog_details blog_2 mb_100">
        <div className="container">
          <div className="row">
            <div className="col-xl-12 col-lg-12 wow fadeInUp">
              <div className="blog_details_left">
                <div className="blog_details_img_1">
                  <img src={`${API_BASE_URL}/${data?.data?.detailImage}`} alt="img" className="img-fluid w-100" />
                </div>
                <ul className="blog_details_top d-flex flex-wrap">
                  <li>
                    <span><img src="/assets/images/calender.png" alt="icon" className="img-fluid w-100" /></span>
                    {formatDate(data?.data?.createdAt)}
                  </li>
                  <li>
                    <span><img src="/assets/images/user_icon_black.svg" alt="icon" className="img-fluid w-100" /></span>
                    {data?.data?.createdBy?.name}
                  </li>
                  <li>
                    <span><img src="/assets/images/massage.png" alt="icon" className="img-fluid w-100" /></span>
                    {data?.data?.numberOfComment} Comment
                  </li>
                </ul>
                <h2>{data?.data?.title}</h2>
                <div dangerouslySetInnerHTML={{ __html: data?.data?.fullDescription }} />
              </div>

              <div className="blog_shear_area">
                <div className="row">
                  <div className="col-xl-7">
                    <div className="blog_shear_area_left d-flex flex-wrap">
                      <h5>Post Tags:</h5>
                      <ul className="blog_details_tag d-flex flex-wrap">
                        {data?.data?.tags
                          ?.split(",")
                          .map((tag) => tag?.trim())
                          .map((tag, index) => (
                            <li key={index}>
                              <Link to="#">{tag}</Link>
                            </li>
                          ))}
                      </ul>
                    </div>
                  </div>
                  <div className="col-xl-5">
                    <div className="blog_shear_area_right d-flex flex-wrap">
                      <h5>Share:</h5>
                      <ul className="d-flex flex-wrap">
                        <li>
                          <a
                            href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <i className="fab fa-facebook-f" />
                          </a>
                        </li>
                        <li>
                          <a
                            href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${title}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <i className="fab fa-twitter" />
                          </a>
                        </li>
                        <li>
                          <a
                            href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <i className="fab fa-linkedin-in" />
                          </a>
                        </li>
                        <li>
                          <a
                            href={`https://pinterest.com/pin/create/button/?url=${shareUrl}&description=${title}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <i className="fab fa-pinterest" />
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="col-xl-3 col-lg-4 col-md-8 wow fadeInRight">
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
            </div> */}
          </div>
        </div>
      </section>
      {/*BLOG DETAILS END*/}
      <Footer />
    </>
  );
};

export default BlogDetailPage;