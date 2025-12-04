import Footer from '../../components/Footer/Footer';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import { useApp } from '../../context/app.context';

const ProfilePage = () => {
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
                    <li><Link to="/profile">Profile Information</Link></li>
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
                        <Link to="forgot-password">
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
            <div className="col-xl-9 wow fadeInRight">
              <div className="dashboard_content mt_100">
                <h3 className="dashboard_title">Profile Information <Link className="common_btn" to="#">Edit</Link></h3>
                <div className="dashboard_profile_info_list">
                  <ul>
                    <li><span>Name:</span> Jhon Deo </li>
                    <li><span>Email:</span> example@yahoo.com</li>
                    <li><span>Phone:</span> (123) - 222 -1452</li>
                    <li><span>Country:</span> USA</li>
                    <li><span>City:</span> Washington Dc</li>
                    <li><span>Zip:</span> 1234</li>
                    <li><span>Address:</span> 441, 4th street, Washington DC, USA</li>
                  </ul>
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

export default ProfilePage;