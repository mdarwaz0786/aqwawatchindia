/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apis, { API_BASE_URL } from "../../api/apis";
import styles from './Header.module.css';
import useFetchData from "../../hooks/useFetchData";
import { useAuth } from "../../context/auth.context";
import useDelete from "../../hooks/useDelete";
import { toast } from "react-toastify";

const Header = ({ categories, cartQuantity }) => {
  const navigate = useNavigate();
  const { userId, validToken, logOutUser } = useAuth();
  const [showMore, setShowMore] = useState(() => { return JSON.parse(localStorage.getItem("showMore")) || false });
  const [preview, setPreview] = useState({ img: "", title: "" });
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const { data: cartData, refetch: refetchCart } = useFetchData(`${apis.cart.get}/${userId}`);
  const { deleteData: deleteCartData, deleteResponse: deleteCartResponse, deleteError: deleteCartError } = useDelete();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/products?category=${category}&search=${search}`);
  };

  useEffect(() => {
    localStorage.setItem("showMore", JSON.stringify(showMore));
  }, [showMore]);

  const visibleCategories = showMore
    ? categories?.slice(6) || []
    : categories?.slice(0, 6) || [];

  const handleRemoveCartItem = async (e, id) => {
    e.preventDefault();
    await deleteCartData(`${apis.cart.remove}/${id}/${userId}`);
  };

  useEffect(() => {
    if (deleteCartResponse?.success) {
      toast.success("Product removed from cart");
      refetchCart();
    };
  }, [deleteCartResponse]);

  useEffect(() => {
    if (deleteCartError) toast.error("Something went wrong");
  }, [deleteCartError]);

  const handleLogin = () => {
    if (validToken) {
      logOutUser();
    } else {
      navigate("/login");
    };
  };

  const cart = cartData?.data;

  return (
    <>
      {/*TOPBAR START*/}
      <section className="topbar d-none d-lg-block">
        <div className="container">
          <div className="row">
            <div className="col-lg-7 d-none d-lg-block">
              <ul className="topbar_info d-flex flex-wrap">
                <li>
                  <a href="mailto:info@aquawatchindia.com"><i className="fal fa-envelope-open" />
                    info@aquawatchindia.com</a>
                </li>
                <li>
                  <p><i className="fal fa-map-marker-alt" /> Gurugram, Haryana, India</p>
                </li>
              </ul>
            </div>
            <div className="col-lg-5">
              <div className="topbar_right d-flex flex-wrap align-items-center justify-content-end">
                <ul className="topbar_icon d-flex flex-wrap">
                  <li>
                    <Link to="/" title="Home">
                      <i className="fas fa-home" />
                    </Link>
                  </li>
                  <li>
                    <Link to="https://facebook.com" target="_blank" rel="noopener noreferrer">
                      <i className="fab fa-facebook-f" />
                    </Link>
                  </li>
                  <li>
                    <Link to="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                      <i className="fab fa-linkedin-in" />
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-instagram" />
                    </Link>
                  </li>
                  <li>
                    <Link to="https://twitter.com" target="_blank" rel="noopener noreferrer">
                      <i className="fab fa-twitter" />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*TOPBAR END*/}

      {/*HEADER START*/}
      <header className="header_2">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-2">
              <div className="header_logo_area">
                <Link to="/" className="header_logo">
                  <img src="/assets/graphics/logo.jpeg" alt="Aqwawatch" className="img-fluid w-100" />
                </Link>
                <div className="mobile_menu_icon d-block d-lg-none" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">
                  <span className="mobile_menu_icon"><i className="far fa-stream menu_icon_bar" /></span>
                </div>
              </div>
            </div>
            <div className="col-xxl-6 col-xl-5 col-lg-5 d-none d-lg-block">
              <form onSubmit={handleSubmit} className={styles.searchForm}>
                <select
                  style={{ fontWeight: "600" }}
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className={styles.searchSelect}
                >
                  <option value="" style={{ fontWeight: "600" }}>All Categories</option>
                  {categories && categories?.map((cat) => (
                    <option key={cat?._id} value={cat?.slug} style={{ fontWeight: "600" }}>
                      {cat?.name}
                    </option>
                  ))}
                </select>

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search..."
                  className={styles.searchInput}
                  style={{ fontWeight: "600" }}
                />

                <button type="submit" className={styles.searchBtn}>
                  <i className="far fa-search" />
                </button>
              </form>
            </div>

            <div className="col-xxl-4 col-xl-5 col-lg-5 d-none d-lg-flex">
              <ul className="menu_icon">
                {/* <li>
                  <a href="wishlist.php">
                    <b>
                      <img src="assets/images/love_black.svg" alt="Wishlist" className="img-fluid" />
                    </b>
                    <span style={{ background: "#df4838" }}>5</span>
                  </a>
                </li> */}
                <li onClick={refetchCart}>
                  <a data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
                    <b>
                      <img src="/assets/images/cart_black.svg" alt="cart" className="img-fluid" />
                    </b>
                    <span style={{ background: "#df4838" }}>{cart?.length || cartQuantity}</span>
                  </a>
                </li>
                <li>
                  <Link className="user" to="/dashboard">
                    <b>
                      <img src="/assets/images/user_icon_black.svg" alt="cart" className="img-fluid" />
                    </b>
                  </Link>
                  <ul className="user_dropdown">
                    <li>
                      <Link to="/dashboard">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z" />
                        </svg>
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link to="/profile">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                        </svg>
                        my account
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handleLogin();
                        }}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                        </svg>
                        {validToken ? "Logout" : "Login"}
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>
      {/*HEADER END*/}

      {/*MENU 2 START*/}
      <nav className="main_menu_2 main_menu d-none d-lg-block">
        <div className="container-fluid">
          <div className="main_menu_area">
            <ul className="menu_item" onMouseLeave={() => setPreview({ img: "", title: "" })} >
              <li>
                <Link to="/" style={{ fontWeight: "600" }}>Home</Link>
              </li>
              {visibleCategories?.map((cat) => {
                return (
                  <li>
                    <Link style={{ fontWeight: "600" }} to={`/products?category=${cat?.slug}`}>{cat?.name} <i className="fas fa-chevron-down" /></Link>
                    <div className="megamenus">
                      <div className="container-fluid">
                        <div className="row">
                          <div className="col-md-3">
                            <div className="preview-box">
                              {preview?.img && <img id="megaPreview" src={API_BASE_URL + "/" + preview?.img} alt={preview?.title} />}
                              {preview?.title && <div id="megaPreviewTitle" className="preview-title">{preview?.title}</div>}
                            </div>
                          </div>

                          <div className="col-lg-8">
                            <div className="megamenu">
                              <div className="innerboxes">
                                <ul className="sub-menu-list">
                                  {
                                    cat?.subcategories?.map((subcat) => (
                                      <li
                                        key={subcat?._id}
                                        className="productlistDiv"
                                        data-img={subcat?.image}
                                        data-title={subcat?.name}
                                        onMouseEnter={() => {
                                          setPreview({ img: subcat?.image, title: subcat?.name });
                                        }}
                                        onClick={() =>
                                          navigate(`/products?category=${cat?.slug || ""}&subCategory=${subcat?.slug || ""}`)
                                        }
                                      >
                                        <h5><Link to="#">{subcat?.name}</Link></h5>
                                        <p style={{ marginTop: "-1rem" }}><Link to="#">Explore All Products</Link></p>
                                      </li>
                                    ))
                                  }
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                )
              })}
              <li>
                <a style={{ fontWeight: "600" }}
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowMore(!showMore);
                  }}
                >
                  {showMore ? "More" : "More"}
                  <i className="fas fa-chevron-down" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {/*MENU 2 END*/}

      {/* CART START*/}
      <div className="mini_cart">
        <div className="offcanvas offcanvas-end" tabIndex={-1} id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasRightLabel"> my cart <span>({cart?.length})</span></h5>
            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"><i className="far fa-times" /></button>
          </div>
          <div className="offcanvas-body">
            <ul>
              {
                cart?.map((d) => (
                  <li>
                    <Link to={`/product-detail/${d?.product?.slug}`} className="cart_img">
                      <img src={`${API_BASE_URL}/${d?.product?.images?.[0]}`} alt="product" className="img-fluid w-100" />
                    </Link>
                    <div className="cart_text">
                      <a className="cart_title" href="shop_details.php">{d?.product?.name}</a>
                      <p>Rs.{d?.price}</p>
                      <span><b>Quantity:</b> {d?.quantity}</span>
                    </div>
                    <Link className="del_icon" to="#" onClick={(e) => handleRemoveCartItem(e, d?.product?._id)}><i className="fal fa-times" /></Link>
                  </li>
                ))
              }
            </ul>
            <h5>sub total <span>Rs.{cartData?.totalAmount}</span></h5>
            <div className="minicart_btn_area">
              <Link className="common_btn" to="/cart">view cart</Link>
            </div>
          </div>
        </div>
      </div>
      {/* CART END */}

      {/*MOBILE MENU START*/}
      <div className="mobile_menu_area">
        <div className="offcanvas offcanvas-start" data-bs-scroll="true" tabIndex={-1} id="offcanvasWithBothOptions">
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"><i className="fal fa-times" /></button>
          <div className="offcanvas-body">
            <ul className="mobile_menu_header d-flex flex-wrap">
              <li>
                <a href="dashboard.php">
                  <b><img src="assets/images/user_icon_black.svg" alt="cart" className="img-fluid" /></b>
                </a>
              </li>
            </ul>
            <form className="mobile_menu_search">
              <input type="text" placeholder="Search" />
              <button type="submit"><i className="far fa-search" /></button>
            </form>
            <div className="mobile_menu_item_area">
              <ul className="nav nav-pills" id="pills-tab" role="tablist">
                <li className="nav-item" role="presentation">
                  <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">menu</button>
                </li>
              </ul>
              <div className="tab-content" id="pills-tabContent">
                <div className="tab-pane fade show active" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab" tabIndex={0}>
                  <ul className="main_mobile_menu">
                    <li><a href="index.php"> Home</a></li>
                    <li><a href="about_us.php"> About Us </a></li>
                    <li className="mobile_dropdown">
                      <a href="#">home</a>
                      <ul className="inner_menu">
                        <li><a href="index.php">clothing fashion 01</a></li>
                        <li><a href="home_fashion_2.php">clothing fashion 02</a></li>
                        <li><a href="home_grocery.php">Grocery Store</a></li>
                        <li><a href="home_beauty.php">Beauty &amp; Cosmetics</a></li>
                      </ul>
                    </li>
                    <div className="megamenus">
                      <div className="container">
                        <div className="row">
                          <div className="col-lg-4">
                            <div className="preview-box">
                              <img id="megaPreview" src="assets/graphics/pro1.webp" alt="Preview" />
                              <div id="megaPreviewTitle" className="preview-title">Water Softeners</div>
                            </div>
                          </div>
                          <div className="col-lg-8">
                            <div className="megamenu">
                              <div className="innerboxes">
                                <ul className="sub-menu-list waterpurifier">
                                  <li className="productlistDiv" id="one" data-img="assets/graphics/pro1.webp" data-title="RO Water Purifiers">
                                    <h5><a href="#">RO Water Purifiers</a></h5>
                                    <p><a href="#">Explore (30 Products)</a></p>
                                  </li>
                                  <li className="productlistDiv" id="blackanddecker" data-img="assets/graphics/pro2.webp" data-title="Black+Decker RO Purifiers">
                                    <h5><a href="#" target="_blank">Black+Decker RO Puriifers</a></h5>
                                    <p><a href="#" target="_blank">Explore (2 Products)</a></p>
                                  </li>
                                  <li className="productlistDiv" id="blackanddecker" data-img="assets/graphics/pro2.webp" data-title="Black+Decker RO Purifiers">
                                    <h5><a href="#" target="_blank">Black+Decker RO Puriifers</a></h5>
                                    <p><a href="#" target="_blank">Explore (2 Products)</a></p>
                                  </li>
                                  <li className="productlistDiv" id="blackanddecker" data-img="assets/graphics/pro2.webp" data-title="Black+Decker RO Purifiers">
                                    <h5><a href="#" target="_blank">Black+Decker RO Puriifers</a></h5>
                                    <p><a href="#" target="_blank">Explore (2 Products)</a></p>
                                  </li>
                                  <li className="productlistDiv" id="blackanddecker" data-img="assets/graphics/pro2.webp" data-title="Black+Decker RO Purifiers">
                                    <h5><a href="#" target="_blank">Black+Decker RO Puriifers</a></h5>
                                    <p><a href="#" target="_blank">Explore (2 Products)</a></p>
                                  </li>
                                  <li className="productlistDiv" id="blackanddecker" data-img="assets/graphics/pro2.webp" data-title="Black+Decker RO Purifiers">
                                    <h5><a href="#" target="_blank">Black+Decker RO Puriifers</a></h5>
                                    <p><a href="#" target="_blank">Explore (2 Products)</a></p>
                                  </li>
                                  <li className="productlistDiv" id="blackanddecker" data-img="assets/graphics/pro2.webp" data-title="Black+Decker RO Purifiers">
                                    <h5><a href="#" target="_blank">Black+Decker RO Puriifers</a></h5>
                                    <p><a href="#" target="_blank">Explore (2 Products)</a></p>
                                  </li>
                                  <li className="productlistDiv" id="blackanddecker" data-img="assets/graphics/pro2.webp" data-title="Black+Decker RO Purifiers">
                                    <h5><a href="#" target="_blank">Black+Decker RO Puriifers</a></h5>
                                    <p><a href="#" target="_blank">Explore (2 Products)</a></p>
                                  </li>
                                  <li className="productlistDiv" id="blackanddecker" data-img="assets/graphics/pro2.webp" data-title="Black+Decker RO Purifiers">
                                    <h5><a href="#" target="_blank">Black+Decker RO Puriifers</a></h5>
                                    <p><a href="#" target="_blank">Explore (2 Products)</a></p>
                                  </li>
                                  <li className="productlistDiv" id="blackanddecker" data-img="assets/graphics/pro2.webp" data-title="Black+Decker RO Purifiers">
                                    <h5><a href="#" target="_blank">Black+Decker RO Puriifers</a></h5>
                                    <p><a href="#" target="_blank">Explore (2 Products)</a></p>
                                  </li>
                                  <li className="productlistDiv" id="two" data-img="assets/graphics/pro3.webp" data-title="KENT Nectar Hydrogen Water Maker">
                                    <h5 className="uv-link"><a href="https://www.kent.co.in/water-purifiers/nhm/kent-nectar-hydrogen-maker">
                                      KENT Nectar Hydrogen Water Maker</a></h5>
                                    <p><a href="https://www.kent.co.in/water-purifiers/nhm/kent-nectar-hydrogen-maker">Explore (1 Products)</a></p>
                                  </li>
                                  <li className="productlistDiv" id="three" data-img="assets/graphics/pro4.webp" data-title="UV Water Purifiers">
                                    <h5 className="uv-link"><a href="https://www.kent.co.in/water-purifiers/uv/">UV Water Purifiers</a></h5>
                                    <p><a href="https://www.kent.co.in/water-purifiers/uv/">Explore (6 Products)</a></p>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <li><Link to="/products"> Products</Link></li>
                    <li><Link to="/blogs"> Blogs</Link></li>
                    <li><Link to="/contact"> Contact Us</Link></li>
                    <li><Link to="/become-vendor">Become a Trade Partner</Link></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* MOBILE MENU END */}
    </>
  );
};

export default Header;