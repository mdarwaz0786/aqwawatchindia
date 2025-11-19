import { useNavigate } from "react-router-dom";

const CarouselSection = () => {
  const navigate = useNavigate();

  return (
    <>
      <div>
        <section className="banner_2 ddesk">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">
                <div className="banner_content">
                  <div className="row banner_2_slider">
                    <div style={{ cursor: "pointer" }} className="col-xl-12" onClick={() => navigate("/products")}>
                      <div className="bannermain">
                        <img src="assets/carousel/banner-3.jpg" />
                      </div>
                    </div>
                    <div style={{ cursor: "pointer" }} className="col-xl-12" onClick={() => navigate("/products")}>
                      <div className="bannermain">
                        <img src="assets/carousel/Banner-4.jpg" />
                      </div>
                    </div>
                    <div style={{ cursor: "pointer" }} className="col-xl-12" onClick={() => navigate("/products")}>
                      <div className="bannermain">
                        <img src="assets/carousel/banner-5.jpg" />
                      </div>
                    </div>
                    <div style={{ cursor: "pointer" }} className="col-xl-12" onClick={() => navigate("/products")}>
                      <div className="bannermain">
                        <img src="assets/carousel/banner-6.jpg" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="banner_2 dnone">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">
                <div className="banner_content">
                  <div className="row banner_2_slider">
                    <div style={{ cursor: "pointer" }} className="col-xl-12" onClick={() => navigate("/products")}>
                      <div className="bannermain">
                        <img src="assets/carousel/banner-3.jpg" />
                      </div>
                    </div>
                    <div style={{ cursor: "pointer" }} className="col-xl-12" onClick={() => navigate("/products")}>
                      <div className="bannermain">
                        <img src="assets/carousel/Banner-4.jpg" />
                      </div>
                    </div>
                    <div style={{ cursor: "pointer" }} className="col-xl-12" onClick={() => navigate("/products")}>
                      <div className="bannermain">
                        <img src="assets/carousel/banner-5.jpg" />
                      </div>
                    </div>
                    <div style={{ cursor: "pointer" }} className="col-xl-12" onClick={() => navigate("/products")}>
                      <div className="bannermain">
                        <img src="assets/carousel/banner-6.jpg" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default CarouselSection;