import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import apis from "../../api/apis";
import useFetchData from "../../hooks/useFetchData";
import { useEffect } from "react";
import { API_BASE_URL } from "../../api/apis";

const ProductPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const initialParams = {
    page: searchParams.get("page") || 1,
    limit: searchParams.get("limit") || 10,
    search: searchParams.get("search") || "",
    category: searchParams.get("category") || "",
    subCategory: searchParams.get("subCategory") || "",
    brand: searchParams.get("brand") || "",
    sort: searchParams.get("sort") || "desc",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    bestSellingProduct: searchParams.get("bestSellingProduct") || "",
    newArrivalProduct: searchParams.get("newArrivalProduct") || "",
  };

  const { data, params, setParams } = useFetchData(apis.product.getAll, "", initialParams);

  useEffect(() => {
    const urlParams = {};
    Object.keys(params).forEach((key) => {
      if (
        params[key] !== "" &&
        params[key] !== null &&
        params[key] !== undefined
      ) {
        urlParams[key] = params[key];
      }
    });
    setSearchParams(urlParams);
  }, [params, setSearchParams]);

  const handleFilterChange = (filterName, value) => {
    setParams({ [filterName]: value, page: 1 });
  };

  const products = data?.data || [];

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
                    <div className="range_slider" />
                  </div>
                  <div className="sidebar_status">
                    <h3>Product Status</h3>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" defaultValue id="flexCheckDefault" />
                      <label className="form-check-label" htmlFor="flexCheckDefault">
                        On sale
                      </label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" defaultValue id="flexCheckChecked" />
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
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" defaultValue id="defaultCheck4" />
                      <label className="form-check-label" htmlFor="defaultCheck4">
                        <i className="fas fa-star" aria-hidden="true" />
                        5 star
                      </label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" defaultValue id="defaultCheck5" />
                      <label className="form-check-label" htmlFor="defaultCheck5">
                        <i className="fas fa-star" aria-hidden="true" />
                        4 star or above
                      </label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" defaultValue id="defaultCheck6" />
                      <label className="form-check-label" htmlFor="defaultCheck6">
                        <i className="fas fa-star" aria-hidden="true" />
                        3 star or above
                      </label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" defaultValue id="defaultCheck7" />
                      <label className="form-check-label" htmlFor="defaultCheck7">
                        <i className="fas fa-star" aria-hidden="true" />
                        2 star or above
                      </label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" defaultValue id="defaultCheck8" />
                      <label className="form-check-label" htmlFor="defaultCheck8">
                        <i className="fas fa-star" aria-hidden="true" />
                        1 star or above
                      </label>
                    </div>
                  </div>
                  <div className="sidebar_related_product">
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
                  </div>
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
                          <button className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">
                            <i className="fas fa-list-ul" />
                          </button>
                        </div>
                      </nav>
                      <p>Showing 1–14 of 26 results</p>
                    </div>
                  </div>
                  <div className="col-8 col-xl-6 col-md-6">
                    <ul className="product_page_sorting">
                      <li>
                        <select className="select_js">
                          <option>Default Sorting</option>
                          <option>Low to Hight</option>
                          <option>High to Low</option>
                          <option>New Added</option>
                          <option>On Sale</option>
                        </select>
                      </li>
                      <li>
                        <select className="select_js show">
                          <option>Show: 12</option>
                          <option>Show: 16</option>
                          <option>Show: 20</option>
                          <option>Show: 24</option>
                          <option>Show: 26</option>
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
                              <Link className="title" to="/product-detail"> {d?.name}</Link>
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

      {/*RELATED PRODUCT START*/}
      <section className="related_products mt_90 mb_70 wow fadeInUp">
        <div className="container">
          <div className="row">
            <div className="col-xl-6">
              <div className="section_heading_2 section_heading">
                <h3><span>Related</span> Products</h3>
              </div>
            </div>
          </div>


          <div className="row mt_25 flash_sell_2_slider">
            <div className="col-xl-1-5">
              <div className="product_item_2 product_item">
                <div className="product_img">
                  <img src="assets/images/product_1.png" alt="Product" className="img-fluid w-100" />
                  <ul className="discount_list">
                    <li className="discount"> <b>-</b> 75%</li>
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
                    <li>
                      <a href="#">
                        <img src="assets/images/cart_icon_white.svg" alt="Love" className="img-fluid" />
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="product_text">
                  <a className="title" href="shop_details.html">Full Sleeve Hoodie Jacket</a>
                  <p className="price">Rs.40.00 <del>Rs.48.00</del></p>
                  <p className="rating">
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                    <i className="far fa-star" />
                    <span>(20 reviews)</span>
                  </p>
                </div>
              </div>
            </div>


            <div className="col-xl-1-5">
              <div className="product_item_2 product_item">
                <div className="product_img">
                  <img src="assets/images/product_24.png" alt="Product" className="img-fluid w-100" />
                  <ul className="discount_list">
                    <li className="discount"> <b>-</b> 45%</li>
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
                    <li>
                      <a href="#">
                        <img src="assets/images/cart_icon_white.svg" alt="Love" className="img-fluid" />
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="product_text">
                  <a className="title" href="shop_details.html">Denim casual blazer for men</a>
                  <p className="price">Rs.120.00 <del>Rs.99.00</del></p>
                  <p className="rating">
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                    <span>(17 reviews)</span>
                  </p>
                </div>
              </div>
            </div>


            <div className="col-xl-1-5">
              <div className="product_item_2 product_item">
                <div className="product_img">
                  <img src="assets/images/product_3.png" alt="Product" className="img-fluid w-100" />
                  <ul className="discount_list">
                    <li className="discount"> <b>-</b> 15%</li>
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
                    <li>
                      <a href="#">
                        <img src="assets/images/cart_icon_white.svg" alt="Love" className="img-fluid" />
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="product_text">
                  <a className="title" href="shop_details.html">Women's Western Party Dress</a>
                  <p className="price">Rs.50.00 <del>Rs.40.00</del></p>
                  <p className="rating">
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                    <i className="far fa-star" />
                    <span>(22 reviews)</span>
                  </p>
                </div>
              </div>
            </div>


            <div className="col-xl-1-5">
              <div className="product_item_2 product_item">
                <div className="product_img">
                  <img src="assets/images/product_26.png" alt="Product" className="img-fluid w-100" />
                  <ul className="discount_list">
                    <li className="discount"> <b>-</b> 75%</li>
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
                    <li>
                      <a href="#">
                        <img src="assets/images/cart_icon_white.svg" alt="Love" className="img-fluid" />
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="product_text">
                  <a className="title" href="shop_details.html">tops pant beautiful dress</a>
                  <p className="price">Rs.75.00 <del>Rs.69.00</del></p>
                  <p className="rating">
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                    <i className="fas fa-star-half-alt" />
                    <i className="far fa-star" />
                    <span>(58 reviews)</span>
                  </p>
                </div>
              </div>
            </div>


            <div className="col-xl-1-5">
              <div className="product_item_2 product_item">
                <div className="product_img">
                  <img src="assets/images/product_8.png" alt="Product" className="img-fluid w-100" />
                  <ul className="discount_list">
                    <li className="discount"> <b>-</b> 49%</li>
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
                    <li>
                      <a href="#">
                        <img src="assets/images/cart_icon_white.svg" alt="Love" className="img-fluid" />
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="product_text">
                  <a className="title" href="shop_details.html">Kid's Western Party Dress</a>
                  <p className="price">Rs.49.00 <del>Rs.39.00</del></p>
                  <p className="rating">
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                    <i className="fas fa-star-half-alt" />
                    <i className="far fa-star" />
                    <span>(44 reviews)</span>
                  </p>
                </div>
              </div>
            </div>



            <div className="col-xl-1-5">
              <div className="product_item_2 product_item">
                <div className="product_img">
                  <img src="assets/images/product_19.png" alt="Product" className="img-fluid w-100" />
                  <ul className="discount_list">
                    <li className="discount"> <b>-</b> 62%</li>
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
                    <li>
                      <a href="#">
                        <img src="assets/images/cart_icon_white.svg" alt="Love" className="img-fluid" />
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="product_text">
                  <a className="title" href="shop_details.html">Men's premium formal shirt</a>
                  <p className="price">Rs.41.00 <del>Rs.59.00</del></p>
                  <p className="rating">
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                    <i className="fas fa-star-half-alt" />
                    <i className="far fa-star" />
                    <span>(98 reviews)</span>
                  </p>
                </div>
              </div>
            </div>




          </div>
        </div>
      </section>
      {/*RELATED PRODUCT END*/}
      <Footer />
    </>
  );
};

export default ProductPage;