/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import apis from "../../api/apis";
import useCreate from "../../hooks/useCreate";
import { useAuth } from "../../context/auth.context";
import { toast } from "react-toastify";

const LoginPage = () => {
  const { storeToken, userId } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    emailOrMobile: "",
    password: "",
    userId: userId,
  });

  const { postData, response, isPosting, postError } = useCreate(apis.auth.login);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.emailOrMobile || !form.password) {
      alert("Email/Mobile and Password are required");
      return;
    }

    postData({
      emailOrMobile: form.emailOrMobile,
      password: form.password,
      userId: form.userId,
    });
  };

  useEffect(() => {
    if (response?.success) {
      toast.success("Login Successful")
      const token = response?.data?.token;
      storeToken(token);
      navigate(-1);
    };
  }, [response, navigate, form.remember]);

  return (
    <>
      <Header />
      {/* SIGN IN PAGE START */}
      <section className="sign_in">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-7 wow fadeInRight">
              <div className="sign_in_form">
                <h3>Sign In to Continue</h3>
                {postError && (<p style={{ color: "red", marginBottom: "10px" }}>{postError}</p>)}
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-xl-12">
                      <div className="single_input">
                        <label>Mobile?Email</label>
                        <input
                          type="text"
                          name="emailOrMobile"
                          value={form.emailOrMobile}
                          onChange={handleChange}
                          placeholder="Enter Mobile/Email"
                          required
                        />
                      </div>
                    </div>

                    <div className="col-xl-12">
                      <div className="single_input">
                        <label>Password</label>
                        <input
                          type="password"
                          name="password"
                          value={form.password}
                          onChange={handleChange}
                          placeholder="Enter Password"
                          required
                        />
                      </div>
                    </div>

                    <div className="col-xl-12">
                      <div className="forgot">
                        <Link className="text-end" to="/forgot-password">Forgot Password?</Link>
                      </div>
                    </div>

                    <div className="col-xl-12">
                      <button type="submit" className="common_btn" disabled={isPosting}>
                        {isPosting ? "Signing In..." : "Sign In"}{" "}
                        <i className="fas fa-long-arrow-right" />
                      </button>
                    </div>
                  </div>
                </form>

                <p className="dont_account">
                  Don't have an account? <Link to="/signup">Sign Up</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* SIGN IN PAGE END */}
      <Footer />
    </>
  );
};

export default LoginPage;
