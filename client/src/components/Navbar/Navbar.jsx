import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      {/*TOPBAR START*/}
      <section className="topbar d-none d-lg-block">
        <div className="container">
          <div className="row">
            <div className="col-lg-7 d-none d-lg-block">
              <ul className="topbar_info d-flex flex-wrap">
                <li>
                  <a href="mailto:company@gmail.com"><i className="fal fa-envelope-open" />
                    company@gmail.com</a>
                </li>
                <li>
                  <p><i className="fal fa-map-marker-alt" /> New Delhi, India</p>
                </li>
              </ul>
            </div>
            <div className="col-lg-5">
              <div className="topbar_right d-flex flex-wrap align-items-center justify-content-end">
                <ul className="topbar_icon d-flex flex-wrap">
                  <li><a href="#"><i className="fab fa-facebook-f" /></a></li>
                  <li><a href="#"><i className="fab fa-linkedin-in" /></a></li>
                  <li><a href="#"><i className="fab fa-twitter" /></a></li>
                  <li><a href="#"><i className="fab fa-behance" /></a></li>
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
                  <img src="assets/graphics/logo.jpeg" alt="Aqwawatch" className="img-fluid w-100" />
                </Link>
                <div className="mobile_menu_icon d-block d-lg-none" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">
                  <span className="mobile_menu_icon"><i className="far fa-stream menu_icon_bar" /></span>
                </div>
              </div>
            </div>

            <div className="col-xxl-6 col-xl-5 col-lg-5 d-none d-lg-block">
              <form action="#">
                <select className="select_2">
                  <option>All Categories</option>
                  <option>Water Purifier</option>
                  <option>Water Softners</option>
                  <option>Industrial / Storage Tanks</option>
                  <option>E.T.P/S.T.P/WTP/Z.I.D</option>
                  <option>Water Jonizers</option>
                  <option>Water Cooler's Dispensor's</option>
                  <option>Organic Waste Composting Machine</option>
                  <option>Kitchen/Home Appliance's</option>
                  <option>Chimney</option>
                  <option>Air Purifier/Air Cooler</option>
                  <option>Spares Parts</option>
                  <option>Chemicals</option>
                  <option>Cleaning Essentials</option>
                </select>
                <div className="input">
                  <input type="text" placeholder="Search your product..." />
                  <button type="submit"><i className="far fa-search" /></button>
                </div>
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
                    <a href="callto:7011781706">
                      <span>7011781706</span>
                    </a>
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
                  <li><Link to="/"> Home</Link></li>
                  <li><Link to="/about-us"> About Us </Link></li>
                  <li><Link to="/shop"> All Products</Link></li>
                  <li><Link to="/blogs"> Blogs</Link></li>
                  <li><Link to="/contact-us"> Contact Us</Link></li>
                  <li><Link to="/become-vendor">Become a Trade Partner</Link></li>
                </ul>
                <ul className="menu_icon">
                  <li>
                    <Link to="/wishlist">
                      <b>
                        <img src="assets/images/love_black.svg" alt="Wishlist" className="img-fluid" />
                      </b>
                      <span>5</span>
                    </Link>
                  </li>
                  <li>
                    <a data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
                      <b>
                        <img src="assets/images/cart_black.svg" alt="cart" className="img-fluid" />
                      </b>
                      <span>3</span>
                    </a>
                  </li>
                  <li>
                    <Link className="user" to="/dashboard">
                      <b>
                        <img src="assets/images/user_icon_black.svg" alt="cart" className="img-fluid" />
                      </b>
                      <h5> Demo</h5>
                    </Link>
                    <ul className="user_dropdown">
                      <li>
                        <a href="dashboard.php">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z" />
                          </svg>
                          Dashboard
                        </a>
                      </li>
                      <li>
                        <a href="profile.php">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                          </svg>
                          my account
                        </a>
                      </li>
                      <li>
                        <a href="login.php">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                          </svg>
                          logout
                        </a>
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
            <h5 className="offcanvas-title" id="offcanvasRightLabel"> my cart <span>(05)</span></h5>
            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"><i className="far fa-times" /></button>
          </div>
          <div className="offcanvas-body">
            <ul>
              <li>
                <a href="shop_details.php" className="cart_img">
                  <img src="assets/images/product_1.png" alt="product" className="img-fluid w-100" />
                </a>
                <div className="cart_text">
                  <a className="cart_title" href="shop_details.php">Men's Fashionable Hoodie</a>
                  <p>Rs.140 <del>Rs.150</del></p>
                  <span><b>Color:</b> Red</span>
                  <span><b>Size:</b> XL (Extra Large)</span>
                </div>
                <a className="del_icon" href="#"><i className="fal fa-times" /></a>
              </li>
              <li>
                <a href="#shop_details.php" className="cart_img">
                  <img src="assets/images/product_2.png" alt="product" className="img-fluid w-100" />
                </a>
                <div className="cart_text">
                  <a className="cart_title" href="shop_details.php">Kids cotton Combo Set</a>
                  <p>Rs.130 <del>Rs.160</del></p>
                  <span><b>Color:</b> Orange</span>
                  <span><b>Size:</b> M (Medium)</span>
                </div>
                <a className="del_icon" href="#"><i className="fal fa-times" /></a>
              </li>
              <li>
                <a href="shop_details.php" className="cart_img">
                  <img src="assets/images/product_3.png" alt="product" className="img-fluid w-100" />
                </a>
                <div className="cart_text">
                  <a className="cart_title" href="shop_details.php">Women's Western Party Dress</a>
                  <p>Rs.90 <del>Rs.100</del></p>
                  <span><b>Color:</b> Purple</span>
                  <span><b>Size:</b> S (Small)</span>
                </div>
                <a className="del_icon" href="#"><i className="fal fa-times" /></a>
              </li>
              <li>
                <a href="shop_details.php" className="cart_img">
                  <img src="assets/images/product_4.png" alt="product" className="img-fluid w-100" />
                </a>
                <div className="cart_text">
                  <a className="cart_title" href="shop_details.php">Men's trendy formal shoes</a>
                  <p>Rs.140</p>
                  <span><b>Color:</b> Blue</span>
                  <span><b>Size:</b> XL (Extra Large)</span>
                </div>
                <a className="del_icon" href="#"><i className="fal fa-times" /></a>
              </li>
              <li>
                <a href="shop_details.php" className="cart_img">
                  <img src="assets/images/product_5.png" alt="product" className="img-fluid w-100" />
                </a>
                <div className="cart_text">
                  <a className="cart_title" href="shop_details.php">Kid's Western Party Dress</a>
                  <p>Rs.99.00</p>
                  <span><b>Color:</b> Black</span>
                  <span><b>Size:</b> L (Large)</span>
                </div>
                <a className="del_icon" href="#"><i className="fal fa-times" /></a>
              </li>
            </ul>
            <h5>sub total <span>Rs.429.00</span></h5>
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
            <ul className="mobile_currency">
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
            </ul>
            <ul className="mobile_menu_header d-flex flex-wrap">
              <li>
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
              </li>
              <li>
                <a href="cart.php">
                  <b><img src="assets/images/cart_black.svg" alt="cart" className="img-fluid" /></b>
                  <span>5</span>
                </a>
              </li>
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
                  <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Categories</button>
                </li>
                <li className="nav-item" role="presentation">
                  <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">menu</button>
                </li>
              </ul>
              <div className="tab-content" id="pills-tabContent">
                <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" tabIndex={0}>
                  <ul className="main_mobile_menu">
                    <li className="mobile_dropdown">
                      <a href="#">Men's Fashion</a>
                      <ul className="inner_menu">
                        <li><a href="shop.php">jeans pant</a></li>
                        <li><a href="shop.php">formal shirt</a></li>
                        <li><a href="shop.php">2 quater</a></li>
                        <li><a href="shop.php">denim jacket</a></li>
                        <li><a href="shop.php">t-shirt</a></li>
                        <li><a href="shop.php">polo-shirt</a></li>
                        <li><a href="shop.php">formal pant</a></li>
                      </ul>
                    </li>
                    <li className="mobile_dropdown">
                      <a href="#">women's Fashion</a>
                      <ul className="inner_menu">
                        <li><a href="shop.php">sharee</a></li>
                        <li><a href="shop.php">kurti</a></li>
                        <li><a href="shop.php">plazoo</a></li>
                        <li><a href="shop.php">lagins</a></li>
                        <li><a href="shop.php">tops</a></li>
                        <li><a href="shop.php">scart</a></li>
                        <li><a href="shop.php">denim jeans</a></li>
                        <li><a href="shop.php">Gown</a></li>
                      </ul>
                    </li>
                    <li className="mobile_dropdown">
                      <a href="#">kids fashion</a>
                      <ul className="inner_menu">
                        <li><a href="shop.php">t-shirt</a></li>
                        <li><a href="shop.php">partu dress</a></li>
                        <li><a href="shop.php">sharee</a></li>
                        <li><a href="shop.php">kurti</a></li>
                      </ul>
                    </li>
                    <li className="mobile_dropdown">
                      <a href="#">western wear</a>
                      <ul className="inner_menu">
                        <li><a href="shop.php">western party dress</a></li>
                        <li><a href="shop.php">kurti</a></li>
                        <li><a href="shop.php">denim pant</a></li>
                        <li><a href="shop.php">casual jacket</a></li>
                      </ul>
                    </li>
                    <li className="mobile_dropdown">
                      <a href="#">Denim collection</a>
                      <ul className="inner_menu">
                        <li><a href="shop.php">shirt</a></li>
                        <li><a href="shop.php">pant</a></li>
                        <li><a href="shop.php">jacket</a></li>
                        <li><a href="shop.php">blazer</a></li>
                      </ul>
                    </li>
                    <li className="mobile_dropdown">
                      <a href="#">sport wear</a>
                      <ul className="inner_menu">
                        <li><a href="shop.php">shoes</a></li>
                        <li><a href="shop.php">trouser</a></li>
                        <li><a href="shop.php">meat</a></li>
                        <li><a href="shop.php">Outdoors</a></li>
                        <li><a href="shop.php">Sports Pant</a></li>
                      </ul>
                    </li>
                    <li className="mobile_dropdown">
                      <a href="#">beauty products</a>
                      <ul className="inner_menu">
                        <li><a href="shop.php">Concealer Palette</a></li>
                        <li><a href="shop.php">Highlighter Palette</a></li>
                        <li><a href="shop.php">SkinPure Avocado Gel</a></li>
                        <li><a href="shop.php">Blush Palette</a></li>
                        <li><a href="shop.php">Face Wash</a></li>
                        <li><a href="shop.php">Lip Balm</a></li>
                      </ul>
                    </li>
                    <li className="mobile_dropdown">
                      <a href="#">fashion jewellery</a>
                      <ul className="inner_menu">
                        <li><a href="shop.php">Necklace</a></li>
                        <li><a href="shop.php">ear ring</a></li>
                        <li><a href="shop.php">fingure ring</a></li>
                        <li><a href="shop.php">bratchlet</a></li>
                      </ul>
                    </li>
                  </ul>
                </div>
                <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab" tabIndex={0}>
                  <ul className="main_mobile_menu">
                    <li className="mobile_dropdown">
                      <a href="#">home</a>
                      <ul className="inner_menu">
                        <li><a href="index.php">clothing fashion 01</a></li>
                        <li><a href="home_fashion_2.php">clothing fashion 02</a></li>
                        <li><a href="home_grocery.php">Grocery Store</a></li>
                        <li><a href="home_beauty.php">Beauty &amp; Cosmetics</a></li>
                      </ul>
                    </li>
                    <li className="mobile_dropdown">
                      <a href="#">shop</a>
                      <ul className="inner_menu">
                        <li><a href="#">store</a></li>
                        <li><a href="#">store details</a></li>
                      </ul>
                    </li>
                    <li className="mobile_dropdown">
                      <a href="#">store</a>
                      <ul className="inner_menu">
                        <li><a href="vendor.php">store</a></li>
                        <li><a href="vendor_details.php">store details</a></li>
                        <li><a href="vendor_registration.php">become a vendor</a></li>
                      </ul>
                    </li>
                    <li><a href="flash_deals.php">flash deals</a></li>
                    <li className="mobile_dropdown">
                      <a href="#">pages</a>
                      <ul className="inner_menu">
                        <li><a href="about_us.php">about us</a></li>
                        <li><a href="category.php">Category</a></li>
                        <li><a href="brand.php">Brand</a></li>
                        <li><a href="cart.php">cart view</a></li>
                        <li><a href="wishlist.php">wishlist</a></li>
                        <li><a href="compare.php">compare</a></li>
                        <li><a href="checkout.php">checkout</a></li>
                        <li><a href="payment_success.php">payment success</a></li>
                        <li><a href="payment_cancel.php">payment Cancel</a></li>
                        <li><a href="track_order.php">track order</a></li>
                        <li><a href="error.php">error/404</a></li>
                        <li><a href="faq.php">FAQ's</a></li>
                        <li><a href="privacy_policy.php">privacy Policy</a></li>
                        <li><a href="terms_condition.php">terms and condition</a></li>
                        <li><a href="return_policy.php">return policy</a></li>
                        <li><a href="sign_in.php">sign in</a></li>
                        <li><a href="sign_up.php">sign up</a></li>
                        <li><a href="forgot_password.php">forgot password</a></li>
                        <li><a href="dashboard.php">Dashboard</a></li>
                      </ul>
                    </li>
                    <li className="mobile_dropdown">
                      <a href="#">blog</a>
                      <ul className="inner_menu">
                        <li><a href="blog_classic.php">blog classic</a></li>
                        <li><a href="blog_left_sidebar.php">blog right sidebar</a></li>
                        <li><a href="blog_left_sidebar.php">blog left sidebar</a></li>
                        <li><a href="blog_details.php">blog details</a></li>
                      </ul>
                    </li>
                    <li><a href="contact_us.php">contact</a></li>
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