import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const MySwiper = ({
  items = [],
  modules = [Navigation, Autoplay],
  renderSlide,
  slidesPerView = "auto",
  spaceBetween = 0,
  loop = true,
  autoplayDelay = 2500,
  showNavigation = true,
  grabCursor = true,
  speed = 600,
  breakpoints = {
    320: { slidesPerView: 2 },
    576: { slidesPerView: 3 },
    768: { slidesPerView: 4 },
    992: { slidesPerView: 5 },
    1200: { slidesPerView: 6 },
  },
}) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className="position-relative">
      {showNavigation && (
        <>
          <button
            ref={prevRef}
            className="btn btn-light rounded-circle shadow-sm position-absolute top-50 start-0 translate-middle-y"
            style={{ zIndex: 10 }}
          >
            <i className="fa fa-chevron-left"></i>
          </button>
          <button
            ref={nextRef}
            className="btn btn-light rounded-circle shadow-sm position-absolute top-50 end-0 translate-middle-y"
            style={{ zIndex: 10 }}
          >
            <i className="fa fa-chevron-right"></i>
          </button>
        </>
      )}

      <Swiper
        modules={modules}
        spaceBetween={spaceBetween}
        slidesPerView={slidesPerView}
        loop={loop}
        autoplay={{ delay: autoplayDelay, disableOnInteraction: false }}
        speed={speed}
        grabCursor={grabCursor}
        breakpoints={breakpoints}
        onInit={(swiper) => {
          if (showNavigation) {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }
        }}
      >
        {items.map((item, i) => (
          <SwiperSlide key={i}>{renderSlide(item, i)}</SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MySwiper;
