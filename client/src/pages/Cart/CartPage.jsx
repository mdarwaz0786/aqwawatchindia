/* eslint-disable react-hooks/exhaustive-deps */
import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import apis, { API_BASE_URL } from "../../api/apis";
import { useAuth } from "../../context/auth.context";
import useDelete from "../../hooks/useDelete";
import { useEffect } from "react";
import { toast } from "react-toastify";
import useCreate from "../../hooks/useCreate";
import { useCart } from "../../context/cart.context";

const CartPage = () => {
  const { userId } = useAuth();
  const { refetchCart, cartItems } = useCart();
  const { deleteData: deleteCartData, deleteResponse: deleteCartResponse, deleteError: deleteCartError } = useDelete();
  const { postData: addProductToCart, response: cartResponse, postError: cartError } = useCreate(apis.cart.add);

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

  const handleAddToCart = async (e, productId, quantity = 1, userId) => {
    e.preventDefault();
    await addProductToCart({ productId, quantity, userId });
  };

  useEffect(() => {
    if (cartResponse?.success) {
      toast.success(cartResponse?.message || "Added to cart");
      refetchCart();
    } else if (cartError) {
      toast.error(cartError || "Something went wrong");
    };
  }, [cartResponse, cartError]);

  useEffect(() => {
    const hasReloaded = sessionStorage.getItem("cart_reloaded");

    if (!hasReloaded) {
      sessionStorage.setItem("cart_reloaded", "true");
      window.location.reload();
    };

    return () => {
      sessionStorage.removeItem("cart_reloaded");
    };
  }, []);

  const cart = cartItems?.data;

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
                        <th className="cart_page_img">Image</th>
                        <th className="cart_page_details">Details</th>
                        <th className="cart_page_price">Price</th>
                        <th className="cart_page_quantity">Quantity</th>
                        <th className="cart_page_quantity">GST</th>
                        <th className="cart_page_total">Sub Total</th>
                        <th className="cart_page_action">action</th>
                      </tr>
                    </thead>
                  </table>
                </div>

                <div className="table-responsive">
                  <table className="table">
                    <tbody>
                      {
                        cart?.map((d) => (
                          <tr>
                            <td className="cart_page_checkbox">
                              <div className="form-check">
                                <input className="form-check-input" type="checkbox" defaultValue id="flexCheckDefault2" />
                              </div>
                            </td>
                            <td className="cart_page_img">
                              <div className="img">
                                <img src={`${API_BASE_URL}/${d?.product?.images?.[0]}`} alt="Products" className="img" />
                              </div>
                            </td>
                            <td className="cart_page_details">
                              <Link className="title" to={`/product-detail/${d?.product?.slug}`}>{d?.product?.name}</Link>
                              <p>Rs.{d?.price}</p>
                              <span><b>Quantity:</b>{d?.quantity}</span>
                              <span><b>GST:</b>{d?.gstPercent}%</span>
                            </td>
                            <td className="cart_page_price">
                              <h3>Rs.{d?.price}</h3>
                            </td>
                            <td className="cart_page_quantity">
                              <div className="details_qty_input">
                                <button className="minus" onClick={(e) => handleAddToCart(e, d?.product?._id, -1, userId)}><i className="fal fa-minus" aria-hidden="true" /></button>
                                <input type="text" placeholder={d?.quantity} />
                                <button className="plus" onClick={(e) => handleAddToCart(e, d?.product?._id, 1, userId)}><i className="fal fa-plus" aria-hidden="true" /></button>
                              </div>
                            </td>
                            <td className="cart_page_price">
                              <h3>{d?.gstPercent}%</h3>
                            </td>
                            <td className="cart_page_total">
                              <h3>Rs.{d?.totalPrice}</h3>
                            </td>
                            <td className="cart_page_action">
                              <Link to="#" onClick={(e) => handleRemoveCartItem(e, d?.product?._id)}> <i className="fal fa-times" /> Remove</Link>
                            </td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-9 wow fadeInRight">
              <div id="sticky_sidebar">
                <div className="cart_page_summary">
                  <h3>Billing summary</h3>
                  <ul>
                    {
                      cart?.map((d) => (
                        <li>
                          <Link to={`/product-detail/${d?.product?.slug}`}>
                            <img src={`${API_BASE_URL}/${d?.product?.images?.[0]}`} alt="Products" className="img" />
                          </Link>
                          <div className="text">
                            <Link className="title" to={`/product-detail/${d?.product?.slug}`}>Full Sleeve Hoodie Jacket</Link>
                            <p>Rs.{d?.price} × {d?.quantity}</p>
                            <p>GST: {d?.gstPercent}%</p>
                          </div>
                        </li>
                      ))
                    }
                  </ul>
                  <h6>subtotal <span>Rs.{cartItems?.totalAmount}</span></h6>
                  <h4>Total <span>Rs.{cartItems?.totalAmount}</span></h4>
                  {/* <form action="#">
                    <input type="text" placeholder="Coupon code" />
                    <button type="submit" className="common_btn">Apply</button>
                    <p>
                      Coupon Code: HEM4556JL
                      <a href="#"><i className="fal fa-times" /></a>
                    </p>
                  </form> */}
                </div>
                <div className="cart_summary_btn">
                  <Link className="common_btn continue_shopping" to="/products">Contiue shopping {cart?.lenght} </Link>
                  {cart?.length > 0 && <Link className="common_btn" to="/checkout">checkout <i className="fas fa-long-arrow-right" /></Link>}
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