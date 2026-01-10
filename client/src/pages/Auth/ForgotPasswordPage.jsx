import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import apis from "../../api/apis";
import { Link, useNavigate } from "react-router-dom";

const ForgotPasswordPage = () => {
  const [value, setValue] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!value) {
      return toast.error("Email or mobile is required");
    };

    if (!password) {
      return toast.error("Password is required");
    };

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    };

    const payload = {
      password,
      ...(isNaN(value) ? { email: value } : { mobile: value }),
    };

    try {
      setLoading(true);

      const res = await axios.post(
        apis.auth.forgotPassword,
        payload
      );

      toast.success(res?.data?.message || "Password updated successfully");
      navigate(-1);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    };
  };

  return (
    <>
      <Header />
      {/* FORGOT PASSWORD START */}
      <section className="forgot_password">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="sign_in_form">
                <h3>Forgot Password</h3>
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    {/* Email / Mobile */}
                    <div className="col-xl-12">
                      <div className="single_input">
                        <label>Mobile/Email</label>
                        <input
                          type="text"
                          placeholder="Enter Mobile/Email"
                          value={value}
                          onChange={(e) => setValue(e.target.value)}
                        />
                      </div>
                    </div>
                    {/* New Password */}
                    <div className="col-xl-12 mt_15">
                      <div className="single_input">
                        <label>New Password</label>
                        <input
                          type="password"
                          placeholder="Enter new password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                    </div>
                    {/* Confirm Password */}
                    <div className="col-xl-12 mt_15">
                      <div className="single_input">
                        <label>Confirm Password</label>
                        <input
                          type="password"
                          placeholder="Confirm new password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-xl-12 mt_20">
                      <button
                        type="submit"
                        className="common_btn"
                        disabled={loading}
                      >
                        {loading ? "Updating..." : "Update Password"}
                        <i className="fas fa-long-arrow-right ms-2" />
                      </button>
                    </div>
                    <div className="col-xl-12 mt_15 text-center">
                      <Link to="/login">Back to Login</Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* FORGOT PASSWORD END */}
      <Footer />
    </>
  );
};

export default ForgotPasswordPage;
