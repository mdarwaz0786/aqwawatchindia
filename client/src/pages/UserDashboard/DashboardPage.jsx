import { Link } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import { useApp } from '../../context/app.context';
import { useAuth } from '../../context/auth.context';
import apis from '../../api/apis';
import useFetchData from '../../hooks/useFetchData';
import formatDate from '../../helpers/formatDate';

const DashboardPage = () => {
  const { categories } = useApp();
  const { user, logOutUser, isLoggedIn, validToken } = useAuth();
  const { data } = useFetchData(validToken ? apis.order.get : null, validToken);
  const orders = data?.data;

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
                    <li><Link to="#">Overview</Link></li>
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
                    <h3>{user?.name}</h3>
                    <p>{user?.email}</p>
                  </div>
                  <div className="dashboard_sidebar_menu">
                    <ul>
                      <li>
                        <p>dashboard</p>
                      </li>
                      <li>
                        {
                          isLoggedIn ? (
                            <li>
                              <Link to="#" onClick={logOutUser}>
                                <span>
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                                  </svg>
                                </span>
                                Logout
                              </Link>
                            </li>
                          ) : (
                            <li>
                              <Link to="/login" onClick={logOutUser}>
                                <span>
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                                  </svg>
                                </span>
                                Login
                              </Link>
                            </li>
                          )
                        }
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-9">
              <div className="dashboard_content mt_100">

                <div className="row">
                  <div className="col-xl-4 col-md-6 wow fadeInUp">
                    <div className="dashboard_overview_item">
                      <div className="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
                        </svg>
                      </div>
                      <h3> {orders?.length} <span>Total Order</span></h3>
                    </div>
                  </div>
                  {/* <div className="col-xl-4 col-md-6 wow fadeInUp">
                    <div className="dashboard_overview_item blue">
                      <div className="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                        </svg>
                      </div>
                      <h3> 56 <span>Completed Order</span></h3>
                    </div>
                  </div>
                  <div className="col-xl-4 col-md-6 wow fadeInUp">
                    <div className="dashboard_overview_item orange">
                      <div className="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                        </svg>
                      </div>
                      <h3> 28 <span>pending order</span></h3>
                    </div>
                  </div>
                  <div className="col-xl-4 col-md-6 wow fadeInUp">
                    <div className="dashboard_overview_item red">
                      <div className="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                      </div>
                      <h3> 12 <span>Canceled Order</span></h3>
                    </div>
                  </div> */}
                </div>
                <div className="row mt_25">
                  <div className="col-xl-12 wow fadeInLeft">
                    <div className="dashboard_recent_order">
                      <h3>Your Recent order</h3>
                      <div className="dashboard_order_table">
                        <div className="table-responsive">
                          <table>
                            <thead>
                              <tr>
                                <th>Order ID</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Amount</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {
                                orders?.map((d) => (
                                  <tr>
                                    <td>{d?._id}</td>
                                    <td>{formatDate(d?.createdAt)}</td>
                                    <td><span className="complete">{d?.orderStatus}</span></td>
                                    <td>Rs.{d?.totalAmount}</td>
                                    <td>
                                      <Link to={`/invoice/${d?._id}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                        </svg>
                                        View
                                      </Link>
                                    </td>
                                  </tr>
                                ))
                              }
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
      </section>
      {/*DSHBOARD END*/}
      <Footer />
    </>
  );
};

export default DashboardPage;