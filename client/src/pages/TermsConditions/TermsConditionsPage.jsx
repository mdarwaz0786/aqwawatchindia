import { Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer"
import Header from "../../components/Header/Header";
import useFetchData from "../../hooks/useFetchData";
import apis from "../../api/apis";

const TermsConditionsPage = () => {
  const { data } = useFetchData(apis.termCondition.get);

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
                  <h1>Terms and Conditions</h1>
                  <ul>
                    <li><Link to="/"><i className="fal fa-home-lg" /> Home</Link></li>
                    <li><Link to="#">Terms and Conditions</Link></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*PAGE BANNER START*/}

      {/*TERMS AND CONDITION START*/}
      <section className="terms_condition mt_55 mb_100">
        <div className="container">
          <div className="row wow fadeInUp">
            <div className="col-12">
              <div className="privacy_policy_text">
                {
                  data?.data?.status === "true" ? (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: data?.data?.description || ""
                      }}
                    />
                  ) : (
                    null
                  )
                }
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*TERMS AND CONDITION END*/}
      <Footer />
    </>
  );
};

export default TermsConditionsPage;