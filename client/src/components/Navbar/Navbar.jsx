/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import styles from '../Header/Header.module.css';
import apis, { API_BASE_URL } from "../../api/apis";
import { useAuth } from "../../context/auth.context";
import { toast } from "react-toastify";
import useDelete from "../../hooks/useDelete";
import { useCart } from "../../context/cart.context";
import { useApp } from "../../context/app.context";

const Navbar = () => {
  const navigate = useNavigate();
  const [openCat, setOpenCat] = useState(null);
  const { userId, validToken, logOutUser } = useAuth();
  const { categories, contactus } = useApp();
  const { cartQuantity, refetchCart, cartItems } = useCart();
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get("search") || "";
  const initialCategory = searchParams.get("category") || "";
  const [category, setCategory] = useState(initialCategory);
  const [search, setSearch] = useState(initialSearch);
  const { deleteData: deleteCartData, deleteResponse: deleteCartResponse, deleteError: deleteCartError } = useDelete();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/products?category=${category}&search=${search}`);
  };

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
    if (deleteCartError) toast.error(deleteCartError || "Something went wrong");
  }, [deleteCartError]);

  const handleLogin = () => {
    if (validToken) {
      logOutUser();
    } else {
      navigate("/login");
    };
  };

  const toggleCategory = (id) => {
    setOpenCat(openCat === id ? null : id);
  };

  const cart = cartItems?.data;

  return (
    <>
      {/*TOPBAR START*/}
      <section className="topbar d-none d-lg-block">
        <div className="container">
          <div className="row">
            <div className="col-lg-7 d-none d-lg-block">
              <ul className="topbar_info d-flex flex-wrap">
                <li>
                  {
                    contactus?.primaryEmail && (
                      <a href={`mailto:${contactus?.primaryEmail}`}><i className="fal fa-envelope-open" />
                        {contactus?.primaryEmail}
                      </a>
                    )
                  }
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
                    <a
                      href={contactus?.facebookLink || "https://www.facebook.com/"}
                      target="_blank"
                    >
                      <i className="fab fa-facebook-f" />
                    </a>
                  </li>
                  <li>
                    <a
                      href={contactus?.linkdinLink || "https://www.linkedin.com/"}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-linkedin-in" />
                    </a>
                  </li>
                  <li>
                    <a
                      href={contactus?.instagramLink || "https://www.instagram.com/"}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-instagram" />
                    </a>
                  </li>
                  <li>
                    <a
                      href={contactus?.twitterLink || "https://twitter.com/"}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-twitter" />
                    </a>
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
                <form className="mobile-search-bar-hidden" style={{ width: "200px", marginLeft: "0px" }} onSubmit={handleSubmit}>
                  <input value={search} type="text" placeholder="Search..." onChange={(e) => setSearch(e.target.value)} />
                  <button type="submit"><i className="far fa-search" /></button>
                </form>
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
              <div className="header_support_user d-flex flex-wrap">
                <div className="header_support">
                  <span className="icon">
                    <i className="far fa-phone-alt" />
                  </span>
                  <h3>
                    Hotline:
                    {contactus?.primaryMobile && (
                      <a href={`tel:${contactus?.primaryMobile}`}>
                        <span>{contactus?.primaryMobile}</span>
                      </a>
                    )}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      {/*HEADER END*/}

      {/*MENU 2 START*/}
      <nav className="main_menu_2 main_menu d-none d-lg-block">
        <div className="container">
          <div className="row">
            <div className="col-12 d-flex flex-wrap">
              <div className="main_menu_area">
                <ul className="menu_item">
                  <li><Link to="/" style={{ fontWeight: "600" }}> Home</Link></li>
                  <li><Link to="/shop" style={{ fontWeight: "600" }}> All Products</Link></li>
                  <li><Link to="/blogs" style={{ fontWeight: "600" }}> Blogs</Link></li>
                  <li><Link to="/about-us" style={{ fontWeight: "600" }}> About Us </Link></li>
                  <li><Link to="/contact-us" style={{ fontWeight: "600" }}> Contact Us</Link></li>
                  <li><Link to="/become-dealer" style={{ fontWeight: "600" }}>Become A Dealer</Link></li>
                </ul>
                <ul className="menu_icon">
                  {/* <li>
                    <Link to="/wishlist">
                      <b>
                        <img src="assets/images/love_black.svg" alt="Wishlist" className="img-fluid" />
                      </b>
                      <span>5</span>
                    </Link>
                  </li> */}
                  <li onClick={refetchCart}>
                    <a data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
                      <b>
                        <img src="/assets/images/cart_black.svg" alt="cart" className="img-fluid" />
                      </b>
                      <span>{cartQuantity}</span>
                    </a>
                  </li>
                  <li>
                    <Link className="user" to="/dashboard">
                      <b>
                        <img src="/assets/images/user_icon_black.svg" alt="cart" className="img-fluid" />
                      </b>
                      <h5> Demo</h5>
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
        </div>
      </nav>
      {/*MENU 2 END*/}

      {/* CART START */}
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
                      <img src={`${API_BASE_URL}/${d?.product?.images?.[0]}`} alt="product" className="img" />
                    </Link>
                    <div className="cart_text">
                      <a className="cart_title" href="shop_details.php">{d?.product?.name}</a>
                      <p>Rs.{d?.price}</p>
                      <span><b>Quantity:</b> {d?.quantity}</span>
                      <span><b>GST:</b> {d?.gstPercent}%</span>
                    </div>
                    <Link className="del_icon" to="#" onClick={(e) => handleRemoveCartItem(e, d?.product?._id)}><i className="fal fa-times" /></Link>
                  </li>
                ))
              }
            </ul>
            <h5>sub total <span>Rs.{cartItems?.totalAmount}</span></h5>
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
            {/* <ul className="mobile_currency">
              <li>
                <select className="select_js language">
                  <option>English</option>
                  <option>Arabic</option>
                  <option>Hindi</option>
                  <option>Chinese</option>
                </select>
              </li>
              <li>
                <select className="select_js">
                  <option>Rs.USD</option>
                  <option>€EUR</option>
                  <option>¥JPY</option>
                  <option>£GBP</option>
                  <option>₹INR</option>
                </select>
              </li>
            </ul> */}
            <ul className="mobile_menu_header d-flex flex-wrap">
              {/* <li>
                <a href="compare.php">
                  <b> <img src="assets/images/compare_black.svg" alt="Wishlist" className="img-fluid" /> </b>
                  <span>2</span>
                </a>
              </li>
              <li>
                <a href="wishlist.php">
                  <b> <img src="assets/images/love_black.svg" alt="Wishlist" className="img-fluid" /></b>
                  <span>4</span>
                </a>
              </li> */}
              <li>
                <Link to="/cart">
                  <b><img src="/assets/images/cart_black.svg" alt="cart" className="img-fluid" /></b>
                  <span style={{ color: "#df4738" }}>{cartQuantity}</span>
                </Link>
              </li>
              <li>
                <Link to="/dashboard">
                  <b><img src="/assets/images/user_icon_black.svg" alt="cart" className="img-fluid" /></b>
                </Link>
              </li>
            </ul>
            <form className="mobile_menu_search" onSubmit={handleSubmit}>
              <input value={search} type="text" placeholder="Search..." onChange={(e) => setSearch(e.target.value)} />
              <button type="submit"><i className="far fa-search" /></button>
            </form>
            <div className="mobile_menu_item_area">
              <ul className="nav nav-pills" id="pills-tab" role="tablist">
                <li className="nav-item" role="presentation">
                  <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Categories</button>
                </li>
                <li className="nav-item" role="presentation">
                  <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">menu</button>
                </li>
              </ul>
              <div className="tab-content" id="pills-tabContent">
                <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" tabIndex={0}>
                  <ul className="main_mobile_menu">
                    {
                      categories?.map((cat) => (
                        <li key={cat?._id}>
                          <div className="d-flex justify-content-between align-items-center">
                            <Link style={{ color: "#333", fontWeight: "500" }} to={`/products?category=${cat?.slug}`}>{cat?.name}</Link>
                            <span style={{ fontSize: "22px", color: "#333", fontWeight: "500" }} onClick={() => toggleCategory(cat?._id)}>+</span>
                          </div>
                          {openCat === cat?._id && (
                            <ul>
                              {
                                cat?.subcategories?.map((subcat) => (
                                  <li
                                    key={subcat?._id}
                                    onClick={() =>
                                      navigate(`/products?category=${cat?.slug || ""}&subCategory=${subcat?.slug || ""}`)
                                    }
                                  ><Link to="#" style={{ color: "#333" }}>{subcat?.name}</Link></li>
                                ))
                              }
                            </ul>
                          )}
                        </li>
                      ))
                    }
                  </ul>
                </div>
                <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab" tabIndex={0}>
                  <ul className="main_mobile_menu">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/blogs">Blogs</Link></li>
                    <li><Link to="/shop">All Products</Link></li>
                    <li><Link to="/about-us">About Us</Link></li>
                    <li><Link to="/contact-us">Contact Us</Link></li>
                    <li><Link to="/become-dealer">Become a Dealer</Link></li>
                    <li><Link to="/cart">Cart</Link></li>
                    <li><Link to="/dashboard">Dashboard</Link></li>
                    <li><Link to="/profile">Profile</Link></li>
                    {!validToken && <li><Link to="/login">Login</Link></li>}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*MOBILE MENU END*/}
    </>
  );
};

export default Navbar;