import { Link, useParams } from 'react-router-dom'
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import { useAuth } from '../../context/auth.context';
import useFetchData from '../../hooks/useFetchData';
import apis from '../../api/apis';
import formatDate from '../../helpers/formatDate';
import downloadPDF from '../../helpers/DownLoadPDF';

const InvoicePage = () => {
  const { id } = useParams();
  const { validToken } = useAuth();
  const { data } = useFetchData(validToken ? `${apis.order.get}/${id}` : null, validToken);

  const order = data?.data;

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
                  <h1>Order Invoice</h1>
                  <ul>
                    <li><Link to="/"><i className="fal fa-home-lg" /> Home</Link></li>
                    <li><Link to="#">Order Invoice</Link></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*PAGE BANNER END*/}

      {/*DSHBOARD START*/}
      <section className="dashboard mb-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 wow fadeInRight">
              <div className="dashboard_content mt-3">
                <h3 className="dashboard_title">
                  Order Invoice
                  <div className="col-4 text-center">
                    <button
                      className="back_btn common_btn"
                      onClick={() => downloadPDF("invoice-user-pdf", `Invoice-${order?._id}.pdf`)}
                    >
                      Download
                    </button>
                  </div>
                  <Link className="back_btn common_btn" to="/dashboard">Go Back</Link>
                </h3>

                <div id="invoice-user-pdf">
                  <div className="dashboard_order_invoice_area">
                    <div className="dashboard_order_invoice">
                      <div className="dashboard_invoice_logo_area">
                        <div className="invoice_logo">
                          <img src="/assets/graphics/logo.jpeg" alt="logo" className="img-fluid w-100" />
                        </div>
                        <div className="text">
                          <h2>invoice</h2>
                          <p>Order Id: {order?._id}</p>
                          <p>Order Date: {formatDate(order?.createdAt)}</p>
                          <p>Order Status: {order?.orderStatus}</p>
                          <p>Payment Status: {order?.paymentStatus}</p>
                          <p>Payment Method: {order?.paymentMethod}</p>
                        </div>
                      </div>
                      <div className="dashboard_invoice_header">
                        <div className="text">
                          <h2>Bill To</h2>
                          <p>{order?.address?.address}</p>
                          <p>{order?.address?.mobile}</p>
                          <p>{order?.address?.email}</p>
                        </div>
                        <div className="text">
                          <h2>Ship To</h2>
                          <ul>
                            <li><span>Name:</span> {order?.address?.name}</li>
                            <li><span>Email:</span> {order?.address?.email}</li>
                            <li><span>Mobile:</span> {order?.address?.mobile}</li>
                            <li><span>State:</span> {order?.address?.state}</li>
                            <li><span>City:</span> {order?.address?.city}</li>
                            <li><span>Zip Code:</span> {order?.address?.zip}</li>
                            <li><span>Address:</span> {order?.address?.address}</li>
                          </ul>
                        </div>
                      </div>
                      <div className="invoice_table">
                        <div className="table-responsive">
                          <table className="table">
                            <thead>
                              <tr>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>GST</th>
                                <th>Total</th>
                              </tr>
                            </thead>
                            <tbody>
                              {
                                order?.items?.map((d) => (
                                  <tr>
                                    <td>{d?.name}</td>
                                    <td>Rs.{d?.price}</td>
                                    <td>{d?.quantity}</td>
                                    <td>{d?.gstPercent}%</td>
                                    <td>Rs.{d?.total}</td>
                                  </tr>
                                ))
                              }
                            </tbody>
                            <tr>
                              <td colSpan="4" className="text-end"><strong>Subtotal:</strong></td>
                              <td><strong>Rs.{order?.subtotal}</strong></td>
                            </tr>
                            <tr>
                              <td colSpan="4" className="text-end"><strong>Shipping:</strong></td>
                              <td><strong>Rs.{order?.shippingCharge}</strong></td>
                            </tr>
                            <tr>
                              <td colSpan="4" className="text-end"><strong>Grand Total:</strong></td>
                              <td><strong>Rs.{order?.totalAmount}</strong></td>
                            </tr>
                          </table>
                        </div>
                      </div>
                      {/* <div className="dashboard_invoice_footer">
                        <h4>Notes</h4>
                        <p>Thanks for your purchase</p>
                        <a className="common_btn" href="#">Print PDF</a>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*DSHBOARD END*/}
      <Footer />
    </>
  );
};

export default InvoicePage;