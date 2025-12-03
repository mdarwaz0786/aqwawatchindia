import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../api/apis";
import MySwiper from "../../components/Swiper/Swiper";

const CarouselSection = ({ carousels = [] }) => {
  const navigate = useNavigate();

  if (!carousels?.length) return null;

  return (
    <>
      {/* Desktop */}
      <section className="banner_2 ddesk">
        <div className="w-100">
          <MySwiper
            items={carousels}
            slidesPerView={1}
            autoplayDelay={5000}
            breakpoints={{
              0: { slidesPerView: 1 },
              320: { slidesPerView: 1 },
              576: { slidesPerView: 1 },
              768: { slidesPerView: 1 },
              992: { slidesPerView: 1 },
              1200: { slidesPerView: 1 },
              1400: { slidesPerView: 1 }
            }}
            renderSlide={(d) => (
              <div
                key={d?._id}
                style={{ cursor: "pointer", width: "100%" }}
                onClick={() => navigate(`${d?.navigateTo}`)}
              >
                <div className="bannermain">
                  <img
                    src={`${API_BASE_URL}/${d?.banner}`}
                    style={{ width: "100%", height: "auto", display: "block" }}
                    alt="banner"
                  />
                </div>
              </div>
            )}
          />
        </div>
      </section>

      {/* Mobile */}
      <section className="banner_2 dnone">
        <div className="w-100">
          <MySwiper
            items={carousels}
            slidesPerView={1}
            autoplayDelay={5000}
            breakpoints={{
              0: { slidesPerView: 1 },
              320: { slidesPerView: 1 },
              576: { slidesPerView: 1 },
              768: { slidesPerView: 1 },
              992: { slidesPerView: 1 },
              1200: { slidesPerView: 1 },
              1400: { slidesPerView: 1 }
            }}
            renderSlide={(d) => (
              <div
                key={d?._id}
                style={{ cursor: "pointer", width: "100%" }}
                onClick={() => navigate(`${d?.navigateTo}`)}
              >
                <div className="bannermain">
                  <img
                    src={`${API_BASE_URL}/${d?.banner}`}
                    style={{ width: "100%", height: "auto", display: "block" }}
                    alt="banner"
                  />
                </div>
              </div>
            )}
          />
        </div>
      </section>
    </>
  );
};

export default CarouselSection;
