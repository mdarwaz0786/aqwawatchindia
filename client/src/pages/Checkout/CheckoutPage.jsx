import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import apis, { API_BASE_URL } from "../../api/apis";
import { useAuth } from "../../context/auth.context";
import useFetchData from "../../hooks/useFetchData";
import { useApp } from "../../context/app.context";
import axios from "axios";
import { toast } from "react-toastify";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { userId, isLoggedIn, logOutUser, user, validToken } = useAuth();
  const { categories } = useApp();

  const { data: cartData } = useFetchData(`${apis.cart.get}/${userId}`);
  const { data: addressData } = useFetchData(validToken ? apis.address.getAll : null, validToken);

  const shippingCharge = 40;
  const cart = cartData?.data || [];
  const userAddresses = addressData?.data || [];

  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [newAddress, setNewAddress] = useState({
    label: "Home",
    name: "",
    email: "",
    mobile: "",
    country: "",
    state: "",
    city: "",
    zip: "",
    address: "",
    instruction: "",
  });

  const [useNewAddress, setUseNewAddress] = useState(false);

  const handleChange = (e) => {
    setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async () => {
    if (!isLoggedIn) {
      toast.info("Please login to continue order");
      return navigate("/login");
    }

    if (!paymentMethod) {
      toast.error("Please select a payment method");
      return;
    };

    const payload = {
      paymentMethod,
      shippingCharge,
    };

    if (useNewAddress) {
      payload.address = newAddress;
    } else {
      if (!selectedAddressId) {
        toast.error("Please select an address");
        return;
      };
      payload.addressId = selectedAddressId;
    }

    try {
      const res = await axios.post(
        apis.order.create,
        payload,
        {
          headers: {
            Authorization: validToken,
          },
        }
      );

      if (res?.data?.success) {
        navigate("/order-success");
      }
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message || "Something went wrong");
    };
  };

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

      <section className="checkout_page mt_100 mb_100">
        <div className="container">
          <div className="row">
            {/* LEFT SIDE */}
            <div className="col-lg-8">
              <div className="checkout_header">
                <h3>Shipping Information</h3>
                <p>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                  </svg>
                  account: <b>{user?.name}</b>{isLoggedIn ? <Link to="#" onClick={logOutUser}>(logout)</Link> : <Link to="/login">(login)</Link>}
                </p>
              </div>

              {/* Saved Addresses */}
              <div className="checkout_address_area">
                <div className="row">
                  {userAddresses?.length > 0 &&
                    userAddresses?.map((a) => (
                      <div className="col-md-6" key={a._id}>
                        <div className="checkout_single_address">
                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="addressOption"
                              checked={selectedAddressId === a?._id}
                              onChange={() => {
                                setSelectedAddressId(a?._id);
                                setUseNewAddress(false);
                              }}
                            />
                            <label className="form-check-label">
                              <span>{a?.address}, {a?.city}, {a?.state}, {a?.zip}</span>
                            </label>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* New Address */}
              <div className="accordion">
                <div className="accordion-item border-0">
                  <div className="accordion-header">
                    <div className="accordion-button collapsed p-0"
                      onClick={() => {
                        setUseNewAddress(!useNewAddress);
                        setSelectedAddressId(null);
                      }}>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={useNewAddress}
                          readOnly
                        />
                        <label className="form-check-label ms-2 pt-1">
                          Ship to a different address?
                        </label>
                      </div>
                    </div>
                  </div>

                  {useNewAddress && (
                    <div className="accordion-body p-0">
                      <div className="row">
                        {["name", "email", "mobile", "country", "city", "state", "zip"].map((field) => (
                          <div className="col-md-6" key={field}>
                            <div className="single_input">
                              <label>{field.toUpperCase()} *</label>
                              <input
                                type="text"
                                name={field}
                                value={newAddress[field]}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                        ))}

                        <div className="col-xl-12">
                          <div className="single_input">
                            <label>Address *</label>
                            <textarea
                              rows={4}
                              name="address"
                              value={newAddress.address}
                              onChange={handleChange}
                            />
                          </div>
                        </div>

                        <div className="col-xl-12">
                          <div className="single_input">
                            <label>Instruction (optional)</label>
                            <textarea
                              rows={2}
                              name="instruction"
                              value={newAddress.instruction}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* RIGHT SIDE SUMMARY */}
            <div className="col-lg-4">
              <div className="cart_page_summary">
                <h3>Billing summary</h3>
                <ul>
                  {
                    cart?.map((d) => (
                      <li>
                        <Link className="img" to={`/product-detail/${d?.product?.slug}`}>
                          <img src={`${API_BASE_URL}/${d?.product?.images?.[0]}`} alt="Products" className="img-fluid w-100 h-100" />
                        </Link>
                        <div className="text">
                          <Link className="title" to={`/product-detail/${d?.product?.slug}`}>{d?.product?.name}</Link>
                          <p>Rs.{d?.price} × {d?.quantity}</p>
                        </div>
                      </li>
                    ))
                  }
                </ul>
                <h6>Subtotal <span>Rs.{cartData?.totalAmount}</span></h6>
                <h6>Shipping Charge <span>(+) Rs.{shippingCharge}</span></h6>
                <h4>Total <span>Rs.{(cartData?.totalAmount || 0) + shippingCharge}</span></h4>
              </div>

              {/* Payment Method */}
              <div className="checkout_payment">
                <h3>Payment method</h3>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="payment"
                    onChange={() => setPaymentMethod("Online")}
                  />
                  <label className="form-check-label">Online Payment</label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="payment"
                    onChange={() => setPaymentMethod("COD")}
                  />
                  <label className="form-check-label">Cash on Delivery</label>
                </div>
                <button className="common_btn" onClick={handlePlaceOrder}>
                  Place order
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default CheckoutPage;
