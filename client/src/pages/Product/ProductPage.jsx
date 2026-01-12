/* eslint-disable react-hooks/exhaustive-deps */
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import apis from "../../api/apis";
import useFetchData from "../../hooks/useFetchData";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../../api/apis";
import Swiper from "../../components/Swiper/Swiper";
import useDebounce from "../../hooks/useDebounce";
import { useAuth } from "../../context/auth.context";
import useCreate from "../../hooks/useCreate";
import { toast } from "react-toastify";
import { useCart } from "../../context/cart.context";

const ProductPage = () => {
  const navigate = useNavigate();
  const [showFilter, setShowFilter] = useState(false);
  const { userId } = useAuth();
  const { refetchCart } = useCart();
  const [searchParams, setSearchParams] = useSearchParams();

  const initialParams = {
    page: searchParams.get("page") || 1,
    limit: searchParams.get("limit") || 12,
    search: searchParams.get("search") || "",
    category: searchParams.get("category") || "",
    subCategory: searchParams.get("subCategory") || "",
    brand: searchParams.get("brand") || "",
    sort: searchParams.get("sort") || "desc",
    bestSellingProduct: searchParams.get("bestSellingProduct") || "",
    newArrivalProduct: searchParams.get("newArrivalProduct") || "",
    inStock: searchParams.get("inStock") || "",
    minPrice: searchParams.get("minPrice") ? parseFloat(searchParams.get("minPrice")) : 0,
    maxPrice: searchParams.get("maxPrice") ? parseFloat(searchParams.get("maxPrice")) : 100000,
    rating1: searchParams.get("rating1") || "",
    rating2: searchParams.get("rating2") || "",
    rating3: searchParams.get("rating3") || "",
    rating4: searchParams.get("rating4") || "",
    rating5: searchParams.get("rating5") || "",
  };

  const { data, refetch, params, setParams } = useFetchData(apis.product.getAll, "", { ...initialParams, userId });
  const { data: relatedProduct, refetch: refetchRelatedProduct } = useFetchData(`${apis.product.relatedByCategory}/${searchParams.get("category")}`, "", { userId: userId });
  const { postData: addProductToCart, response: cartResponse, postError: cartError } = useCreate(apis.cart.add);

  useEffect(() => {
    const urlParams = new URLSearchParams();
    Object.keys(params).forEach((key) => {
      if (params[key] !== "" && params[key] !== null && params[key] !== undefined) {
        urlParams.set(key, params[key]);
      };
    });
    setSearchParams(urlParams);
  }, [params]);

  const [localMin, setLocalMin] = useState(params.minPrice);
  const [localMax, setLocalMax] = useState(params.maxPrice);

  const debouncedMin = useDebounce(localMin, 500);
  const debouncedMax = useDebounce(localMax, 500);

  useEffect(() => {
    if (
      debouncedMin !== params.minPrice ||
      debouncedMax !== params.maxPrice
    ) {
      handleFilterChange("minPrice", debouncedMin);
      handleFilterChange("maxPrice", debouncedMax);
    }
  }, [debouncedMin, debouncedMax]);

  const handleFilterChange = (filterName, value) => {
    if (filterName === "page") {
      setParams({ page: value });
    } else {
      setParams({ [filterName]: value, page: 1 });
    }
  };

  const handleAddToCart = async (e, productId, quantity = 1, userId) => {
    e.preventDefault();
    await addProductToCart({ productId, quantity, userId });
  };

  useEffect(() => {
    if (cartResponse?.success) {
      toast.success(cartResponse?.message || "Added to cart");
      refetch();
      refetchRelatedProduct();
      refetchCart();
    } else if (cartError) {
      toast.error(cartError || "Something went wrong");
    };
  }, [cartResponse, cartError]);

  const min = 0;
  const max = 100000;

  const products = data?.data || [];
  const relatedProducts = relatedProduct?.data || [];

  const minPercent = ((localMin - min) / (max - min)) * 100;
  const maxPercent = ((localMax - min) / (max - min)) * 100;

  return (
    <>
      <Header />
      {/*PAGE BANNER START*/}
      <section className="page_banner" style={{ background: 'url(assets/images/page_banner_bg.jpg)' }}>
        <div className="page_banner_overlay">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="page_banner_text">
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
      <section className="shop_page mt-5 mb-5">
        <div className="container">
          <div className="row" >
            <div className="col-xxl-2 col-lg-4 col-xl-3">
              <div className="shop_filter_btn d-lg-none" onClick={() => setShowFilter(!showFilter)}> Filter</div>
              <div className={`shop_filter_area ${showFilter ? "show" : ""}`}>
                <div className="sidebar_range">
                  <h3>Price Range</h3>
                  <div className="range-slider">
                    <div className="full-track"></div>
                    <input
                      type="range"
                      min={min}
                      max={max}
                      value={localMin}
                      onChange={(e) => setLocalMin(Math.min(Number(e.target.value), localMax - 1))}
                    />
                    <input
                      type="range"
                      min={min}
                      max={max}
                      value={localMax}
                      onChange={(e) => setLocalMax(Math.max(Number(e.target.value), localMin + 1))}
                    />
                    <div className="thumb-value" style={{ left: `${minPercent}%` }}>
                      ₹{localMin}
                    </div>
                    <div className="thumb-value" style={{ left: `${maxPercent}%` }}>
                      ₹{localMax}
                    </div>
                  </div>
                </div>

                <div className="sidebar_status">
                  <h3>Product Status</h3>
                  <div className="form-check">
                    <input
                      className="form-check-input w-100"
                      type="checkbox"
                      id="flexCheckChecked2"
                      checked={params.inStock === "true"}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        handleFilterChange(
                          "inStock",
                          checked ? "true" : ""
                        );
                      }}
                    />
                    <label className="form-check-label" htmlFor="flexCheckChecked2">
                      In Stock
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input w-100"
                      type="checkbox"
                      id="flexCheckChecked3"
                      checked={params.bestSellingProduct === "true"}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        handleFilterChange(
                          "bestSellingProduct",
                          checked ? "true" : ""
                        );
                      }}
                    />
                    <label className="form-check-label" htmlFor="flexCheckChecked3">
                      Best Selling Product
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input w-100"
                      type="checkbox"
                      id="flexCheckChecked4"
                      checked={params.newArrivalProduct === "true"}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        handleFilterChange(
                          "newArrivalProduct",
                          checked ? "true" : ""
                        );
                      }}
                    />
                    <label className="form-check-label" htmlFor="flexCheckChecked4">
                      New Arrival Product
                    </label>
                  </div>
                </div>

                <div className="sidebar_rating">
                  <h3>Rating</h3>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="rating5"
                      checked={params.rating5 === "5"}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        handleFilterChange(
                          "rating5",
                          checked ? "5" : ""
                        );
                      }}
                    />
                    <label className="form-check-label" htmlFor="rating5">
                      {[...Array(5)].map((_, i) => (
                        <i key={i} className="fas fa-star text-warning"></i>
                      ))}
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="rating4"
                      checked={params.rating4 === "4"}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        handleFilterChange(
                          "rating4",
                          checked ? "4" : ""
                        );
                      }}
                    />
                    <label className="form-check-label" htmlFor="rating4">
                      {[...Array(4)].map((_, i) => (
                        <i key={i} className="fas fa-star text-warning"></i>
                      ))}
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="rating3"
                      checked={params.rating3 === "3"}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        handleFilterChange(
                          "rating3",
                          checked ? "3" : ""
                        );
                      }}
                    />
                    <label className="form-check-label" htmlFor="rating3">
                      {[...Array(3)].map((_, i) => (
                        <i key={i} className="fas fa-star text-warning"></i>
                      ))}
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="rating2"
                      checked={params.rating2 === "2"}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        handleFilterChange(
                          "rating2",
                          checked ? "2" : ""
                        );
                      }}
                    />
                    <label className="form-check-label" htmlFor="rating2">
                      {[...Array(2)].map((_, i) => (
                        <i key={i} className="fas fa-star text-warning"></i>
                      ))}
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="rating1"
                      checked={params.rating1 === "1"}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        handleFilterChange(
                          "rating1",
                          checked ? "1" : ""
                        );
                      }}
                    />
                    <label className="form-check-label" htmlFor="rating1">
                      <i className="fas fa-star text-warning"></i>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xxl-10 col-lg-8 col-xl-9">
              <div className="product_page_top">
                <div className="row">
                  <div className="col-xl-6 col-md-6">
                    <div className="product_page_top_button">
                      <nav>
                        <div className="nav nav-tabs" id="nav-tab" role="tablist">
                          <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">
                            <i className="fas fa-th" />
                          </button>
                        </div>
                      </nav>
                      <p>
                        Showing {Math.min((params.page - 1) * params.limit + 1, data?.pagination?.total)}– {" "}
                        {Math.min(params.page * params.limit, data?.pagination?.total)} of {data?.pagination?.total} results
                      </p>
                    </div>
                  </div>
                  <div className="col-8 col-xl-6 col-md-6">
                    <ul className="product_page_sorting">
                      <li>
                        <select
                          className="form-select w-100"
                          style={{ width: "200px" }}
                          value={params.sort}
                          onChange={(e) => handleFilterChange("sort", e.target.value)}
                        >
                          <option value="desc">Relevance</option>
                          <option value="price_asc">Low to High</option>
                          <option value="price_desc">High to Low</option>
                        </select>
                      </li>
                      <li>
                        <select
                          className="form-select w-100"
                          value={params.limit}
                          onChange={(e) => handleFilterChange("limit", e.target.value)}
                          style={{ width: "200px" }}
                        >
                          <option value="12">show: 12</option>
                          <option value="18">Show: 18</option>
                          <option value="24">Show: 24</option>
                          <option value="30">Show: 30</option>
                        </select>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="tab-content" id="nav-tabContent">
                <div className="tab-pane show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab" tabIndex={0}>
                  <div className="row">
                    {
                      products?.map((d) => (
                        <div className="col-xxl-3 col-6 col-md-4 col-lg-6 col-xl-4" key={d?._id}>
                          <div className="product_item_2 product_item">
                            <div className="product_img">
                              <img
                                src={`${API_BASE_URL}/${d?.images?.[0]}`}
                                alt={d?.name}
                                className="img-fluid w-100"
                                onClick={() => navigate(`/product-detail/${d?.slug}`)}
                                style={{ cursor: "pointer" }}
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
                                  <Link to="#" onClick={(e) => handleAddToCart(e, d?._id, 1, userId)}>
                                    <img src="/assets/images/cart_icon_white.svg" alt="Love" className="img-fluid" />
                                  </Link>
                                </li>
                              </ul>
                            </div>
                            <div className="product_text">
                              <Link className="title" to={`/product-detail/${d?.slug}`}> {d?.name}</Link>
                              <p className="price">Rs.{d?.salePrice} <del>Rs.{d?.mrpPrice}</del></p>
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
                              <div className="d-flex justify-content-center">
                                {d?.quantity > 0 ? (
                                  <div
                                    className="quantity_selector d-flex align-items-center"
                                    style={{
                                      width: "120px",
                                      height: "40px",
                                      background: "#fff",
                                    }}
                                  >
                                    <button
                                      onClick={(e) => handleAddToCart(e, d?._id, -1, userId)}
                                      style={{
                                        flex: "1",
                                        border: "none",
                                        background: "#df4738",
                                        color: "#fff",
                                        fontSize: "18px",
                                        fontWeight: "500",
                                        cursor: "pointer",
                                        borderRadius: "5px"
                                      }}
                                    >
                                      <i className="fal fa-minus" />
                                    </button>
                                    <input
                                      type="text"
                                      value={d.quantity}
                                      readOnly
                                      style={{
                                        flex: "1",
                                        textAlign: "center",
                                        border: "none",
                                        fontWeight: "600",
                                        fontSize: "18px",
                                        background: "#fff",
                                      }}
                                    />
                                    <button
                                      onClick={(e) => handleAddToCart(e, d?._id, 1, userId)}
                                      style={{
                                        flex: "1",
                                        border: "none",
                                        background: "#df4738",
                                        color: "#fff",
                                        fontSize: "18px",
                                        fontWeight: "500",
                                        cursor: "pointer",
                                        borderRadius: "5px"
                                      }}
                                    >
                                      <i className="fal fa-plus" />
                                    </button>
                                  </div>
                                ) : (
                                  <button
                                    className="btn w-100 d-flex align-items-center justify-content-center"
                                    style={{ background: "#df4738", color: "#fff" }}
                                    onClick={(e) => handleAddToCart(e, d._id, 1, userId)}
                                  >
                                    <i className=" fas fa-shopping-cart me-2" />
                                    Add to Cart
                                  </button>
                                )}
                              </div>
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
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*SHOP PAGE END*/}

      {/*RELATED PRODUCTS START*/}
      {
        relatedProducts?.length > 0 &&
        <section className="related_products mb-5">
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
              autoplayDelay={5000}
              spaceBetween={20}
              breakpoints={{
                320: { slidesPerView: 2 },
                576: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1200: { slidesPerView: 4 },
              }}
              renderSlide={(d) => (
                <div className="product_item_2 product_item" key={d?._id}>
                  <div className="product_img position-relative">
                    <img
                      src={`${API_BASE_URL}/${d?.images?.[0]}`}
                      alt={d?.name}
                      className="img-fluid w-100"
                      onClick={() => navigate(`/product-detail/${d?.slug}`)}
                      style={{ cursor: "pointer" }}
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
                        <Link to="#" onClick={(e) => handleAddToCart(e, d?._id, 1, userId)}>
                          <img
                            src="/assets/images/cart_icon_white.svg"
                            alt="Cart"
                            className="img-fluid"
                          />
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="product_text">
                    <Link className="title" to="#" onClick={() => navigate(`/product-detail/${d?.slug}`)}>
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
                    <div className="d-flex justify-content-center">
                      {d?.quantity > 0 ? (
                        <div
                          className="quantity_selector d-flex align-items-center"
                          style={{
                            width: "120px",
                            height: "40px",
                            background: "#fff",
                          }}
                        >
                          <button
                            onClick={(e) => handleAddToCart(e, d?._id, -1, userId)}
                            style={{
                              flex: "1",
                              border: "none",
                              background: "#df4738",
                              color: "#fff",
                              fontSize: "18px",
                              fontWeight: "500",
                              cursor: "pointer",
                              borderRadius: "5px"
                            }}
                          >
                            <i className="fal fa-minus" />
                          </button>
                          <input
                            type="text"
                            value={d.quantity}
                            readOnly
                            style={{
                              flex: "1",
                              textAlign: "center",
                              border: "none",
                              fontWeight: "600",
                              fontSize: "18px",
                              background: "#fff",
                            }}
                          />
                          <button
                            onClick={(e) => handleAddToCart(e, d?._id, 1, userId)}
                            style={{
                              flex: "1",
                              border: "none",
                              background: "#df4738",
                              color: "#fff",
                              fontSize: "18px",
                              fontWeight: "500",
                              cursor: "pointer",
                              borderRadius: "5px"
                            }}
                          >
                            <i className="fal fa-plus" />
                          </button>
                        </div>
                      ) : (
                        <button
                          className="btn w-100 d-flex align-items-center justify-content-center"
                          style={{ background: "#df4738", color: "#fff" }}
                          onClick={(e) => handleAddToCart(e, d._id, 1, userId)}
                        >
                          <i className="fas fa-shopping-cart me-2" />
                          Add to Cart
                        </button>
                      )}
                    </div>
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