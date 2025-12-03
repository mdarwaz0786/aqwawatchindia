import { Link } from "react-router-dom";
import formatDate from "../../helpers/formatDate";
import { API_BASE_URL } from "../../api/apis";

const BlogSection = ({ blogs = [] }) => {

  return (
    <>
      {
        blogs?.length > 0 && (
          <section className="blog_2 secpd">
            <div className="container">
              <div className="row mb-3">
                <div className="col-xl-6 col-sm-9">
                  <div className="section_heading_2 section_heading">
                    <h3 className="mb-2">Our <span>News</span> &amp; Articles</h3>
                  </div>
                </div>
                <div className="col-xl-6 col-sm-3">
                  <div className="view_all_btn_area">
                    <Link className="view_all_btn" to="/blogs">View all</Link>
                  </div>
                </div>
              </div>
              <div className="row">
                {
                  blogs?.map((d) => (
                    <div className="col-lg-4 col-xxl-3 col-md-6 wow fadeInUp">
                      <div className="blog_item">
                        <Link to={`/blog-detail/${d?.slug}`} className="blog_img">
                          <img src={`${API_BASE_URL}/${d?.frontImage}`} alt="blog" className="img-fluid w-100" />
                        </Link>
                        <div className="blog_text">
                          <ul className="top">
                            <li>
                              <span>
                                <img src="/assets/images/calender.png" alt="Message" className="img-fluid w-100" />
                              </span>
                              {formatDate(d?.createdAt)}
                            </li>
                          </ul>
                          <Link className="title" to={`/blog-detail/${d?.slug}`}>{d?.title}</Link>
                          <p>{d?.shortDescription}</p>
                          <ul className="bottom">
                            <li><Link to={`/blog-detail/${d?.slug}`}>read more <i className="fas fa-long-arrow-right" /></Link>
                            </li></ul>
                        </div>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          </section>
        )
      }
    </>
  );
};

export default BlogSection;