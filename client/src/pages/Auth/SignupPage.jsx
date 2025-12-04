/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import apis from "../../api/apis";
import useCreate from "../../hooks/useCreate";
import { useAuth } from "../../context/auth.context";
import { useApp } from "../../context/app.context";

const SignupPage = () => {
  const { storeToken, userId } = useAuth();
  const navigate = useNavigate();
  const { categories } = useApp();
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    userId: userId,
  });

  const { postData, response, isPosting, postError } = useCreate(apis.auth.signup);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.mobile || !form.password) {
      alert("All fields are required");
      return;
    };

    postData(form);
  };

  useEffect(() => {
    if (response?.success) {
      const token = response?.data?.token;
      storeToken(token);
      navigate("/");
    };
  }, [response, navigate]);

  return (
    <>
      <Header categories={categories} />

      {/* SIGN UP PAGE START */}
      <section className="sign_up">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xxl-5 col-lg-8 col-xl-6 col-md-10 wow fadeInRight">
              <div className="sign_in_form">
                <h3>Sign Up to Continue 👋</h3>

                {/* Error message */}
                {postError && (
                  <p style={{ color: "red", marginBottom: "10px" }}>{postError}</p>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="single_input">
                        <label>Name</label>
                        <input
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Your Name"
                        />
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="single_input">
                        <label>Email</label>
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="example@gmail.com"
                        />
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="single_input">
                        <label>Mobile</label>
                        <input
                          type="text"
                          name="mobile"
                          value={form.mobile}
                          onChange={handleChange}
                          placeholder="+91-1234567890"
                        />
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div className="single_input">
                        <label>Password</label>
                        <input
                          type="password"
                          name="password"
                          value={form.password}
                          onChange={handleChange}
                          placeholder="********"
                        />
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <button type="submit" className="common_btn" disabled={isPosting}>
                        {isPosting ? "Signing Up..." : "Sign Up"}{" "}
                        <i className="fas fa-long-arrow-right" />
                      </button>
                    </div>
                  </div>
                </form>

                <p className="dont_account">
                  Already have an account? <Link to="/login">Sign In</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* SIGN UP PAGE END */}
      <Footer />
    </>
  );
};

export default SignupPage;
