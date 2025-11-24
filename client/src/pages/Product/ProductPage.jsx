import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import apis from "../../api/apis";
import useFetchData from "../../hooks/useFetchData";
import { useEffect } from "react";
import { API_BASE_URL } from "../../api/apis";
import useFetch from "../../hooks/useFetch";
import Swiper from "../../components/Swiper/Swiper";

const ProductPage = () => {
  const navigate = useNavigate();
  const { data: categoriesData } = useFetch(apis.home.getAll);
  const categories = categoriesData?.data?.category;
  const [searchParams, setSearchParams] = useSearchParams();

  const initialParams = {
    page: searchParams.get("page") || 1,
    limit: searchParams.get("limit") || 3,
    search: searchParams.get("search") || "",
    category: searchParams.get("category") || "",
    subCategory: searchParams.get("subCategory") || "",
    brand: searchParams.get("brand") || "",
    sort: searchParams.get("sort") || "desc",
    bestSellingProduct: searchParams.get("bestSellingProduct") || "",
    newArrivalProduct: searchParams.get("newArrivalProduct") || "",
    onSale: searchParams.get("onSale") === "true" || false,
    inStock: searchParams.get("inStock") === "true" || false,
    minPrice: searchParams.get("minPrice") ? parseFloat(searchParams.get("minPrice")) : 0,
    maxPrice: searchParams.get("maxPrice") ? parseFloat(searchParams.get("maxPrice")) : 100000,
    rating: searchParams.get("rating") ? searchParams.get("rating").split(",").map(Number) : [],
  };

  const min = 0; // optional default min
  const max = 100000; // optional default max

  const { data, params, setParams } = useFetchData(apis.product.getAll, "", initialParams);
  const { data: relatedProduct } = useFetch(`${apis.product.relatedByCategory}/${searchParams.get("category")}`);

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
    setParams({ [filterName]: value, page: 1 });
  };

  const products = data?.data || [];
  const relatedProducts = relatedProduct?.data || [];

  const handleClick = (slug) => {
    if (slug) {
      navigate(`/product-detail/${slug}`);
    };
  };

  const handleRatingChange = (value) => {
    let updatedRatings = [...params.rating];

    if (updatedRatings.includes(value)) {
      updatedRatings = updatedRatings.filter((r) => r !== value);
    } else {
      updatedRatings.push(value);
    }

    handleFilterChange("rating", updatedRatings);
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
                  <h1>Shop</h1>
                  <ul>
                    <li><Link to="/"><i className="fal fa-home-lg" /> Home</Link></li>
                    <li><Link to="#">Shop</Link></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*PAGE BANNER START*/}

      {/*SHOP PAGE START*/}
      <section className="shop_page mt_100 mb_100">
        <div className="container">
          <div className="row">
            <div className="col-xxl-2 col-lg-4 col-xl-3">
              <div id="sticky_sidebar">
                <div className="shop_filter_btn d-lg-none"> Filter </div>
                <div className="shop_filter_area">
                  <div className="sidebar_range">
                    <h3>Price Range</h3>

                    {/* Dual Range Slider */}
                    <div className="range-slider position-relative">
                      <input
                        type="range"
                        min={min}
                        max={max}
                        value={params.minPrice}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          handleFilterChange("minPrice", Math.min(val, params.maxPrice - 1));
                        }}
                        className="thumb thumb-left"
                      />

                      <input
                        type="range"
                        min={min}
                        max={max}
                        value={params.maxPrice}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          handleFilterChange("maxPrice", Math.max(val, params.minPrice + 1));
                        }}
                        className="thumb thumb-right"
                      />

                      {/* Active range highlight */}
                      <div
                        className="range-track"
                        style={{
                          left: `${(params.minPrice / max) * 100}%`,
                          width: `${((params.maxPrice - params.minPrice) / max) * 100}%`,
                        }}
                      />
                    </div>

                    {/* Price Display */}
                    <div className="text-center">
                      <small>
                        ₹{params.minPrice} — ₹{params.maxPrice}
                      </small>
                    </div>
                  </div>

                  <div className="sidebar_status">
                    <h3>Product Status</h3>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="flexCheckDefault"
                        checked={params.onSale === "true" || params.onSale === true}
                        onChange={(e) => handleFilterChange("onSale", e.target.checked)}
                      />
                      <label className="form-check-label" htmlFor="flexCheckDefault">
                        On Sale
                      </label>
                    </div>

                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="flexCheckChecked"
                        checked={params.inStock === "true" || params.inStock === true}
                        onChange={(e) => handleFilterChange("inStock", e.target.checked)}
                      />
                      <label className="form-check-label" htmlFor="flexCheckChecked">
                        In Stock
                      </label>
                    </div>
                  </div>
                  <div className="sidebar_category">
                    <h3>Categories</h3>
                    <ul>
                      <li>
                        <a href="#">
                          Men’s Fashion
                          <span>20</span>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          western wear
                          <span>09</span>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          skin care
                          <span>04</span>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          sport wear
                          <span>13</span>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          fashion jewellery
                          <span>36</span>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          beauty Care
                          <span>22</span>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          Makeoup Tools
                          <span>16</span>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          Winter collention
                          <span>27</span>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          Men’s Fashion
                          <span>20</span>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          western wear
                          <span>09</span>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          skin care
                          <span>04</span>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          sport wear
                          <span>13</span>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          fashion jewellery
                          <span>36</span>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          beauty Care
                          <span>22</span>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          Makeoup Tools
                          <span>16</span>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          Winter collention
                          <span>27</span>
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div className="sidebar_rating">
                    <h3>Rating</h3>

                    {[5, 4, 3, 2, 1].map((star) => (
                      <div className="form-check" key={star}>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id={`rating-${star}`}
                          checked={params.rating.includes(star)}
                          onChange={() => handleRatingChange(star)}
                        />
                        <label className="form-check-label" htmlFor={`rating-${star}`}>
                          <i className="fas fa-star" /> {star} star{star !== 5 ? " or above" : ""}
                        </label>
                      </div>
                    ))}
                  </div>

                  {/* <div className="sidebar_related_product">
                    <h3>Top Rated Products</h3>
                    <ul>
                      <li>
                        <Link to="/product-detail" className="img">
                          <img src="assets/images/product_18.png" alt="Product" className="img-fluid" />
                        </Link>
                        <div className="text">
                          <p className="rating">
                            <i className="fas fa-star" />
                            <i className="fas fa-star" />
                            <i className="fas fa-star" />
                            <i className="fas fa-star-half-alt" />
                            <i className="far fa-star" />
                            <span>(29)</span>
                          </p>
                          <Link className="title" to="/product-detail">Kid's Western Party Dress</Link>
                          <p className="price">Rs.59.00</p>
                        </div>
                      </li>
                      <li>
                        <Link to="/product-detail" className="img">
                          <img src="assets/images/product_23.png" alt="Product" className="img-fluid" />
                        </Link>
                        <div className="text">
                          <p className="rating">
                            <i className="fas fa-star" />
                            <i className="fas fa-star" />
                            <i className="fas fa-star" />
                            <i className="fas fa-star-half-alt" />
                            <i className="far fa-star" />
                            <span>(12)</span>
                          </p>
                          <Link className="title" to="/product-detail">Kid's dresses for summer</Link>
                          <p className="price">Rs.54.00</p>
                        </div>
                      </li>
                      <li>
                        <Link to="/product-detail" className="img">
                          <img src="assets/images/product_13.png" alt="Product" className="img-fluid" />
                        </Link>
                        <div className="text">
                          <p className="rating">
                            <i className="fas fa-star" />
                            <i className="fas fa-star" />
                            <i className="fas fa-star" />
                            <i className="fas fa-star-half-alt" />
                            <i className="far fa-star" />
                            <span>(09)</span>
                          </p>
                          <a className="title" href="shop_details.php">Sharee Petticoat For Women</a>
                          <p className="price">Rs.28.00</p>
                        </div>
                      </li>
                      <li>
                        <a href="shop_details.php" className="img">
                          <img src="assets/images/product_7.png" alt="Product" className="img-fluid" />
                        </a>
                        <div className="text">
                          <p className="rating">
                            <i className="fas fa-star" />
                            <i className="fas fa-star" />
                            <i className="fas fa-star" />
                            <i className="fas fa-star-half-alt" />
                            <i className="far fa-star" />
                            <span>(35)</span>
                          </p>
                          <a className="title" href="shop_details.php">Denim 2 Quarter Pant</a>
                          <p className="price">Rs.54.00</p>
                        </div>
                      </li>
                    </ul>
                  </div> */}
                </div>
              </div>
            </div>

            <div className="col-xxl-10 col-lg-8 col-xl-9">
              <div className="product_page_top">
                <div className="row">
                  <div className="col-4 col-xl-6 col-md-6">
                    <div className="product_page_top_button">
                      <nav>
                        <div className="nav nav-tabs" id="nav-tab" role="tablist">
                          <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">
                            <i className="fas fa-th" />
                          </button>
                          {/* <button className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">
                            <i className="fas fa-list-ul" />
                          </button> */}
                        </div>
                      </nav>
                      <p>Showing 1–14 of 26 results</p>
                    </div>
                  </div>
                  <div className="col-8 col-xl-6 col-md-6">
                    <ul className="product_page_sorting">
                      {/* Sorting */}
                      <li>
                        <select
                          className="form-select"
                          value={params.sort}
                          onChange={(e) => handleFilterChange("sort", e.target.value)}
                        >
                          <option value="desc">Default Sorting</option>
                          <option value="price_asc">Low to High</option>
                          <option value="price_desc">High to Low</option>
                        </select>
                      </li>

                      {/* Show per page */}
                      <li>
                        <select
                          className="form-select"
                          value={params.limit}
                          onChange={(e) => handleFilterChange("limit", e.target.value)}
                        >
                          <option value="12">Show: 12</option>
                          <option value="15">Show: 15</option>
                          <option value="18">Show: 18</option>
                          <option value="21">Show: 21</option>
                          <option value="24">Show: 24</option>
                        </select>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="tab-content" id="nav-tabContent">
                <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab" tabIndex={0}>
                  <div className="row">
                    {
                      products?.map((d) => (
                        <div className="col-xxl-3 col-6 col-md-4 col-lg-6 col-xl-4 wow fadeInUp" key={d?._id}>
                          <div className="product_item_2 product_item">
                            <div className="product_img">
                              <img
                                src={`${API_BASE_URL}/${d?.images?.[0]}`}
                                alt={d?.name}
                                className="img-fluid w-100"
                              />
                              {
                                (d?.newArrivalProduct) &&
                                <ul className="discount_list">
                                  <li className="new"> new</li>
                                </ul>
                              }
                              <ul className="btn_list">
                                <li>
                                  <a href="#">
                                    <img src="assets/images/cart_icon_white.svg" alt="Love" className="img-fluid" />
                                  </a>
                                </li>
                              </ul>
                            </div>
                            <div className="product_text">
                              <Link className="title" to={`/product-detail/${d?.slug}`}> {d?.name}</Link>
                              <p className="price">Rs.{d?.salePrice}</p>
                              <p className="rating">
                                {[...Array(5)].map((_, i) => (
                                  <i
                                    key={i}
                                    className={`${i < Math.round(d?.rating || 0)
                                      ? "fas fa-star"
                                      : "far fa-star"
                                      }`}
                                  />
                                ))}
                                <span>({d?.numberOfReviews} reviews)</span>
                              </p>
                            </div>
                          </div>
                        </div>
                      ))
                    }
                  </div>

                  {
                    products?.length === 0 && (
                      <div className="row">
                        <h5 className="text-center mt-5">No Data</h5>
                      </div>
                    )
                  }

                  {data?.pagination && (
                    <div className="row">
                      <div className="pagination_area">
                        <nav aria-label="Pagination">
                          <ul className="pagination justify-content-start mt_50">

                            {(() => {
                              const current = Number(data.pagination.currentPage);
                              const total = Number(data.pagination.totalPages);

                              const prevDisabled = current <= 1;
                              const nextDisabled = current >= total;

                              return (
                                <>
                                  {/* Prev Button */}
                                  <li className={`page-item ${prevDisabled ? "disabled" : ""}`}>
                                    <button
                                      className="page-link"
                                      onClick={() =>
                                        !prevDisabled && handleFilterChange("page", current - 1)
                                      }
                                    >
                                      <i className="far fa-arrow-left" />
                                    </button>
                                  </li>

                                  {/* Page Numbers */}
                                  {data.pagination.pages.map((pageNum) => (
                                    <li
                                      key={pageNum}
                                      className={`page-item ${Number(params.page) === Number(pageNum) ? "active" : ""
                                        }`}
                                    >
                                      <button
                                        className="page-link"
                                        onClick={() => handleFilterChange("page", pageNum)}
                                      >
                                        {String(pageNum).padStart(2, "0")}
                                      </button>
                                    </li>
                                  ))}

                                  {/* Next Button */}
                                  <li className={`page-item ${nextDisabled ? "disabled" : ""}`}>
                                    <button
                                      className="page-link"
                                      onClick={() =>
                                        !nextDisabled && handleFilterChange("page", current + 1)
                                      }
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

                <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab" tabIndex={0}>
                  <div className="row">
                    {
                      products?.map((d) => (
                        <div className="col-6 col-xxl-10 col-sm-12" key={d?._id}>
                          <div className="product_list_item product_item_2 product_item">
                            <div className="row align-items-center">


                              <div className="col-md-5 col-sm-6 col-xxl-4">
                                <div className="product_img">
                                  <img src="assets/images/product_23.png" alt="Product" className="img-fluid w-100" />
                                  <ul className="discount_list">
                                    <li className="new"> new</li>
                                  </ul>
                                  <ul className="btn_list">
                                    <li>
                                      <a href="#">
                                        <img src="assets/images/compare_icon_white.svg" alt="Compare" className="img-fluid" />
                                      </a>
                                    </li>
                                    <li>
                                      <a href="#">
                                        <img src="assets/images/love_icon_white.svg" alt="Love" className="img-fluid" />
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </div>

                              <div className="col-md-7 col-sm-6 col-xxl-8">
                                <div className="product_text">
                                  <a className="title" href="shop_details.php">Full Sleeve Hoodie
                                    Jacket</a>
                                  <p className="rating">
                                    <i className="fas fa-star" />
                                    <i className="fas fa-star" />
                                    <i className="fas fa-star" />
                                    <i className="fas fa-star" />
                                    <i className="fas fa-star" />
                                    <span>(20 reviews)</span>
                                  </p>
                                  <p className="price">Rs.88.00</p>
                                  <ul className="color">
                                    <li className="active" style={{ background: '#DB4437' }} />
                                    <li style={{ background: '#638C34' }} />
                                    <li style={{ background: '#1C58F2' }} />
                                    <li style={{ background: '#ffa500' }} />
                                  </ul>
                                  <p className="short_description">Lorem ipsum dolor sit amet consectetur,
                                    adipisicing elit. Exercitationem inventore libero accusantium ex
                                    ipsam, provident voluptas facere nemo, quas assumenda
                                    reprehenderit nihil ratione quaerat ad.</p>
                                  <a className="common_btn" href="shop_details.php">add to cart <i className="fas fa-long-arrow-right" /></a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    }
                  </div>

                  <div className="row">
                    <div className="pagination_area">
                      <nav aria-label="...">
                        <ul className="pagination justify-content-start mt_50">
                          <li className="page-item">
                            <a className="page-link" href="#">
                              <i className="far fa-arrow-left" />
                            </a>
                          </li>
                          <li className="page-item">
                            <a className="page-link active" href="#">01</a>
                          </li>
                          <li className="page-item">
                            <a className="page-link" href="#">02</a>
                          </li>
                          <li className="page-item">
                            <a className="page-link" href="#">03</a>
                          </li>
                          <li className="page-item">
                            <a className="page-link" href="#">
                              <i className="far fa-arrow-right" />
                            </a>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*SHOP PAGE END*/}

      {/*RELATED PRODUCTS START*/}
      {
        relatedProducts?.length > 0 &&
        <section className="related_products mt_90 mb_70 wow fadeInUp">
          <div className="container">
            <div className="row">
              <div className="col-xl-6">
                <div className="section_heading_2 section_heading">
                  <h3><span>Related</span> Products</h3>
                </div>
              </div>
            </div>

            <Swiper
              items={relatedProducts}
              slidesPerView={4}
              autoplayDelay={2500}
              spaceBetween={20}
              breakpoints={{
                320: { slidesPerView: 1 },
                576: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1200: { slidesPerView: 4 },
              }}
              renderSlide={(d) => (
                <div className="product_item_2 product_item wow fadeInUp" key={d?._id}>
                  <div className="product_img position-relative">
                    <img
                      src={`${API_BASE_URL}/${d?.images?.[0]}`}
                      alt={d?.name}
                      className="img-fluid w-100"
                    />
                    <ul className="discount_list">
                      {Number(d?.percentOff) > 0 && (
                        <li className="discount">
                          <b>-</b> {d?.percentOff}%
                        </li>
                      )}
                      {d?.newArrivalProduct && <li className="new">new</li>}
                    </ul>
                    <ul className="btn_list">
                      <li>
                        <a href="#">
                          <img
                            src="/assets/images/cart_icon_white.svg"
                            alt="Cart"
                            className="img-fluid"
                          />
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div className="product_text" onClick={() => handleClick(d?.slug)}>
                    <Link className="title" to="#">
                      {d?.name}
                    </Link>
                    <p className="price">
                      Rs.{d?.salePrice} <del>Rs.{d?.mrpPrice}</del>
                    </p>
                    <p className="rating">
                      {[...Array(5)].map((_, i) => (
                        <i
                          key={i}
                          className={`${i < Math.round(d?.rating || 0)
                            ? "fas fa-star"
                            : "far fa-star"
                            }`}
                        />
                      ))}
                      <span>({d?.numberOfReviews} reviews)</span>
                    </p>
                  </div>
                </div>
              )}
            />
          </div>
        </section>
      }
      {/*RELATED PRODUCTS END*/}
      <Footer />
    </>
  );
};

export default ProductPage;