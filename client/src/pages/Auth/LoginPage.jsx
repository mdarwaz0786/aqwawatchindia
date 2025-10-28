import { Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";

const LoginPage = () => {
  return (
    <>
      <Header />
      {/*SIGN IN PAGE START*/}
      <section className="sign_in">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-7 wow fadeInRight">
              <div className="sign_in_form">
                <h3>Sign In to Continue </h3>
                <form>
                  <div className="row">
                    <div className="col-xl-12">
                      <div className="single_input">
                        <label>email</label>
                        <input type="email" placeholder="example@aqwatech.com" />
                      </div>
                    </div>
                    <div className="col-xl-12">
                      <div className="single_input">
                        <label>password</label>
                        <input type="password" placeholder="********" />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="forgot">
                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" defaultValue id="flexCheckDefault" />
                          <label className="form-check-label" htmlFor="flexCheckDefault">
                            Remeber Me
                          </label>
                        </div>
                        <Link to="/forgot-password">Forgot Password ?</Link>
                      </div>
                    </div>
                    <div className="col-xl-12">
                      <button type="submit" className="common_btn">Sign In <i className="fas fa-long-arrow-right" /></button>
                    </div>
                  </div>
                </form>
                <p className="dont_account">Already have an account? <Link to="/signup">Sign Up</Link></p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*SIGN IN PAGE END*/}
      <Footer />
    </>
  );
};

export default LoginPage;