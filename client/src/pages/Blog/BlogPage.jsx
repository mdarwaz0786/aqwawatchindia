import { Link, useSearchParams } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { useApp } from "../../context/app.context";
import apis, { API_BASE_URL } from "../../api/apis";
import useFetchData from "../../hooks/useFetchData";
import formatDate from "../../helpers/formatDate";
import { useEffect } from "react";

const BlogPage = () => {
  const { categories } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();

  const initialParams = {
    page: searchParams.get("page") || 1,
    limit: searchParams.get("limit") || 12,
  };

  const { data, params, setParams } = useFetchData(apis.blog.get, "", { ...initialParams });

  useEffect(() => {
    const urlParams = {};
    Object.keys(params).forEach((key) => {
      if (Array.isArray(params[key])) {
        if (params[key].length > 0) urlParams[key] = params[key].join(",");
      } else if (params[key] !== "" && params[key] !== null && params[key] !== undefined) {
        urlParams[key] = params[key];
      }
    });
    setSearchParams(urlParams);
  }, [params, setSearchParams]);

  const handleFilterChange = (filterName, value) => {
    if (filterName === "page") {
      setParams({ page: value });
    } else {
      setParams({ [filterName]: value, page: 1 });
    }
  };

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
                <div className="col-lg-4 col-xxl-3 col-md-6 wow fadeInUp mb-3">
                  <div className="blog_item h-100 d-flex flex-column">
                    <Link to={`/blog-detail/${d?.slug}`} className="blog_img">
                      <img
                        src={`${API_BASE_URL}/${d?.frontImage}`}
                        alt="blog"
                        className="img-fluid w-100"
                        style={{ height: "300px", objectFit: "fill" }}
                      />
                    </Link>
                    <div className="blog_text d-flex flex-column flex-grow-1 p-3">
                      <ul className="top list-unstyled d-flex align-items-center mb-2">
                        <li className="d-flex align-items-center">
                          <span className="me-2">
                            <img src="/assets/images/calender.png" alt="Message" style={{ width: "18px" }} />
                          </span>
                          {formatDate(d?.createdAt)}
                        </li>
                      </ul>
                      <Link className="title fw-semibold mb-2" to={`/blog-detail/${d?.slug}`}>
                        {d?.title}
                      </Link>
                      <p className="text-muted flex-grow-1 mb-3 line-3">{d?.shortDescription}</p>
                      <ul className="bottom list-unstyled mt-auto">
                        <li>
                          <Link to={`/blog-detail/${d?.slug}`} className="text-danger fw-semibold">
                            read more <i className="fas fa-long-arrow-right"></i>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>

          {data?.pagination && (
            <div className="row">
              <div className="pagination_area">
                <nav aria-label="Pagination">
                  <ul className="pagination justify-content-start mt_50">
                    {(() => {
                      const current = Number(data.pagination.currentPage || 1);
                      const total = Number(data.pagination.totalPages || 1);

                      const prevDisabled = current <= 1;
                      const nextDisabled = current >= total;

                      const pages = (data.pagination.pages || [])
                        .map(p => Number(p))
                        .filter((p, i, arr) => !Number.isNaN(p) && arr.indexOf(p) === i)
                        .sort((a, b) => a - b);

                      return (
                        <>
                          <li className={`page-item ${prevDisabled ? "disabled" : ""}`}>
                            <button
                              type="button"
                              className="page-link"
                              disabled={prevDisabled}
                              aria-disabled={prevDisabled}
                              onClick={() => {
                                if (!prevDisabled) handleFilterChange("page", current - 1);
                              }}
                            >
                              <i className="far fa-arrow-left" />
                            </button>
                          </li>

                          {pages.map((pageNum) => {
                            const pageNumber = Number(pageNum);
                            const isActive = Number(params.page) === pageNumber;

                            return (
                              <li
                                key={pageNumber}
                                className={`page-item ${isActive ? "active" : ""}`}
                              >
                                <button
                                  type="button"
                                  className={`page-link ${isActive ? "active" : ""}`}
                                  onClick={() => {
                                    if (!isActive) handleFilterChange("page", pageNumber);
                                  }}
                                >
                                  {String(pageNumber).padStart(2, "0")}
                                </button>
                              </li>
                            );
                          })}

                          <li className={`page-item ${nextDisabled ? "disabled" : ""}`}>
                            <button
                              type="button"
                              className="page-link"
                              disabled={nextDisabled}
                              aria-disabled={nextDisabled}
                              onClick={() => {
                                if (!nextDisabled) handleFilterChange("page", current + 1);
                              }}
                            >
                              <i className="far fa-arrow-right" />
                            </button>
                          </li>
                        </>
                      );
                    })()}
                  </ul>
                </nav>
              </div>
            </div>
          )}
        </div>
      </section>
      {/*BLOG CLASSIC START*/}
      <Footer />
    </>
  );
};

export default BlogPage;