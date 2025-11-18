import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import useFetch from "../../hooks/useFetch";
import apis from "../../api/apis";

const CartPage = () => {
  const { data } = useFetch(apis.home.getAll);
  const categories = data?.data?.category;

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
                  <h1>Cart View</h1>
                  <ul>
                    <li><Link to="/"><i className="fal fa-home-lg" /> Home</Link></li>
                    <li><Link to="#">Cart View</Link></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*PAGE BANNER START*/}

      {/*CART PAGE START*/}
      <section className="cart_page mt_100 mb_100">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 wow fadeInUp">
              <div className="cart_table_area">
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th className="cart_page_checkbox">
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" defaultValue id="flexCheckDefault" />
                          </div>
                        </th>
                        <th className="cart_page_img">Product image </th>
                        <th className="cart_page_details">Product Details</th>
                        <th className="cart_page_price">Unit Price</th>
                        <th className="cart_page_quantity">Quantity</th>
                        <th className="cart_page_total">Subtotal</th>
                        <th className="cart_page_action">action</th>
                      </tr>
                    </thead>
                  </table>
                </div>
                <div className="table-responsive">
                  <table className="table">
                    <tbody><tr>
                      <td>
                        <h4 className="cart_vendor_name">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" />
                          </svg>
                          Zapier Gallery
                        </h4>
                      </td>
                    </tr>
                    </tbody></table>
                </div>
                <div className="table-responsive">
                  <table className="table">
                    <tbody>
                      <tr>
                        <td className="cart_page_checkbox">
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" defaultValue id="flexCheckDefault2" />
                          </div>
                        </td>
                        <td className="cart_page_img">
                          <div className="img">
                            <img src="assets/images/product_18.png" alt="Products" className="img-fluid w-100" />
                          </div>
                        </td>
                        <td className="cart_page_details">
                          <a className="title" href="shop_details.php">Full Sleeve Hoodie Jacket</a>
                          <p>$59.00 <del>$65.00</del></p>
                          <span><b>Color:</b> Orange</span>
                          <span><b>Size:</b> M (Medium)</span>
                        </td>
                        <td className="cart_page_price">
                          <h3>$59.00</h3>
                        </td>
                        <td className="cart_page_quantity">
                          <div className="details_qty_input">
                            <button className="minus"><i className="fal fa-minus" aria-hidden="true" /></button>
                            <input type="text" placeholder="01" />
                            <button className="plus"><i className="fal fa-plus" aria-hidden="true" /></button>
                          </div>
                        </td>
                        <td className="cart_page_total">
                          <h3>$59.00</h3>
                        </td>
                        <td className="cart_page_action">
                          <a href="#"> <i className="fal fa-times" /> Remove</a>
                        </td>
                      </tr>
                      <tr>
                        <td className="cart_page_checkbox">
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" defaultValue id="flexCheckDefault6" />
                          </div>
                        </td>
                        <td className="cart_page_img">
                          <div className="img">
                            <img src="assets/images/product_7.png" alt="Products" className="img-fluid w-100" />
                          </div>
                        </td>
                        <td className="cart_page_details">
                          <a className="title" href="shop_details.php">Denim 2 Quarter Pant</a>
                          <p>$36.00</p>
                          <span><b>Color:</b> Black</span>
                          <span><b>Size:</b> L (Large)</span>
                        </td>
                        <td className="cart_page_price">
                          <h3>$36.00</h3>
                        </td>
                        <td className="cart_page_quantity">
                          <div className="details_qty_input">
                            <button className="minus"><i className="fal fa-minus" aria-hidden="true" /></button>
                            <input type="text" placeholder="01" />
                            <button className="plus"><i className="fal fa-plus" aria-hidden="true" /></button>
                          </div>
                        </td>
                        <td className="cart_page_total">
                          <h3>$36.00</h3>
                        </td>
                        <td className="cart_page_action">
                          <a href="#"> <i className="fal fa-times" /> Remove</a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="table-responsive">
                  <table className="table">
                    <tbody><tr>
                      <td>
                        <h4 className="cart_vendor_name">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" />
                          </svg>
                          Comfort Gallery
                        </h4>
                      </td>
                    </tr>
                    </tbody></table>
                </div>
                <div className="table-responsive">
                  <table className="table">
                    <tbody>
                      <tr>
                        <td className="cart_page_checkbox">
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" defaultValue id="flexCheckDefault03" />
                          </div>
                        </td>
                        <td className="cart_page_img">
                          <div className="img">
                            <img src="assets/images/product_16.png" alt="Products" className="img-fluid w-100" />
                          </div>
                        </td>
                        <td className="cart_page_details">
                          <a className="title" href="shop_details.php">cherry fabric western tops</a>
                          <p>$75.00</p>
                          <span><b>Color:</b> Blue</span>
                          <span><b>Size:</b> XL (Extra Large)</span>
                        </td>
                        <td className="cart_page_price">
                          <h3>$72.00</h3>
                        </td>
                        <td className="cart_page_quantity">
                          <div className="details_qty_input">
                            <button className="minus"><i className="fal fa-minus" aria-hidden="true" /></button>
                            <input type="text" placeholder="01" />
                            <button className="plus"><i className="fal fa-plus" aria-hidden="true" /></button>
                          </div>
                        </td>
                        <td className="cart_page_total">
                          <h3>$72.00</h3>
                        </td>
                        <td className="cart_page_action">
                          <a href="#"> <i className="fal fa-times" /> Remove</a>
                        </td>
                      </tr>
                      <tr>
                        <td className="cart_page_checkbox">
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" defaultValue id="flexCheckDefault4" />
                          </div>
                        </td>
                        <td className="cart_page_img">
                          <div className="img">
                            <img src="assets/images/product_4.png" alt="Products" className="img-fluid w-100" />
                          </div>
                        </td>
                        <td className="cart_page_details">
                          <a className="title" href="shop_details.php">Comfortable Sports Sneakers</a>
                          <p>$66.00 <del>$70.00</del></p>
                          <span><b>Color:</b> Blue</span>
                          <span><b>Size:</b> 40" (Large)</span>
                        </td>
                        <td className="cart_page_price">
                          <h3>$66.00</h3>
                        </td>
                        <td className="cart_page_quantity">
                          <div className="details_qty_input">
                            <button className="minus"><i className="fal fa-minus" aria-hidden="true" /></button>
                            <input type="text" placeholder="01" />
                            <button className="plus"><i className="fal fa-plus" aria-hidden="true" /></button>
                          </div>
                        </td>
                        <td className="cart_page_total">
                          <h3>$66.00</h3>
                        </td>
                        <td className="cart_page_action">
                          <a href="#"> <i className="fal fa-times" /> Remove</a>
                        </td>
                      </tr>
                      <tr>
                        <td className="cart_page_checkbox">
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" defaultValue id="flexCheckDefault5" />
                          </div>
                        </td>
                        <td className="cart_page_img">
                          <div className="img">
                            <img src="assets/images/product_17.png" alt="Products" className="img-fluid w-100" />
                          </div>
                        </td>
                        <td className="cart_page_details">
                          <a className="title" href="shop_details.php">Denim Jeans Pants For Men</a>
                          <p>$52.00</p>
                          <span><b>Color:</b> Gray</span>
                          <span><b>Size:</b> 42" (Medium)</span>
                        </td>
                        <td className="cart_page_price">
                          <h3>$59.00</h3>
                        </td>
                        <td className="cart_page_quantity">
                          <div className="details_qty_input">
                            <button className="minus"><i className="fal fa-minus" aria-hidden="true" /></button>
                            <input type="text" placeholder="01" />
                            <button className="plus"><i className="fal fa-plus" aria-hidden="true" /></button>
                          </div>
                        </td>
                        <td className="cart_page_total">
                          <h3>$59.00</h3>
                        </td>
                        <td className="cart_page_action">
                          <a href="#"> <i className="fal fa-times" /> Remove</a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-9 wow fadeInRight">
              <div id="sticky_sidebar">
                <div className="cart_page_summary">
                  <h3>Billing summary</h3>
                  <a href="vendor_details.php" className="vendor_name">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" />
                    </svg>
                    Zapier Gallery
                  </a>
                  <ul>
                    <li>
                      <a className="img" href="#">
                        <img src="assets/images/product_18.png" alt="Products" className="img-fluid w-100" />
                      </a>
                      <div className="text">
                        <a className="title" href="shop_details.php">Full Sleeve Hoodie Jacket</a>
                        <p>$59.00 × 2</p>
                        <p>Color: Red, Size: XL</p>
                      </div>
                    </li>
                    <li>
                      <a className="img" href="#">
                        <img src="assets/images/product_16.png" alt="Products" className="img-fluid w-100" />
                      </a>
                      <div className="text">
                        <a className="title" href="shop_details.php">cherry fabric western tops</a>
                        <p>$75.00 × 1</p>
                        <p>Color: Orange, Size: M</p>
                      </div>
                    </li>
                  </ul>
                  <a href="vendor_details.php" className="vendor_name">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" />
                    </svg>
                    Comfort Gallery
                  </a>
                  <ul>
                    <li>
                      <a className="img" href="#">
                        <img src="assets/images/product_18.png" alt="Products" className="img-fluid w-100" />
                      </a>
                      <div className="text">
                        <a className="title" href="shop_details.php">Full Sleeve Hoodie Jacket</a>
                        <p>$59.00 × 2</p>
                        <p>Color: Red, Size: XL</p>
                      </div>
                    </li>
                  </ul>
                  <h6>subtotal <span>$395.00</span></h6>
                  <h6>Tax <span>(+) $100.00</span></h6>
                  <h6>Discount <span>(-) $45.00</span></h6>
                  <h4>Total <span>$410.00</span></h4>
                  <form action="#">
                    <input type="text" placeholder="Coupon code" />
                    <button type="submit" className="common_btn">Apply</button>
                    <p>
                      Coupon Code: HEM4556JL
                      <a href="#"><i className="fal fa-times" /></a>
                    </p>
                  </form>
                </div>
                <div className="cart_summary_btn">
                  <Link className="common_btn continue_shopping" to="/products">Contiue shopping</Link>
                  <Link className="common_btn" to="/checkout">checkout <i className="fas fa-long-arrow-right" /></Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*CART PAGE END*/}
      <Footer />
    </>
  );
};

export default CartPage;