import { Link } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';

const ProductDetailPage = () => {
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
                  <h1>Shop Details</h1>
                  <ul>
                    <li><Link to="/"><i className="fal fa-home-lg" /> Home</Link></li>
                    <li><Link to="/products">Shop</Link></li>
                    <li><Link to="#">Shop Details</Link></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*PAGE BANNER START*/}

      {/*SHOP DETAILS START*/}
      <section className="shop_details mt_100">
        <div className="container">
          <div className="row">
            <div className="col-xxl-12">
              <div className="row">
                <div className="col-lg-7 col-md-10 wow fadeInLeft">
                  <div className="shop_details_slider_area">
                    <div className="row">
                      <div className="col-xl-2 col-lg-3 col-md-3 order-2 order-md-1">
                        <div className="row details_slider_nav">
                          <div className="col-12">
                            <div className="details_slider_nav_item">
                              <img src="assets/images/product_1-1.png" alt="Product" className="img-fluid w-100" />
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="details_slider_nav_item">
                              <img src="assets/images/product_1-2.png" alt="Product" className="img-fluid w-100" />
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="details_slider_nav_item">
                              <img src="assets/images/product_1-3.png" alt="Product" className="img-fluid w-100" />
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="details_slider_nav_item">
                              <img src="assets/images/product_1-4.png" alt="Product" className="img-fluid w-100" />
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="details_slider_nav_item">
                              <img src="assets/images/product_1-5.png" alt="Product" className="img-fluid w-100" />
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="details_slider_nav_item">
                              <img src="assets/images/product_1-6.png" alt="Product" className="img-fluid w-100" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-10 col-lg-9 col-md-9  order-md-1">
                        <div className="row details_slider_thumb">
                          <div className="col-12">
                            <div className="details_slider_thumb_item">
                              <img src="assets/images/product_1-1.png" alt="Dress" className="img-fluid w-100" />
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="details_slider_thumb_item">
                              <img src="assets/images/product_1-2.png" alt="Dress" className="img-fluid w-100" />
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="details_slider_thumb_item">
                              <img src="assets/images/product_1-3.png" alt="Dress" className="img-fluid w-100" />
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="details_slider_thumb_item">
                              <img src="assets/images/product_1-4.png" alt="Dress" className="img-fluid w-100" />
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="details_slider_thumb_item">
                              <img src="assets/images/product_1-5.png" alt="Dress" className="img-fluid w-100" />
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="details_slider_thumb_item">
                              <img src="assets/images/product_1-6.png" alt="Dress" className="img-fluid w-100" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-5 wow fadeInUp">
                  <div className="shop_details_text">
                    <h2 className="details_title">Full Sleeve Hoodie Jacket</h2>
                    <div className="d-flex flex-wrap align-items-center">
                      <p className="stock">In Stock</p>
                      {/* <p class="out_stock stock">out of Stock</p> */}
                      <p className="rating">
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <span>(93 reviews)</span>
                      </p>
                    </div>
                    <h3 className="price">Rs.65.00 <del>Rs.70.00</del></h3>
                    <p className="short_description">Auctor urna nunc id cursus. Scelerisque purus semper eget
                      duis at
                      pharetra vel turpis nunc eget. Auctor urna nunc id cursus Scelerisque purus.</p>
                    <div className="details_single_variant">
                      <p className="variant_title">Size :</p>
                      <ul className="details_variant_size">
                        <li>s</li>
                        <li className="active">M</li>
                        <li>L</li>
                        <li>xl</li>
                        <li>xxl</li>
                      </ul>
                    </div>
                    <div className="d-flex flex-wrap align-items-center">
                      <div className="details_qty_input">
                        <button className="minus"><i className="fal fa-minus" /></button>
                        <input type="text" placeholder="01" />
                        <button className="plus"><i className="fal fa-plus" /></button>
                      </div>
                      <div className="details_btn_area">
                        <Link className="common_btn buy_now" to="/checkout">Buy Now <i className="fas fa-long-arrow-right" /></Link>
                        <Link className="common_btn" to="/cart">Add to cart <i className="fas fa-long-arrow-right" /></Link>
                      </div>
                    </div>
                    <ul className="details_tags_sku">
                      <li><span>SKU:</span> HRYUSG67EG</li>
                      <li><span>Category:</span> Fashion</li>
                      <li><span>Tag:</span> Clothing</li>
                    </ul>
                    <ul className="shop_details_shate">
                      <li>Share:</li>
                      <li><a href="#"><i className="fab fa-facebook-f" /></a></li>
                      <li><a href="#"><i className="fab fa-twitter" /></a></li>
                      <li><a href="#"><i className="fab fa-instagram" /></a></li>
                      <li><a href="#"><i className="fab fa-whatsapp" /></a></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="row mt_90 wow fadeInUp">
                <div className="col-12">
                  <div className="shop_details_des_area">
                    <ul className="nav nav-pills" id="pills-tab2" role="tablist">
                      <li className="nav-item" role="presentation">
                        <button className="nav-link active" id="description-tab" data-bs-toggle="pill" data-bs-target="#description" type="button" role="tab" aria-controls="description" aria-selected="false">Description</button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button className="nav-link" id="description-tab2" data-bs-toggle="pill" data-bs-target="#description2" type="button" role="tab" aria-controls="description2" aria-selected="false">Additional info</button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button className="nav-link" id="description-tab3" data-bs-toggle="pill" data-bs-target="#description3" type="button" role="tab" aria-controls="description3" aria-selected="false">Vendor</button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button className="nav-link" id="description-tab4" data-bs-toggle="pill" data-bs-target="#description4" type="button" role="tab" aria-controls="description4" aria-selected="false">Reviews</button>
                      </li>
                    </ul>
                    <div className="tab-content" id="pills-tabContent2">
                      <div className="tab-pane fade show active" id="description" role="tabpanel" aria-labelledby="description-tab" tabIndex={0}>
                        <div className="shop_details_description">
                          <h3>Description</h3>
                          <p>Uninhibited carnally hired played in whimpered dear gorilla koala
                            depending and much yikes off far quetzal goodness and from for grimaced
                            goodness unaccountably and meadowlark near unblushingly crucial scallop
                            tightly neurotic hungrily some and dear furiously this apart.</p>
                          <ul>
                            <li>Organic raw pecans, organic raw cashews.</li>
                            <li>This butter was produced using a LTG (Low Temperature Grinding)
                              process</li>
                            <li>Made in machinery that processes tree nuts but does not process
                              peanuts, gluten, dairy or soy</li>
                          </ul>
                          <p>Laconic overheard dear woodchuck wow this outrageously taut beaver hey
                            hello far meadowlark imitatively egregiously hugged that yikes minimally
                            unanimous pouted flirtatiously as beaver beheld above forward energetic
                            across this jeepers beneficently cockily less a the raucously that
                            magic.</p>
                          <h3>Packaging &amp; Delivery</h3>
                          <p>Less lion goodness that euphemistically robin expeditiously bluebird
                            smugly scratched far while thus cackled sheepishly rigid after due one
                            assenting regarding censorious while occasional or this more crane went
                            more as this less much amid overhung anathematic because much held one
                            exuberantly sheep goodness so where rat wry well concomitantly.</p>
                          <ul>
                            <li>This butter was produced using a LTG (Low Temperature Grinding)
                              process</li>
                            <li>Made in machinery that processes tree nuts but does not process
                              peanuts, gluten, dairy or soy</li>
                          </ul>
                          <h3>Suggested Use</h3>
                          <ul>
                            <li>Refrigeration not necessary.</li>
                            <li>Stir before serving</li>
                          </ul>
                          <h3>Other Ingredients</h3>
                          <ul>
                            <li>Organic raw pecans, organic raw cashews.</li>
                            <li>This butter was produced using a LTG (Low Temperature Grinding)
                              process</li>
                            <li>Made in machinery that processes tree nuts but does not process
                              peanuts, gluten, dairy or soy</li>
                          </ul>
                          <h3>Warnings</h3>
                          <ul>
                            <li>Oil separation occurs naturally. May contain pieces of shell.</li>
                          </ul>
                        </div>
                      </div>
                      <div className="tab-pane fade" id="description2" role="tabpanel" aria-labelledby="description-tab2" tabIndex={0}>
                        <div className="shop_details_additional_info">
                          <div className="table-responsive">
                            <table className="table table-striped">
                              <tbody>
                                <tr>
                                  <th>Stand Up</th>
                                  <td>
                                    35″L x 24″W x 37-45″H(front to back wheel)
                                  </td>
                                </tr>
                                <tr>
                                  <th>Folded (w/o wheels)</th>
                                  <td>
                                    32.5″L x 18.5″W x 16.5″H
                                  </td>
                                </tr>
                                <tr>
                                  <th>Folded (w/ wheels)</th>
                                  <td>
                                    32.5″L x 24″W x 18.5″H
                                  </td>
                                </tr>
                                <tr>
                                  <th>Door Pass Through</th>
                                  <td>
                                    24
                                  </td>
                                </tr>
                                <tr>
                                  <th>Frame</th>
                                  <td>
                                    Aluminum
                                  </td>
                                </tr>
                                <tr>
                                  <th>Weight (w/o wheels)</th>
                                  <td>
                                    20 LBS
                                  </td>
                                </tr>
                                <tr>
                                  <th>Weight Capacity</th>
                                  <td>
                                    40 LBS
                                  </td>
                                </tr>
                                <tr>
                                  <th>Width</th>
                                  <td>
                                    24″
                                  </td>
                                </tr>
                                <tr>
                                  <th>Handle height (ground to handle)</th>
                                  <td>
                                    37-45″
                                  </td>
                                </tr>
                                <tr>
                                  <th>Wheels</th>
                                  <td>
                                    12″ air / wide track slick tread
                                  </td>
                                </tr>
                                <tr>
                                  <th>Seat back height</th>
                                  <td>
                                    21.5″
                                  </td>
                                </tr>
                                <tr>
                                  <th>Head room (inside canopy)</th>
                                  <td>
                                    25″
                                  </td>
                                </tr>
                                <tr>
                                  <th>Color</th>
                                  <td>
                                    Black, Blue, Red, White
                                  </td>
                                </tr>
                                <tr>
                                  <th>Size</th>
                                  <td>
                                    M, S
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                      <div className="tab-pane fade" id="description3" role="tabpanel" aria-labelledby="description-tab3" tabIndex={0}>
                        <div className="shop_details_vendor">
                          <div className="shop_details_vendor_logo_area">
                            <div className="img">
                              <img src="assets/images/brand7.png" alt="Vendor" className="img-fluid" />
                            </div>
                            <h3>
                              Zapier Gallery
                              <span>
                                <i className="fas fa-star" />
                                <i className="fas fa-star" />
                                <i className="fas fa-star" />
                                <i className="fas fa-star" />
                                <i className="far fa-star" />
                                <b>(20 reviews)</b>
                              </span>
                            </h3>
                          </div>
                          <ul className="shop_details_vendor_address">
                            <li>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                              </svg>
                              <span>Address:</span>
                              37 W 24th St, New York, NY
                            </li>
                            <li>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 9v.906a2.25 2.25 0 0 1-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 0 0 1.183 1.981l6.478 3.488m8.839 2.51-4.66-2.51m0 0-1.023-.55a2.25 2.25 0 0 0-2.134 0l-1.022.55m0 0-4.661 2.51m16.5 1.615a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V8.844a2.25 2.25 0 0 1 1.183-1.981l7.5-4.039a2.25 2.25 0 0 1 2.134 0l7.5 4.039a2.25 2.25 0 0 1 1.183 1.98V19.5Z" />
                              </svg>
                              <span>Email:</span>
                              info@Zenis.com
                            </li>
                            <li>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 3.75 18 6m0 0 2.25 2.25M18 6l2.25-2.25M18 6l-2.25 2.25m1.5 13.5c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 0 1 4.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 0 0-.38 1.21 12.035 12.035 0 0 0 7.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 0 1 1.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 0 1-2.25 2.25h-2.25Z" />
                              </svg>
                              <span>Contact Seller:</span>
                              +123 324 5879 39
                            </li>
                          </ul>
                          <ul className="shop_details_vendor_rating">
                            <li>
                              <span>Rating</span>
                              92%
                            </li>
                            <li>
                              <span>Ship on time</span>
                              100%
                            </li>
                            <li>
                              <span>Chat response</span>
                              97%
                            </li>
                          </ul>
                          <p className="shop_details_vendor_description">
                            Noodles &amp; Company is an American fast-casual restaurant that offers
                            international and American noodle dishes and pasta in addition to soups
                            and salads. Noodles &amp; Company was founded in 1995 by Aaron Kennedy and
                            is headquartered in Broomfield, Colorado. The company went public in
                            2013 and recorded a Rs.457 million revenue in 2017.In late 2018, there
                            were 460 Noodles &amp; Company locations across 29 states and Washington,
                            D.C.
                          </p>
                        </div>
                      </div>
                      <div className="tab-pane fade" id="description4" role="tabpanel" aria-labelledby="description-tab4" tabIndex={0}>
                        <div className="shop_details_review">
                          <div className="single_review_list_area">
                            <h3>Customer Reviews</h3>
                            <div className="single_review">
                              <div className="img">
                                <img src="assets/images/testimonial_img_2.jpg" alt="Reviews" className="img-fluid w-100" />
                              </div>
                              <div className="text">
                                <h5>
                                  sumona islam
                                  <span>
                                    <i className="fas fa-star" />
                                    <i className="fas fa-star" />
                                    <i className="fas fa-star" />
                                    <i className="fas fa-star" />
                                    <i className="fas fa-star" />
                                  </span>
                                </h5>
                                <p className="date">05 January 2025</p>
                                <p className="description">Lorem ipsum dolor sit amet,
                                  consectetur adipisicing elit. Delectus
                                  exercitationem accusantium obcaecati quos voluptate
                                  nesciunt facilis itaque.</p>
                                <ul>
                                  <li>
                                    <img src="assets/images/product_13.png" alt="Image" className="img-fluid w-100" />
                                  </li>
                                  <li>
                                    <img src="assets/images/product_9.png" alt="Image" className="img-fluid w-100" />
                                  </li>
                                  <li>
                                    <img src="assets/images/product_20.png" alt="Image" className="img-fluid w-100" />
                                  </li>
                                  <li>
                                    <img src="assets/images/product_24.png" alt="Image" className="img-fluid w-100" />
                                  </li>
                                  <li>
                                    <img src="assets/images/product_6.png" alt="Image" className="img-fluid w-100" />
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div className="single_review">
                              <div className="img">
                                <img src="assets/images/comment_1.png" alt="Reviews" className="img-fluid w-100" />
                              </div>
                              <div className="text">
                                <h5>Smith Jhon
                                  <span>
                                    <i className="fas fa-star" />
                                    <i className="fas fa-star" />
                                    <i className="fas fa-star" />
                                    <i className="fas fa-star" />
                                    <i className="far fa-star" />
                                  </span>
                                </h5>
                                <p className="date">03 April 2025</p>
                                <p className="description">Lorem ipsum dolor sit amet,
                                  consectetur adipisicing elit. Delectus
                                  exercitationem accusantium obcaecati quos voluptate.
                                </p>
                                <ul>
                                  <li>
                                    <img src="assets/images/product_20.png" alt="Image" className="img-fluid w-100" />
                                  </li>
                                  <li>
                                    <img src="assets/images/product_24.png" alt="Image" className="img-fluid w-100" />
                                  </li>
                                  <li>
                                    <img src="assets/images/product_6.png" alt="Image" className="img-fluid w-100" />
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div className="single_review">
                              <div className="img">
                                <img src="assets/images/comment_2.png" alt="Reviews" className="img-fluid w-100" />
                              </div>
                              <div className="text">
                                <h5>
                                  arun singh
                                  <span>
                                    <i className="fas fa-star" />
                                    <i className="fas fa-star" />
                                    <i className="fas fa-star" />
                                    <i className="fas fa-star" />
                                    <i className="fas fa-star" />
                                  </span>
                                </h5>
                                <p className="date">10 March 2025</p>
                                <p className="description">Lorem ipsum dolor sit amet,
                                  consectetur adipisicing elit. Delectus
                                  exercitationem accusantium obcaecati quos voluptate
                                  nesciunt facilis itaque</p>
                                <ul>
                                  <li>
                                    <img src="assets/images/product_13.png" alt="Image" className="img-fluid w-100" />
                                  </li>
                                  <li>
                                    <img src="assets/images/product_9.png" alt="Image" className="img-fluid w-100" />
                                  </li>
                                  <li>
                                    <img src="assets/images/product_20.png" alt="Image" className="img-fluid w-100" />
                                  </li>
                                  <li>
                                    <img src="assets/images/product_24.png" alt="Image" className="img-fluid w-100" />
                                  </li>
                                  <li>
                                    <img src="assets/images/product_6.png" alt="Image" className="img-fluid w-100" />
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div className="single_review">
                              <div className="img">
                                <img src="assets/images/testimonial_img_2.jpg" alt="Reviews" className="img-fluid w-100" />
                              </div>
                              <div className="text">
                                <h5>
                                  sumona islam
                                  <span>
                                    <i className="fas fa-star" />
                                    <i className="fas fa-star" />
                                    <i className="fas fa-star" />
                                    <i className="fas fa-star" />
                                    <i className="fas fa-star" />
                                  </span>
                                </h5>
                                <p className="date">05 January 2025</p>
                                <p className="description">Lorem ipsum dolor sit amet,
                                  consectetur adipisicing elit. Delectus
                                  exercitationem accusantium obcaecati quos voluptate
                                  nesciunt facilis itaque.</p>
                                <ul>
                                  <li>
                                    <img src="assets/images/product_9.png" alt="Image" className="img-fluid w-100" />
                                  </li>
                                  <li>
                                    <img src="assets/images/product_20.png" alt="Image" className="img-fluid w-100" />
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div className="row">
                              <div className="pagination_area">
                                <nav aria-label="...">
                                  <ul className="pagination justify-content-start mt_25">
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*SHOP DETAILS END*/}

      {/*RELATED PRODUCTS START*/}
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
      {/*RELATED PRODUCTS END*/}
      <Footer />
    </>
  );
};

export default ProductDetailPage;