import { Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer"
import Header from "../../components/Header/Header";
import apis from "../../api/apis";
import useFetchData from "../../hooks/useFetchData";

const BillingShippingPolicyPage = () => {
  const { data } = useFetchData(apis.billingShippingPolicy.get);

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
                  <h1>Billing and Shipping Policy</h1>
                  <ul>
                    <li><Link to="/"><i className="fal fa-home-lg" /> Home</Link></li>
                    <li><Link to="#">Billing and Shipping Policy</Link></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*PAGE BANNER START*/}

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
      <Footer />
    </>
  );
};

export default BillingShippingPolicyPage;