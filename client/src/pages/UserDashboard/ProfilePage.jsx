import Footer from '../../components/Footer/Footer';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import { useAuth } from '../../context/auth.context';
import defaultAvatar from "../../assets/avatar.png";
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import apis, { API_BASE_URL } from '../../api/apis';

const ProfilePage = () => {
  const { user, logOutUser, isLoggedIn, validToken } = useAuth();
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    mobile: user?.mobile || "",
    avatar: null,
  });

  useEffect(() => {
    if (showModal && user) {
      setFormData({
        name: user?.name || "",
        email: user?.email || "",
        mobile: user?.mobile || "",
        avatar: null,
      });
    }
  }, [showModal, user]);

  const handleProfileUpdate = async () => {
    try {
      const form = new FormData();
      form.append("name", formData.name);
      form.append("email", formData.email);
      form.append("mobile", formData.mobile);
      if (formData.avatar) {
        form.append("avatar", formData.avatar);
      };

      await axios.patch(
        apis.auth.update,
        form,
        {
          headers: {
            Authorization: validToken,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Profile updated successfully");
      setShowModal(false);
      setTimeout(() => {
        window.location.reload();
      }, 300);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Update failed");
    };
  };

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
      <section className="dashboard mb-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 wow fadeInUp">
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
                      <li>
                        <Link to="/dashboard">
                          Orders
                        </Link>
                      </li>
                      <li>
                        <Link to="/forgot-password">
                          Forgot Password
                        </Link>
                      </li>
                      {
                        isLoggedIn ? (
                          <li>
                            <Link to="#" onClick={logOutUser}>
                              {/* <span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                                </svg>
                              </span> */}
                              Logout
                            </Link>
                          </li>
                        ) : (
                          <li>
                            <Link to="/login" onClick={logOutUser}>
                              {/* <span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                                </svg>
                              </span> */}
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
                <div className="col-xl-8 wow fadeInRight">
                  <div className="dashboard_content mt-3">
                    <div className="d-flex justify-content-between align-items-center">
                      <img
                        src={
                          user?.avatar
                            ? `${API_BASE_URL}/${user?.avatar}`
                            : defaultAvatar
                        }
                        alt="avatar"
                        className="rounded-circle me-3"
                        style={{
                          width: "100px",
                          height: "100px",
                          objectFit: "contain",
                        }}
                      />
                      <h3>Profile Detail</h3>
                      <h3 className="dashboard_title">
                        <Link className="common_btn" to="#" onClick={() => setShowModal(true)}>
                          Edit
                        </Link>
                      </h3>
                    </div>
                    <div className="dashboard_profile_info_list">
                      <ul>
                        <li className="mb-1">
                          <span>Name: </span>{user?.name}
                        </li>
                        <li className="mb-1">
                          <span>Email: </span>{user?.email}
                        </li>
                        <li className="mb-1">
                          <span>Mobile: </span>{user?.mobile}
                        </li>
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

      {showModal && (
        <div className="modal fade show d-block" style={{ background: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Update Profile</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                />
              </div>
              <div className="modal-body">
                <form>
                  {/* Profile Image */}
                  <div className="text-center mb-3">
                    <img
                      src={
                        formData.avatar
                          ? URL.createObjectURL(formData?.avatar)
                          : user?.avatar
                            ? `${API_BASE_URL}/${user?.avatar}`
                            : defaultAvatar
                      }
                      alt="Profile"
                      className="rounded-circle mb-2"
                      style={{
                        width: "80px",
                        height: "80px",
                        objectFit: "cover",
                      }}
                    />
                    <input
                      type="file"
                      className="form-control"
                      accept="image/*"
                      onChange={(e) =>
                        setFormData({ ...formData, avatar: e.target.files[0] })
                      }
                    />
                  </div>
                  {/* Name */}
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                  </div>
                  {/* Email */}
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </div>
                  {/* Mobile */}
                  <div className="mb-3">
                    <label className="form-label">Mobile</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.mobile}
                      onChange={(e) =>
                        setFormData({ ...formData, mobile: e.target.value })
                      }
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-primary"
                  onClick={handleProfileUpdate}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfilePage;