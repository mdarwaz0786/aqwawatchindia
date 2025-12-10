import { Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import useFetchData from "../../hooks/useFetchData";
import apis, { API_BASE_URL } from "../../api/apis";

const AboutUsPage = () => {
  const { data } = useFetchData(apis.aboutus.get);

  return (
    <>
      <Header />
      <section className="page_banner" style={{ background: 'url(assets/images/page_banner_bg.jpg)' }}>
        <div className="page_banner_overlay">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="page_banner_text wow fadeInUp">
                  <h1>About Us</h1>
                  <ul>
                    <li><Link to="/"><i className="fal fa-home-lg" /> Home</Link></li>
                    <li><Link to="#">About Us</Link></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*PAGE BANNER START*/}

      {/*ABOUT US PAGE START*/}
      <section className="about_us mt_100">
        <div className="container">
          <div className="row justify-content-between align-items-center">
            <div className="col-xxl-5 col-md-10 col-lg-6 wow fadeInLeft">
              <div className="about_us_img">
                <div className="img">
                  <img src={`${API_BASE_URL}/${data?.data?.image}`} alt="about us" className="img-fluid w-100" />
                </div>
                <h3>{data?.data?.experience}+ <span>Years experience</span></h3>
                <p>{data?.data?.shortInfo}
                  <span>{data?.data?.name}</span>
                </p>
              </div>
            </div>
            <div className="col-xxl-6 col-lg-6 wow fadeInRight">
              <div className="about_us_text">
                <h6 className="mb-1">ABOUT US:</h6>
                <p className="description">
                  {data?.data?.description}
                </p>

                <h6 className="mb-1 mt-4">CONTACT:</h6>
                <p className="description">
                  {data?.data?.contact}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="counter_part ">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="counter_area">
                <ul>
                  <li className="wow fadeInUp">
                    <div className="icon">
                      <img src="assets/images/counter_icon_1.png" alt="counter" className="img-fluid w-100" />
                    </div>
                    {data?.data?.happyCustomer > 0 && <h2><span className="counter">{data?.data?.happyCustomer}</span></h2>}
                    <p>Happy customers</p>
                  </li>
                  <li className="wow fadeInUp">
                    <div className="icon">
                      <img src="assets/images/counter_icon_2.png" alt="counter" className="img-fluid w-100" />
                    </div>
                    {data?.data?.expertTeam > 0 && <h2><span className="counter">{data?.data?.expertTeam}</span></h2>}
                    <p>Expert Team</p>
                  </li>
                  <li className="wow fadeInUp">
                    <div className="icon">
                      <img src="assets/images/counter_icon_3.png" alt="counter" className="img-fluid w-100" />
                    </div>
                    {data?.data?.awardWinning > 0 && <h2><span className="counter">{data?.data?.awardWinning}</span></h2>}
                    <p>Award Wining</p>
                  </li>
                  <li className="wow fadeInUp">
                    <div className="icon">
                      <img src="assets/images/counter_icon_4.png" alt="counter" className="img-fluid w-100" />
                    </div>
                    {data?.data?.averageRating > 0 && <h2><span className="counter">{data?.data?.averageRating}</span></h2>}
                    <p>Avarage Rating</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default AboutUsPage;