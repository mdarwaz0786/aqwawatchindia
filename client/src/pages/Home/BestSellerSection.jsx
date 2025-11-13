import { API_BASE_URL } from "../../api/apis";
import Swiper from "../../components/Swiper/Swiper";

const BestSellerSection = ({ bestSellingProducts = [] }) => {
  return (
    <section className="flash_sell">
      <div className="container">
        <div className="row align-items-center mb-4">
          <div className="col-xxl-6 col-xl-6">
            <div className="section_heading_2 section_heading">
              <h3>
                <span>Best</span> Seller
              </h3>
            </div>
          </div>
          <div className="col-xxl-6 col-xl-6 text-end">
            <div className="view_all_btn_area">
              <a className="view_all_btn" href="#">
                View all
              </a>
            </div>
          </div>
        </div>

        <Swiper
          items={bestSellingProducts}
          slidesPerView={4}
          autoplayDelay={2500}
          breakpoints={{
            320: { slidesPerView: 1 },
            576: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1200: { slidesPerView: 4 },
          }}
          renderSlide={(d) => (
            <div className="product_item_2 product_item wow fadeInUp" key={d?._id}>
              <div className="product_img position-relative">
                <img
                  src={`${API_BASE_URL}/${d?.images?.[0]}`}
                  alt={d?.name}
                  className="img-fluid w-100"
                />
                <ul className="discount_list">
                  {d?.percentOff && (
                    <li className="discount">
                      <b>-</b> {d?.percentOff}%
                    </li>
                  )}
                  {d?.newArrivalProduct && <li className="new">new</li>}
                </ul>
                <ul className="btn_list">
                  <li>
                    <a href="#">
                      <img
                        src="assets/images/cart_icon_white.svg"
                        alt="Cart"
                        className="img-fluid"
                      />
                    </a>
                  </li>
                </ul>
              </div>

              <div className="product_text">
                <a className="title" href="#">
                  {d?.name}
                </a>
                <p className="price">
                  Rs.{d?.salePrice} <del>Rs.{d?.mrpPrice}</del>
                </p>
                <p className="rating">
                  {[...Array(5)].map((_, i) => (
                    <i
                      key={i}
                      className={`${i < Math.round(d?.rating || 0)
                        ? "fas fa-star"
                        : "far fa-star"
                        }`}
                    />
                  ))}
                  <span>({d?.numberOfReviews} reviews)</span>
                </p>
              </div>
            </div>
          )}
        />
      </div>
    </section>
  );
};

export default BestSellerSection;
