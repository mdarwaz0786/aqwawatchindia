import { Link } from 'react-router-dom'
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';

const CheckoutPage = () => {
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
                  <h1>Checkout</h1>
                  <ul>
                    <li><Link to="/"><i className="fal fa-home-lg" /> Home</Link></li>
                    <li><Link to="#">Checkout</Link></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*PAGE BANNER START*/}

      {/*CHECKOUT START*/}
      <section className="checkout_page mt_100 mb_100">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 wow fadeInUp">
              <div className="checkout_header">
                <h3>Shipping Information</h3>
                <p>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                  </svg>
                  account: <b>ahmed rezwan raihan</b> <a href="#">(logout)</a>
                </p>
              </div>
              <div className="checkout_address_area">
                <div className="row">
                  <div className="col-md-6">
                    <div className="checkout_single_address">
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadioAddress01" defaultValue="option1" />
                        <label className="form-check-label" htmlFor="inlineRadioAddress01">
                          <span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                            </svg>
                            37 West 24th Street, New York 10010, United States
                          </span>
                          <span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 9v.906a2.25 2.25 0 0 1-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 0 0 1.183 1.981l6.478 3.488m8.839 2.51-4.66-2.51m0 0-1.023-.55a2.25 2.25 0 0 0-2.134 0l-1.022.55m0 0-4.661 2.51m16.5 1.615a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V8.844a2.25 2.25 0 0 1 1.183-1.981l7.5-4.039a2.25 2.25 0 0 1 2.134 0l7.5 4.039a2.25 2.25 0 0 1 1.183 1.98V19.5Z" />
                            </svg>
                            example@Zenis.com
                          </span>
                          <span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 3.75 18 6m0 0 2.25 2.25M18 6l2.25-2.25M18 6l-2.25 2.25m1.5 13.5c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 0 1 4.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 0 0-.38 1.21 12.035 12.035 0 0 0 7.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 0 1 1.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 0 1-2.25 2.25h-2.25Z" />
                            </svg>
                            +123 324 5879 39
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="checkout_single_address">
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadioAddress02" defaultValue="option1" />
                        <label className="form-check-label" htmlFor="inlineRadioAddress02">
                          <span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                            </svg>
                            37 West 24th Street, New York 10010, United States
                          </span>
                          <span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 9v.906a2.25 2.25 0 0 1-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 0 0 1.183 1.981l6.478 3.488m8.839 2.51-4.66-2.51m0 0-1.023-.55a2.25 2.25 0 0 0-2.134 0l-1.022.55m0 0-4.661 2.51m16.5 1.615a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V8.844a2.25 2.25 0 0 1 1.183-1.981l7.5-4.039a2.25 2.25 0 0 1 2.134 0l7.5 4.039a2.25 2.25 0 0 1 1.183 1.98V19.5Z" />
                            </svg>
                            example@Zenis.com
                          </span>
                          <span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 3.75 18 6m0 0 2.25 2.25M18 6l2.25-2.25M18 6l-2.25 2.25m1.5 13.5c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 0 1 4.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 0 0-.38 1.21 12.035 12.035 0 0 0 7.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 0 1 1.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 0 1-2.25 2.25h-2.25Z" />
                            </svg>
                            +123 324 5879 39
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="checkout_single_address">
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadioAddress03" defaultValue="option1" />
                        <label className="form-check-label" htmlFor="inlineRadioAddress03">
                          <span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                            </svg>
                            37 West 24th Street, New York 10010, United States
                          </span>
                          <span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 9v.906a2.25 2.25 0 0 1-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 0 0 1.183 1.981l6.478 3.488m8.839 2.51-4.66-2.51m0 0-1.023-.55a2.25 2.25 0 0 0-2.134 0l-1.022.55m0 0-4.661 2.51m16.5 1.615a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V8.844a2.25 2.25 0 0 1 1.183-1.981l7.5-4.039a2.25 2.25 0 0 1 2.134 0l7.5 4.039a2.25 2.25 0 0 1 1.183 1.98V19.5Z" />
                            </svg>
                            example@Zenis.com
                          </span>
                          <span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 3.75 18 6m0 0 2.25 2.25M18 6l2.25-2.25M18 6l-2.25 2.25m1.5 13.5c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 0 1 4.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 0 0-.38 1.21 12.035 12.035 0 0 0 7.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 0 1 1.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 0 1-2.25 2.25h-2.25Z" />
                            </svg>
                            +123 324 5879 39
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="checkout_single_address">
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadioAddress04" defaultValue="option1" />
                        <label className="form-check-label" htmlFor="inlineRadioAddress04">
                          <span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                            </svg>
                            37 West 24th Street, New York 10010, United States
                          </span>
                          <span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 9v.906a2.25 2.25 0 0 1-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 0 0 1.183 1.981l6.478 3.488m8.839 2.51-4.66-2.51m0 0-1.023-.55a2.25 2.25 0 0 0-2.134 0l-1.022.55m0 0-4.661 2.51m16.5 1.615a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V8.844a2.25 2.25 0 0 1 1.183-1.981l7.5-4.039a2.25 2.25 0 0 1 2.134 0l7.5 4.039a2.25 2.25 0 0 1 1.183 1.98V19.5Z" />
                            </svg>
                            example@Zenis.com
                          </span>
                          <span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 3.75 18 6m0 0 2.25 2.25M18 6l2.25-2.25M18 6l-2.25 2.25m1.5 13.5c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 0 1 4.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 0 0-.38 1.21 12.035 12.035 0 0 0 7.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 0 1 1.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 0 1-2.25 2.25h-2.25Z" />
                            </svg>
                            +123 324 5879 39
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <form className="checkout_form_area">
                <div className="accordion" id="accordionExample">
                  <div className="accordion-item border-0">
                    <div className="accordion-header">
                      <div className="accordion-button collapsed p-0" data-bs-toggle="collapse" role="tabpanel" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" defaultValue id="flexCheckDefault" />
                          <label className="form-check-label" htmlFor="flexCheckDefault">
                            Bill to a different address?
                          </label>
                        </div>
                      </div>
                    </div>
                    <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                      <div className="accordion-body p-0">
                        <div className="row">
                          <div className="col-md-6">
                            <div className="single_input">
                              <label>Name *</label>
                              <input type="text" placeholder="Jhon deo" />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="single_input">
                              <label>Email *</label>
                              <input type="email" placeholder="example@Zenis.com" />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="single_input">
                              <label>Phone</label>
                              <input type="text" placeholder={+965421541845845} />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="single_input">
                              <label>Company name</label>
                              <input type="text" placeholder="Zenis.com" />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="single_input">
                              <label>Country</label>
                              <select className="select_2">
                                <option value="#">Singapore</option>
                                <option value="#">Japan</option>
                                <option value="#">Korea</option>
                                <option value="#">Thailand</option>
                                <option value="#">Kanada</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="single_input">
                              <label>City</label>
                              <select className="select_2">
                                <option value="#">Tokyo</option>
                                <option value="#">Japan</option>
                                <option value="#">Korea</option>
                                <option value="#">Thailand</option>
                                <option value="#">Kanada</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="single_input">
                              <label>state</label>
                              <select className="select_2">
                                <option value="#">Korea</option>
                                <option value="#">Singapore</option>
                                <option value="#">Japan</option>
                                <option value="#">Thailand</option>
                                <option value="#">Kanada</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="single_input">
                              <label>zip</label>
                              <input type="text" placeholder={1234} />
                            </div>
                          </div>
                          <div className="col-xl-12">
                            <div className="single_input">
                              <label>Address</label>
                              <textarea rows={4} placeholder="Write your address" defaultValue={""} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-12">
                  <div className="single_input">
                    <label>Order notes (optional)</label>
                    <textarea rows={2} placeholder="Note" defaultValue={""} />
                  </div>
                </div>
              </form>
            </div>
            <div className="col-lg-4 col-md-9 wow fadeInRight">
              <div className="cart_page_summary">
                <h3>Billing summary</h3>
                <a className="vendor_name" href="vendor_details.html">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" />
                  </svg>
                  Zapier Gallery
                </a>
                <ul>
                  <li>
                    <a className="img" href="shop_details.html">
                      <img src="assets/images/product_18.png" alt="Products" className="img-fluid w-100" />
                    </a>
                    <div className="text">
                      <a className="title" href="shop_details.html">Full Sleeve Hoodie Jacket</a>
                      <p>Rs.59.00 × 2</p>
                      <p>Color: Red, Size: XL</p>
                    </div>
                  </li>
                  <li>
                    <a className="img" href="shop_details.html">
                      <img src="assets/images/product_16.png" alt="Products" className="img-fluid w-100" />
                    </a>
                    <div className="text">
                      <a className="title" href="shop_details.html">cherry fabric western tops</a>
                      <p>Rs.75.00 × 1</p>
                      <p>Color: Orange, Size: M</p>
                    </div>
                  </li>
                </ul>
                <a className="vendor_name" href="vendor_details.html">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" />
                  </svg>
                  Comfort Gallery
                </a>
                <ul>
                  <li>
                    <a className="img" href="shop_details.html">
                      <img src="assets/images/product_18.png" alt="Products" className="img-fluid w-100" />
                    </a>
                    <div className="text">
                      <a className="title" href="shop_details.html">Full Sleeve Hoodie Jacket</a>
                      <p>Rs.59.00 × 2</p>
                      <p>Color: Red, Size: XL</p>
                    </div>
                  </li>
                </ul>
                <h6>subtotal <span>Rs.395.00</span></h6>
                <h6>Tax <span>(+) Rs.100.00</span></h6>
                <h6>Discount <span>(-) Rs.45.00</span></h6>
                <h4>Subtotal <span>Rs.350.00</span></h4>
                <div className="checkout_shipping">
                  <h6>Shipping method</h6>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="flexRadioDefaul" id="flexRadioDefaultShip4" />
                    <label className="form-check-label" htmlFor="flexRadioDefaultShip4">
                      Flat rate: <span>(+) Rs.15.00</span>
                    </label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="flexRadioDefaul" id="flexRadioDefaultShip2" />
                    <label className="form-check-label" htmlFor="flexRadioDefaultShip2">
                      Local pickup: <span>(+) Rs.19.00</span>
                    </label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="flexRadioDefaul" id="flexRadioDefaultShip3" />
                    <label className="form-check-label" htmlFor="flexRadioDefaultShip3">
                      Free shipping
                    </label>
                  </div>
                </div>
                <h4>Total <span>Rs.410.00</span></h4>
              </div>
              <div className="checkout_payment">
                <h3>payment method</h3>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                  <label className="form-check-label" htmlFor="flexRadioDefault1">
                    Direct Bank Transfer
                  </label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3" />
                  <label className="form-check-label" htmlFor="flexRadioDefault3">
                    Cash on Delivery
                  </label>
                </div>
                <div className="checkout_card">
                  <p>Card Payment</p>
                  <ul>
                    <li><img src="assets/images/payment-1.jpg" alt="Payment" className="img-fluid w-100" /></li>
                    <li className="active"><img src="assets/images/payment-2.jpg" alt="Payment" className="img-fluid w-100" /></li>
                    <li><img src="assets/images/payment-3.jpg" alt="Payment" className="img-fluid w-100" /></li>
                    <li><img src="assets/images/payment-4.jpg" alt="Payment" className="img-fluid w-100" /></li>
                    <li><img src="assets/images/payment-5.jpg" alt="Payment" className="img-fluid w-100" /></li>
                  </ul>
                </div>
                <div className="terms">
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" defaultValue id="flexCheckDefaultterms" />
                    <label className="form-check-label" htmlFor="flexCheckDefaultterms">
                      I have read and agree to the website.
                    </label>
                  </div>
                </div>
                <button type="submit" className="common_btn">Place order <i className="fas fa-long-arrow-right" /></button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*CHECKOUT END*/}
      <Footer />
    </>
  );
};

export default CheckoutPage;