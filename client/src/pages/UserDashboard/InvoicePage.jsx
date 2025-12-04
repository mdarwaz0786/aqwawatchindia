import { Link } from 'react-router-dom'
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import { useApp } from '../../context/app.context';

const InvoicePage = () => {
  const { categories } = useApp();

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
                  <h1>My Account</h1>
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
      <section className="dashboard mb_100">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 wow fadeInUp">
              <div className="dashboard_sidebar">
                <div className="dashboard_sidebar_area">
                  <div className="dashboard_sidebar_user">
                    <h3>Demo</h3>
                    <p>demo@gmail.com</p>
                  </div>
                  <div className="dashboard_sidebar_menu">
                    <ul>
                      <li>
                        <p>dashboard</p>
                      </li>
                      <li>
                        <Link className="active" to="/dashboard">
                          <span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
                            </svg>
                          </span>
                          overview
                        </Link>
                      </li>
                      <li>
                        <Link to="/forgot-password">
                          <span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                            </svg>
                          </span>
                          Change Password
                        </Link>
                      </li>
                      <li>
                        <Link to="#">
                          <span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                            </svg>
                          </span>
                          Logout
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-9 wow fadeInRight">
              <div className="dashboard_content mt_100">
                <h3 className="dashboard_title">Order invoice <Link className="back_btn common_btn" to="/dashboard">Go Back</Link></h3>
                <div className="dashboard_order_invoice_area">
                  <div className="dashboard_order_invoice">
                    <div className="dashboard_invoice_logo_area">
                      <div className="invoice_logo">
                        <img src="assets/graphics/logo.jpeg" alt="logo" className="img-fluid w-100" />
                      </div>
                      <div className="text">
                        <h2>invoice</h2>
                        <p>invoice no: #4574</p>
                        <p>date: 16-10-2024</p>
                      </div>
                    </div>
                    <div className="dashboard_invoice_header">
                      <div className="text">
                        <h2>Bill To</h2>
                        <p>7232 Broadway Suite 308, Jackson Heights, 11372, NY, United States</p>
                        <p>+1347-430-9510</p>
                        <p>example@gmail.com</p>
                      </div>
                      <div className="text">
                        <h2>Ship To</h2>
                        <ul>
                          <li><span>Name:</span> Koile Lavendra</li>
                          <li><span>Email:</span> example@yahoo.com</li>
                          <li><span>Phone:</span> (123) - 222 -1452</li>
                          <li><span>Address:</span> 441, 4th street, Washington DC, USA</li>
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
                              <th>Total</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Lemon Meat Bone</td>
                              <td>$25.00</td>
                              <td>01</td>
                              <td>$25.00</td>
                            </tr>
                            <tr>
                              <td>Fresh Red Seedless</td>
                              <td>$30.00</td>
                              <td>02</td>
                              <td>$60.00</td>
                            </tr>
                            <tr>
                              <td>Carrot Vegetables</td>
                              <td>$50.00</td>
                              <td>01</td>
                              <td>$50.00</td>
                            </tr>
                            <tr>
                              <td colSpan={3}><b>Subtotal</b></td>
                              <td><b>$440.00</b></td>
                            </tr>
                            <tr>
                              <td colSpan={3}>Delivery Charge</td>
                              <td>$10.00</td>
                            </tr>
                            <tr>
                              <td colSpan={3}><b>Total</b></td>
                              <td><b>$135.00</b></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="dashboard_invoice_footer">
                      <h4>Notes</h4>
                      <p>Thanks for your purchase</p>
                      <a className="common_btn" href="#">Print PDF</a>
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