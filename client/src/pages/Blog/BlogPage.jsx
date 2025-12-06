import { Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { useApp } from "../../context/app.context";
import apis, { API_BASE_URL } from "../../api/apis";
import useFetchData from "../../hooks/useFetchData";
import formatDate from "../../helpers/formatDate";

const BlogPage = () => {
  const { categories } = useApp();
  const { data } = useFetchData(apis.blog.get);

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
                  <h1>Blogs</h1>
                  <ul>
                    <li><Link to="/"><i className="fal fa-home-lg" /> Home</Link></li>
                    <li><Link to="#">Blogs</Link></li>
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
            {
              data?.data?.map((d) => (
                <div className="col-lg-4 col-xxl-3 col-md-6 wow fadeInUp">
                  <div className="blog_item">
                    <Link to="/blog-detail" className="blog_img">
                      <img src={`${API_BASE_URL}/${d?.frontImage}`} alt="blog" className="img-fluid w-100" />
                    </Link>
                    <div className="blog_text">
                      <ul className="top">
                        <li>
                          <span>
                            <img src="/assets/images/user_icon_black.svg" alt="user" className="img-fluid w-100" />
                          </span>
                          {d?.createdBy?.name}
                        </li>
                        <li>
                          <span>
                            <img src="assets/images/calender.png" alt="Message" className="img-fluid w-100" />
                          </span>
                          {formatDate(d?.createdAt)}
                        </li>
                      </ul>
                      <Link className="title" to="/blog-detail">{d?.title}</Link>
                      <p>{d?.shortDescription}</p>
                      <ul className="bottom">
                        <li><Link to="/blog-detail">read more <i className="fas fa-long-arrow-right" /></Link>
                        </li><li><span><i className="far fa-comment-dots" /> {d?.numberOfComment} Comments</span></li>
                      </ul>
                    </div>
                  </div>
                </div>
              ))
            }
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