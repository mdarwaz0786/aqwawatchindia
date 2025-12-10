import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../api/apis";
import MySwiper from "../../components/Swiper/Swiper";

const PromoBannerSection = ({ promotions = [] }) => {
  const navigate = useNavigate();

  const leftPromotion = promotions?.filter((p) => p?.position === "Left");
  const rightPromotion = promotions?.filter((p) => p?.position === "Right");

  return (
    <>
      {promotions?.length > 0 && (
        <section className="promobanner">
          <div className="container">
            <div className="row">
              {
                leftPromotion?.map((d) => (
                  <div className="col-lg-6">
                    <div className="promobanner1">
                      <div className="promoimgtop" onClick={() => navigate(`/products?category=${d?.category?.slug}`)}>
                        <img src={`${API_BASE_URL}/${d?.banner}`} />
                      </div>
                      <MySwiper
                        items={d?.products}
                        slidesPerView={4}
                        autoplayDelay={3000}
                        spaceBetween={15}
                        breakpoints={{
                          320: { slidesPerView: 3 },
                          576: { slidesPerView: 3 },
                          768: { slidesPerView: 4 },
                          992: { slidesPerView: 5 },
                          1200: { slidesPerView: 6 },
                        }}
                        renderSlide={(p) => (
                          <div className="promo-item mt-3">
                            <div className="promos" onClick={() => navigate(`/product-detail/${p?.slug}`)}>
                              <a href="#">
                                <div className="promo-title">
                                  <p>{p?.percentOff}% OFF</p>
                                </div>
                                <div className="promo-image d-flex align-items-center justify-content-center bg-white">
                                  <img
                                    src={`${API_BASE_URL}/${p?.images?.[0]}`}
                                    alt="product"
                                    className="promo-img"
                                  />
                                </div>
                              </a>
                            </div>
                          </div>
                        )}
                      />
                    </div>
                  </div>
                ))
              }

              {
                rightPromotion?.map((d) => (
                  <div className="col-lg-6">
                    <div className="promobanner1">
                      <div className="promoimgtop" onClick={() => navigate(`/products?category=${d?.category?.slug}`)}>
                        <img src={`${API_BASE_URL}/${d?.banner}`} />
                      </div>
                      <MySwiper
                        items={d?.products}
                        slidesPerView={4}
                        autoplayDelay={3000}
                        spaceBetween={20}
                        breakpoints={{
                          320: { slidesPerView: 3 },
                          576: { slidesPerView: 3 },
                          768: { slidesPerView: 4 },
                          992: { slidesPerView: 5 },
                          1200: { slidesPerView: 6 },
                        }}
                        renderSlide={(p) => (
                          <div className="promo-item mt-3">
                            <div className="promos" onClick={() => navigate(`/product-detail/${p?.slug}`)}>
                              <a href="#">
                                <div className="promo-title">
                                  <p>{p?.percentOff}% OFF</p>
                                </div>
                                <div className="promo-image d-flex align-items-center justify-content-center bg-white">
                                  <img
                                    src={`${API_BASE_URL}/${p?.images?.[0]}`}
                                    alt="product"
                                    className="promo-img"
                                  />
                                </div>
                              </a>
                            </div>
                          </div>
                        )}
                      />
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default PromoBannerSection;