import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";

const ForgotPasswordPage = () => {

  return (
    <>
      <Header />
      {/*FORGOT PASSWORD START*/}
      <section className="forgot_password ">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 wow fadeInRight">
              <div className="sign_in_form">
                <h3>Forgot Password? </h3>
                <form>
                  <div className="row">
                    <div className="col-xl-12">
                      <div className="single_input">
                        <label>email</label>
                        <input type="email" placeholder="example@aqwatech.com" />
                      </div>
                    </div>
                    <div className="col-xl-12 mt_15">
                      <button type="submit" className="common_btn">Forgot Password <i className="fas fa-long-arrow-right" /></button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*FORGOT PASSWORD END*/}
      <Footer />
    </>
  );
};

export default ForgotPasswordPage;