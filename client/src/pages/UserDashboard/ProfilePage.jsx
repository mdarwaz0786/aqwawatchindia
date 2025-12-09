import Footer from '../../components/Footer/Footer';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import { useApp } from '../../context/app.context';
import { useAuth } from '../../context/auth.context';

const ProfilePage = () => {
  const { categories } = useApp();
  const { user, logOutUser, isLoggedIn } = useAuth();

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
                    <li><Link to="#">My Account</Link></li>
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
                        <p>Profile</p>
                      </li>
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
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            {
              user && (
                <div className="col-xl-9 wow fadeInRight">
                  <div className="dashboard_content mt_100">
                    {/* <h3 className="dashboard_title">Profile Information <Link className="common_btn" to="#">Edit</Link></h3> */}
                    <h3 className="dashboard_title">Profile Information</h3>
                    <div className="dashboard_profile_info_list">
                      <ul>
                        <li><span>Name: </span>{user?.name}</li>
                        <li><span>Email: </span>{user?.email}</li>
                        <li><span>Mobile: </span>{user?.mobile}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )
            }
          </div>
        </div>
      </section>
      {/*DSHBOARD END*/}
      <Footer />
    </>
  );
};

export default ProfilePage;