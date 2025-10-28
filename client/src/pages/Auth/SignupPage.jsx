import { Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";

const SignupPage = () => {
  return (
    <>
      <Header />
      {/*SIGN UP PAGE START*/}
      <section className="sign_up">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xxl-5 col-lg-8 col-xl-6 col-md-10 wow fadeInRight">
              <div className="sign_in_form">
                <h3>Sign Up to Continue 👋</h3>
                <form>
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="single_input">
                        <label>first name</label>
                        <input type="text" placeholder="First name" />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="single_input">
                        <label>Last name</label>
                        <input type="text" placeholder="Last name" />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="single_input">
                        <label>email</label>
                        <input type="email" placeholder="example@Zenis.com" />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="single_input">
                        <label>phone</label>
                        <input type="text" placeholder="+91-1234567890" />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="single_input">
                        <label>password</label>
                        <input type="password" placeholder="********" />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="single_input">
                        <label>cnfirm password</label>
                        <input type="password" placeholder="********" />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <button type="submit" className="common_btn">Sign Up <i className="fas fa-long-arrow-right" /></button>
                    </div>
                  </div>
                </form>
                <p className="dont_account">Already have an account? <Link to="/login">Sign In</Link></p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*SIGN UP PAGE END*/}
      <Footer />
    </>
  );
};

export default SignupPage;