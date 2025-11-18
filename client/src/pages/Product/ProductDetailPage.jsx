import { Link } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import useFetch from '../../hooks/useFetch';
import apis from '../../api/apis';

const ProductDetailPage = () => {
  const { data } = useFetch(apis.home.getAll);
  const categories = data?.data?.category;

  return (
    <>
      <Header categories={categories} />
      <div>
        {/*PAGE BANNER START*/}
        <section className="page_banner" style={{ background: 'url(assets/images/page_banner_bg.jpg)' }}>
          <div className="page_banner_overlay">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="page_banner_text wow fadeInUp">
                    <h1>Shop Details</h1>
                    <ul>
                      <li><a href="#"><i className="fal fa-home-lg" /> Home</a></li>
                      <li><a href="#">Shop</a></li>
                      <li><a href="#">Shop Details</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/*PAGE BANNER START*/}
        <section className="videosec">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="youtubevideode">
                  <iframe width="100%" height={286} src="https://www.youtube.com/embed/c3cJM8B2c-k" title="KENT RO Water Purifiers" frameBorder={0} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="youtubecontent">
                  <h1>KENT Grand</h1>
                  <p>KENT Grand is all new, state of the art RO Water Purifier that utilises multiple purification process of RO+UF+TDS Control to make water pure and healthy. It is equipped with Mineral ROTM Technology that retains essential natural minerals in the purified water. Also, it comes with UV LED light in its storage tank that keeps purified water bacteria free and pure. Best suited for Indian homes and offices, this purifier is ideal for purification of brackish/tap water/municipal corporation water supply.</p>
                  <div className="amazonsbtn">
                    {/* <a class="am1" href="#shopdet">Buy Now </a> */}
                    <a className="am1" href="#shopdet"><img src="assets/graphics/aqwa.svg" /> </a>
                    <a className="am1" href="#shopdet"><img src="assets/graphics/flipkart.svg" /> </a>
                    <a className="am1" href="#shopdet"><img src="assets/graphics/amazon.svg" /> </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/*SHOP DETAILS START*/}
        <section id="shopdet" className="shop_details mt_100">
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
                          <a className="common_btn buy_now" href="checkout.php">Buy Now <i className="fas fa-long-arrow-right" /></a>
                          <a className="common_btn" href="cart.php">Add to cart <i className="fas fa-long-arrow-right" /></a>
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
            <div className="row  flash_sell_2_slider">
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
      </div>
      <Footer />
    </>
  );
};

export default ProductDetailPage;