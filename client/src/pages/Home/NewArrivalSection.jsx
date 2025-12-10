import { Link, useNavigate } from "react-router-dom";
import apis, { API_BASE_URL } from "../../api/apis";
import Swiper from "../../components/Swiper/Swiper";
import { useAuth } from "../../context/auth.context";
import { useEffect } from "react";
import { toast } from "react-toastify";
import useCreate from "../../hooks/useCreate";
import { useCart } from "../../context/cart.context";

const NewArrivalSection = ({ newArrivalProducts = [], refetch }) => {
  const navigaton = useNavigate();
  const { userId } = useAuth();
  const { refetchCart } = useCart();
  const { postData: addProductToCart, response: cartResponse, postError: cartError } = useCreate(apis.cart.add);

  const handleAddToCart = async (e, productId, quantity = 1, userId) => {
    e.preventDefault();
    await addProductToCart({ productId, quantity, userId });
  };

  useEffect(() => {
    if (cartResponse?.success) {
      refetch();
      refetchCart();
      toast.success(cartResponse?.message || "Added to cart");
    } else {
      toast.error(cartError || "Something went wrong");
    };
  }, [cartResponse, cartError, refetch, refetchCart]);

  return (
    <>
      {
        newArrivalProducts?.length > 0 && (
          <section className="flash_sell ">
            <div className="container">
              <div className="row align-items-center mb-3">
                <div className="col-xxl-6 col-xl-6">
                  <div className="section_heading_2 section_heading">
                    <h3><span>New</span> Arrivals</h3>
                  </div>
                </div>
                {/* <div className="col-xxl-6 col-xl-6">
                  <div className="view_all_btn_area">
                    <a className="view_all_btn" href="#">View all</a>
                  </div>
                </div> */}
              </div>

              <Swiper
                items={newArrivalProducts}
                slidesPerView={4}
                autoplayDelay={2500}
                breakpoints={{
                  320: { slidesPerView: 2 },
                  576: { slidesPerView: 2 },
                  768: { slidesPerView: 3 },
                  1200: { slidesPerView: 4 },
                }}
                renderSlide={(d) => (
                  <div className="product_item_2 product_item">
                    <div className="product_img">
                      <img
                        src={`${API_BASE_URL}/${d?.images?.[0]}`}
                        alt={d?.name}
                        className="img-fluid w-100"
                        onClick={() => navigaton(`/product-detail/${d?.slug}`)}
                        style={{ cursor: "pointer" }}
                      />
                      <ul className="discount_list">
                        {d?.percentOff && (
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
                      <Link className="title" to={`/product-detail/${d?.slug}`}>
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
                              value={d?.quantity}
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
        )
      }
    </>
  );
};

export default NewArrivalSection;