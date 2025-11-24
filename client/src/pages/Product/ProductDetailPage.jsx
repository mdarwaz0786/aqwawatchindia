import { Link, useNavigate, useParams } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import useFetch from '../../hooks/useFetch';
import apis, { API_BASE_URL } from '../../api/apis';
import flipKartIcon from "../../assets/icon/flipkart.svg";
import amazonIcon from "../../assets/icon/amazon.svg";
import aquaIcon from "../../assets/icon/aqwa.svg";
import { useEffect, useState } from 'react';
import Swiper from '../../components/Swiper/Swiper';

const ProductDetailPage = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const { data } = useFetch(apis.home.getAll);
  const { data: productDetails } = useFetch(`${apis.product.getSingle}/${slug}`);
  const { data: relatedProduct } = useFetch(`${apis.product.related}/${slug}`);
  const categories = data?.data?.category;
  const productDetail = productDetails?.data;
  const relatedProducts = relatedProduct?.data || [];

  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    if (productDetail?.images?.length > 0) {
      setSelectedImage(productDetail?.images[0]);
    };
  }, [productDetail]);

  const specHTML = productDetail?.specification
    ?.replace(/<table[^>]*>/g, '<table class="table table-bordered table-striped">')
    .replace(/<th([^>]*)>/g, '<th$1 class="fw-bold bg-light">')
    .replace(/data-[a-zA-Z0-9-]+="[^"]*"/g, "");

  const handleClick = (slug) => {
    if (slug) {
      navigate(`/product-detail/${slug}`);
    }
  };

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
                      <li><Link to="/"><i className="fal fa-home-lg" /> Home</Link></li>
                      <li><Link to="/products">Shop</Link></li>
                      <li><a href="#">Shop Details</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/*PAGE BANNER END*/}

        <section className="videosec">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                {(productDetail?.youtubeVideoLink) &&
                  <div
                    className="youtubevideode"
                    dangerouslySetInnerHTML={{ __html: productDetail?.youtubeVideoLink }}
                  />
                }
              </div>
              <div className="col-lg-6">
                <div className="youtubecontent">
                  <h1>{productDetail?.name}</h1>
                  {productDetail?.smallInfo && <p dangerouslySetInnerHTML={{ __html: productDetail?.smallInfo }}></p>}
                  <div className="amazonsbtn">
                    {productDetail?.flipKartLink && <Link className="am1 me-3" to={productDetail?.flipKartLink} target="_blank"><img src={flipKartIcon} /> </Link>}
                    {productDetail?.amazonLink && <Link className="am1 me-3" to={productDetail?.amazonLink} target="_blank"><img src={amazonIcon} /> </Link>}
                    <a className="am1" href="#shopdet"><img src={aquaIcon} /> </a>
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
                        {/* Thumbnails */}
                        <div className="col-xl-2 col-lg-3 col-md-3 order-2 order-md-1">
                          <div className="row details_slider_nav">
                            {productDetail?.images?.map((img, index) => (
                              <div className="col-12 mb-2" key={index}>
                                <div
                                  className="details_slider_nav_item"
                                  style={{
                                    border:
                                      selectedImage === img
                                        ? "2px solid #ff2d55"
                                        : "2px solid white",
                                    cursor: "pointer",
                                  }}
                                  onClick={() => setSelectedImage(img)}
                                >
                                  <img
                                    src={`${API_BASE_URL}${img.startsWith("/") ? "" : "/"}${img}`}
                                    alt="Product"
                                    className="img-fluid w-80"
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Main Image */}
                        <div className="col-xl-10 col-lg-9 col-md-9 order-md-1">
                          <div className="row details_slider_thumb">
                            <div className="col-12">
                              <div className="details_slider_thumb_item">
                                <img
                                  src={`${API_BASE_URL}${selectedImage.startsWith("/") ? "" : "/"}${selectedImage}`}
                                  alt="Product"
                                  className="img-fluid w-100"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-5 wow fadeInUp">
                    <div className="shop_details_text">
                      <h2 className="details_title">{productDetail?.name}</h2>
                      <div className="d-flex flex-wrap align-items-center">
                        {
                          productDetail?.stock > 0 ? (<p className="stock">In Stock</p>) : (<p class="out_stock stock">out of Stock</p>)
                        }
                        <p className="rating">
                          {[...Array(5)].map((_, i) => (
                            <i
                              key={i}
                              className={`${i < Math.round(productDetail?.rating || 0)
                                ? "fas fa-star"
                                : "far fa-star"
                                }`}
                            />
                          ))}
                          <span>({productDetail?.numberOfReviews} reviews)</span>
                        </p>
                      </div>
                      <h3 className="price">Rs.{productDetail?.mrpPrice} <del>Rs.{productDetail?.salePrice}</del></h3>
                      {productDetail?.smallInfo && <p className="short_description" dangerouslySetInnerHTML={{ __html: productDetail?.smallInfo }}></p>}
                      {/* <div className="details_single_variant">
                        <p className="variant_title">Size :</p>
                        <ul className="details_variant_size">
                          <li>s</li>
                          <li className="active">M</li>
                          <li>L</li>
                          <li>xl</li>
                          <li>xxl</li>
                        </ul>
                      </div> */}
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
                      <ul className="details_tags_sku mt-3">
                        <li><span>SKU:</span> {productDetail?.skuCode}</li>
                        <li><span>Category:</span> {productDetail?.category?.name}</li>
                        <li><span>Brand:</span> {productDetail?.brand?.name}</li>
                        {/* <li><span>Tag:</span> Clothing</li> */}
                      </ul>
                      {/* <ul className="shop_details_shate">
                        <li>Share:</li>
                        <li><a href="#"><i className="fab fa-facebook-f" /></a></li>
                        <li><a href="#"><i className="fab fa-twitter" /></a></li>
                        <li><a href="#"><i className="fab fa-instagram" /></a></li>
                        <li><a href="#"><i className="fab fa-whatsapp" /></a></li>
                      </ul> */}
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
                          <button className="nav-link" id="description-tab2" data-bs-toggle="pill" data-bs-target="#description2" type="button" role="tab" aria-controls="description2" aria-selected="false">Specification</button>
                        </li>
                      </ul>
                      <div className="tab-content" id="pills-tabContent2">
                        <div className="tab-pane fade show active" id="description" role="tabpanel" aria-labelledby="description-tab" tabIndex={0}>
                          {productDetail?.description && <div className="shop_details_description" dangerouslySetInnerHTML={{ __html: productDetail?.description }}></div>}
                        </div>
                        <div className="tab-pane fade" id="description2" role="tabpanel" aria-labelledby="description-tab2" tabIndex={0}>
                          <div className="shop_details_additional_info">
                            {specHTML && <div className="table-responsive" dangerouslySetInnerHTML={{ __html: specHTML }}></div>}
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
      </div>
      <Footer />
    </>
  );
};

export default ProductDetailPage;